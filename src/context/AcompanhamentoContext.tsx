import { ReactNode, useState } from "react";
import { AcompanhamentoContext } from "../defaultContexts/AcompanhamentoContextDefault";
import { LocalStorageKeys } from "../enums/LocalStorageKeys";
import { AcompanhamentoRepository } from "../repositories/AcompanhamentoRepository";
import { AcompanhamentoDto } from "../types/AcompanhamentoDto";
import { AcompanhamentoResponseDto } from "../types/AcompanhamentoResponseDto";

interface AcompanhamentoContextProps {
  children: ReactNode;
}

export function AcompanhamentoContextProvider({
  children,
}: AcompanhamentoContextProps) {
  const [acompanhamentos, setAcompanhamentos] = useState<
    Array<AcompanhamentoDto>
  >([]);

  const [carregado, setCarregado] = useState(false);

  const acompnhamentoRepository = new AcompanhamentoRepository();

  async function getAllAcompanhamentos() {
    var token = localStorage.getItem(LocalStorageKeys.TOKEN);

    if (token != null) {
      var listaResponse = await acompnhamentoRepository.getAll(token);
      var listaMapeada =
        mapeaAcompanhamentoResponseDtoParaAcompanhamentoDto(listaResponse);
      setAcompanhamentos(listaMapeada);
    }

    setCarregado(true);
  }

  console.log("-----acompanhamentos-------");
  console.log(acompanhamentos);

  function mapeaAcompanhamentoResponseDtoParaAcompanhamentoDto(
    lista: AcompanhamentoResponseDto[]
  ) {
    var novaLista: AcompanhamentoDto[] = [];
    lista.forEach((v) => {
      var item: AcompanhamentoDto = {
        id: v.id,
        descricao: v.descricao,
        disponibilidade: v.disponibilidade,
        imagem: v.imagem,
        nome: v.nome,
        preco: v.preco,
        quantidade: 0,
        createdAt: v.createdAt,
      };
      novaLista.push(item);
    });

    return novaLista;
  }

  return (
    <AcompanhamentoContext.Provider
      value={{
        getAllAcompanhamentos,
        acompanhamentos,
        carregado,
      }}
    >
      {children}
    </AcompanhamentoContext.Provider>
  );
}
