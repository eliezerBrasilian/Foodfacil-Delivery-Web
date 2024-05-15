import { ReactNode, createContext, useContext, useState } from "react";
import { api } from "../api/client/client";
import { Categoria } from "../enums/Categoria";
import { Disponibilidade } from "../enums/Disponibilidade";
import { LocalStorageKeys } from "../enums/LocalStorageKeys";
import { SalgadoRepository } from "../repositories/SalgadoRepository";
import { SalgadoContextInterface } from "../types/SalgadoContextInterface";
import { SalgadoRequestDto } from "../types/SalgadoRequestDto";
import { SalgadoRequestEditDto } from "../types/SalgadoRequestEditDto";
import { SalgadoResponseDto } from "../types/SalgadoResponseDto";

const defaultSalgadoContext = {
  salgados: Array<SalgadoResponseDto>(),
  salgadosEmPromocao: Array<SalgadoResponseDto>(),
  combos: Array<SalgadoResponseDto>(),
  carregado: false,
  carregando: true,
  getAllSalgados: () => {},
  salvarSalgado: (
    _salg: SalgadoRequestDto,
    _t: string,
    _onError: (m: string) => void
  ) => {},
  editarSalgado: (_salg: SalgadoRequestEditDto, _t: string) => {},
  excluirSalgado: (_salgadoId, _token) => {},
  excluirTodos: (_t: string, _onError: (s: string) => void) => {},
  buscaItem: (_id: string): SalgadoResponseDto | undefined => {
    return undefined;
  },
} as SalgadoContextInterface;

const SalgadosContext = createContext(defaultSalgadoContext);

type SalgadoProviderProps = {
  children: ReactNode;
};

export function useSalgadosContext() {
  return useContext(SalgadosContext);
}

export function SalgadosContextProvider({ children }: SalgadoProviderProps) {
  const ArrayVazio = Array<SalgadoResponseDto>();

  const [salgados, setSalgados] =
    useState<Array<SalgadoResponseDto>>(ArrayVazio);

  const [salgadosEmPromocao, setSalgadosEmPromocao] =
    useState<Array<SalgadoResponseDto>>(ArrayVazio);
  const [combos, setCombos] = useState<Array<SalgadoResponseDto>>(ArrayVazio);

  const [carregado, setCarregado] = useState(false);
  const [carregando, setCarregando] = useState(true);

  const salgadoRepository = new SalgadoRepository();

  async function excluirTodos(token: string, onError: (s: string) => void) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await api.delete("/salgado", config);

      console.log(response.data);

      window.alert("excluidos com sucesso");

      setSalgados(() => {
        return [];
      });
    } catch (error: any) {
      onError("AxiosError: Network Error");
    }
  }

  async function getAllSalgados() {
    setCarregando(true);

    var token = localStorage.getItem(LocalStorageKeys.TOKEN);

    if (token != null) {
      var salgados = await salgadoRepository.getAll(token);

      setSalgados(salgados);

      setSalgadosEmPromocao(salgados.filter((salg) => salg.emOferta == true));
      setCombos(salgados.filter((salg) => salg.categoria == Categoria.COMBO));
    }

    setCarregado(true);
    setCarregando(false);
  }

  async function salvarSalgado(
    salgadoObj: SalgadoRequestDto,
    token: string,
    onError: (message: string) => void
  ) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await api.post("/salgado", salgadoObj, config);

      console.log(response.data);
      window.alert("salvo com sucesso");

      const newSalg: SalgadoResponseDto = {
        id: response.data.id,
        categoria: salgadoObj.categoria as Categoria,
        descricao: salgadoObj.descricao,
        disponibilidade: salgadoObj.disponibilidade as Disponibilidade,
        emOferta: salgadoObj.emOferta,
        imagem: salgadoObj.imagem as string,
        imagemQuadrada: salgadoObj.imagemQuadrada as string,
        imagemRetangular: salgadoObj.imagemRetangular as string,
        nome: salgadoObj.nome,
        preco: salgadoObj.preco,
        precoEmOferta: salgadoObj.precoEmOferta,
        sabores: salgadoObj.sabores,
        createdAt: salgadoObj.createdAt,
      };

      setSalgados((prevList) => {
        var aux: Array<SalgadoResponseDto> = [];
        aux[0] = newSalg;

        for (let i = 0, j = 1; i < prevList.length; i++, j++) {
          aux[j] = prevList[i];
        }

        return aux;
      });
    } catch (e: any) {
      console.log("erro: " + JSON.stringify(e.response.data));
      window.alert(e);
      onError(e.response.data.message);
    }
  }

  async function editarSalgado(
    salgadoObj: SalgadoRequestEditDto,
    token: string
  ) {
    console.log("salgado para editar");
    console.log(salgadoObj);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await api.put(
        `/salgado/${salgadoObj.id}`,
        salgadoObj,
        config
      );

      console.log(response.data);

      window.alert("editado com sucesso");

      setSalgados((prevList) => {
        var aux = prevList.map((salg) => salg);

        var encontradoIndex = aux.findIndex((salg) => salg.id == salgadoObj.id);

        aux[encontradoIndex].categoria = salgadoObj.categoria;
        aux[encontradoIndex].descricao = salgadoObj.descricao;
        aux[encontradoIndex].disponibilidade = salgadoObj.disponibilidade;
        aux[encontradoIndex].emOferta = salgadoObj.emOferta;
        aux[encontradoIndex].imagem = salgadoObj.imagem as string;
        (aux[encontradoIndex].imagemQuadrada =
          salgadoObj.imagemQuadrada as string),
          (aux[encontradoIndex].imagemRetangular =
            salgadoObj.imagemRetangular as string),
          (aux[encontradoIndex].nome = salgadoObj.nome);
        aux[encontradoIndex].preco = salgadoObj.preco;
        aux[encontradoIndex].precoEmOferta = salgadoObj.precoEmOferta;
        aux[encontradoIndex].sabores = salgadoObj.sabores as string[];

        return aux;
      });
    } catch (e: any) {
      console.log("erro: " + e.response.data);
      window.alert(e);
    }
  }

  async function excluirSalgado(salgadoId: string, token: string) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await api.delete(`/salgado/${salgadoId}`, config);

      console.log(response.data);

      window.alert("excluido com sucesso");

      setSalgados((prevList) => {
        var aux = ArrayVazio;
        prevList.forEach((salg) => {
          if (salg.id != salgadoId) aux.push(salg);
        });

        return aux;
      });
    } catch (e: any) {
      console.log("erro: " + e.response);
      window.alert(e);
    }
  }

  function buscaItem(id: string): SalgadoResponseDto | undefined {
    return salgados.find((v) => v.id === id);
  }

  return (
    <SalgadosContext.Provider
      value={{
        salgados,
        salgadosEmPromocao,
        combos,
        carregado,
        carregando,
        getAllSalgados,
        buscaItem,
        salvarSalgado,
        editarSalgado,
        excluirSalgado,
        excluirTodos,
      }}
    >
      {children}
    </SalgadosContext.Provider>
  );
}
