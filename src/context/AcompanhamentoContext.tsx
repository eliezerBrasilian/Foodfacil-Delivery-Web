import { ReactNode, createContext, useContext, useState } from "react";
import { api } from "../api/client/client";
import { Disponibilidade } from "../enums/Disponibilidade";
import { AcompanhamentoContextInterface } from "../types/AcompanhamentoContextInterface";
import { AcompanhamentoRequestDto } from "../types/AcompanhamentoRequestDto";
import { AcompanhamentoRequestEditDto } from "../types/AcompanhamentoRequestEditDto";
import { AcompanhamentoResponseDto } from "../types/AcompanhamentoResponseDto";

const defaultAcompanhamentoContext = {
  getAllAcompanhamentos: () => {},
  acompanhamentos: [],
  salvarAcompanhamento: (
    _acomp: AcompanhamentoRequestDto,
    _t: string,
    _onError: (message: string) => void
  ) => {},
  editarAcompanhamento: (
    _acompObj: AcompanhamentoRequestEditDto,
    _token: string
  ) => {},
  excluirAcompanhamento: (_acompObj: string, _token: string) => {},
  carregado: false,
} as AcompanhamentoContextInterface;

const AcompanhamentoContext = createContext(defaultAcompanhamentoContext);

export function useAcompanhamentoContext() {
  return useContext(AcompanhamentoContext);
}

interface AcompanhamentoContextProps {
  children: ReactNode;
}

function AcompanhamentoContextProvider({
  children,
}: AcompanhamentoContextProps) {
  const [acompanhamentos, setAcompanhamentos] = useState<
    Array<AcompanhamentoResponseDto>
  >([]);

  const [carregado, setCarregado] = useState(false);

  async function getAllAcompanhamentos() {
    try {
      var response = await api.get("/acompanhamento");

      var lista: Array<AcompanhamentoResponseDto> = response.data.lista;
      console.log(lista);
      setAcompanhamentos(lista);
      setCarregado(true);
    } catch (e: any) {
      console.log("erro: " + e);
      window.alert(e);
    }
  }

  async function salvarAcompanhamento(
    acompanhamentoObj: AcompanhamentoRequestDto,
    token: string,
    onError: (m: string) => void
  ) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await api.post(
        "/acompanhamento",
        acompanhamentoObj,
        config
      );

      console.log(response.data);

      const newAcomp: AcompanhamentoResponseDto = {
        id: response.data.id,
        descricao: acompanhamentoObj.descricao,
        disponibilidade: acompanhamentoObj.disponibilidade as Disponibilidade,
        imagem: acompanhamentoObj.imagem as string,
        nome: acompanhamentoObj.nome,
        preco: acompanhamentoObj.preco,
        createdAt: acompanhamentoObj.createdAt,
      };

      setAcompanhamentos((prevList) => {
        var aux: Array<AcompanhamentoResponseDto> = [];
        aux[0] = newAcomp;

        for (let i = 0, j = 1; i < prevList.length; i++, j++) {
          aux[j] = prevList[i];
        }

        return aux;
      });

      window.alert("salvo com sucesso");
    } catch (e: any) {
      console.log("erro: " + JSON.stringify(e.response.data));
      window.alert(e);
      onError(e.response.data.message);
    }
  }

  async function editarAcompanhamento(
    acompanhamentoObj: AcompanhamentoRequestEditDto,
    token: string
  ) {
    console.log("Acompanhamento para editar");
    console.log(acompanhamentoObj);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await api.put(
        `/acompanhamento/${acompanhamentoObj.id}`,
        acompanhamentoObj,
        config
      );

      console.log(response.data);

      window.alert("editado com sucesso");

      setAcompanhamentos((prevList) => {
        var aux = prevList.map((acomp) => acomp);

        var encontradoIndex = aux.findIndex(
          (acomp) => acomp.id == acompanhamentoObj.id
        );

        aux[encontradoIndex].descricao = acompanhamentoObj.descricao;
        aux[encontradoIndex].disponibilidade =
          acompanhamentoObj.disponibilidade;
        aux[encontradoIndex].imagem = acompanhamentoObj.imagem as string;
        aux[encontradoIndex].nome = acompanhamentoObj.nome;
        aux[encontradoIndex].preco = acompanhamentoObj.preco;

        return aux;
      });
    } catch (e: any) {
      console.log("erro: " + e.response.data);
      window.alert(e);
    }
  }

  async function excluirAcompanhamento(
    acompanhamentoId: string,
    token: string
  ) {
    console.log("id do Acompanhamento que será excluido");
    console.log(acompanhamentoId);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await api.delete(
        `/acompanhamento/${acompanhamentoId}`,
        config
      );

      console.log(response.data);

      window.alert("excluido com sucesso");

      setAcompanhamentos((prevList) => {
        var aux: Array<AcompanhamentoResponseDto> = [];
        prevList.forEach((acomp) => {
          if (acomp.id != acompanhamentoId) aux.push(acomp);
        });

        return aux;
      });
    } catch (e: any) {
      console.log("erro: " + e.response);
      window.alert(e);
    }
  }

  return (
    <AcompanhamentoContext.Provider
      value={{
        getAllAcompanhamentos,
        acompanhamentos,
        salvarAcompanhamento,
        editarAcompanhamento,
        excluirAcompanhamento,
        carregado,
      }}
    >
      {children}
    </AcompanhamentoContext.Provider>
  );
}
export { AcompanhamentoContextProvider };
