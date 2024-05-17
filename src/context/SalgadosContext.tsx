import { ReactNode, useState } from "react";
import { SalgadosContext } from "../defaultContexts/SalgadoContextDefault";
import { Categoria } from "../enums/Categoria";
import { LocalStorageKeys } from "../enums/LocalStorageKeys";
import { SalgadoRepository } from "../repositories/SalgadoRepository";
import { SalgadoDto } from "../types/SalgadoDto";
import { SalgadoResponseDto } from "../types/SalgadoResponseDto";

type SalgadoProviderProps = {
  children: ReactNode;
};

export function SalgadosContextProvider({ children }: SalgadoProviderProps) {
  const [salgados, setSalgados] = useState<Array<SalgadoDto>>([]);

  const [salgadosEmPromocao, setSalgadosEmPromocao] = useState<
    Array<SalgadoDto>
  >([]);
  const [combos, setCombos] = useState<Array<SalgadoDto>>([]);

  const [carregado, setCarregado] = useState(false);
  const [carregando, setCarregando] = useState(true);

  const salgadoRepository = new SalgadoRepository();

  function saborEstaAdicionado(salgadoId: string, nome: string) {
    const index = salgados.findIndex((salg) => salg.id == salgadoId);

    if (index != 1) {
      return salgados[index].sabores.includes(nome);
    }
    return false;
  }

  function adicionaSabores(
    salgadoId: string,
    sabores: string[],
    observacao: string
  ) {
    const index = salgados.findIndex((salg) => salg.id === salgadoId);

    if (index !== -1) {
      setSalgados((oldStateList) => {
        const newList = oldStateList.map((salgado, idx) => {
          if (idx === index) {
            salgado.sabores = sabores;
            salgado.observacao = observacao;
          }
          return salgado;
        });
        return newList;
      });

      return salgados[index];
    }
    return null;
  }

  async function getAllSalgados() {
    setCarregando(true);

    var token = localStorage.getItem(LocalStorageKeys.TOKEN);

    if (token != null) {
      var listaResponse = await salgadoRepository.getAll(token);

      var listaMapeada = mapeaSalgadoResponseDtoParaSalgadoDto(listaResponse);
      console.log("-----------listaMapeada--------");
      console.log(listaMapeada);
      setSalgados(listaMapeada);

      setSalgadosEmPromocao(salgados.filter((salg) => salg.emOferta == true));
      setCombos(
        listaMapeada.filter((salg) => salg.categoria == Categoria.COMBO)
      );
    }

    setCarregado(true);
    setCarregando(false);
  }

  function mapeaSalgadoResponseDtoParaSalgadoDto(lista: SalgadoResponseDto[]) {
    var novaLista: SalgadoDto[] = [];
    lista.forEach((v) => {
      var item: SalgadoDto = {
        id: v.id,
        categoria: v.categoria,
        descricao: v.descricao,
        disponibilidade: v.disponibilidade,
        emOferta: v.emOferta,
        imagem: v.imagem,
        imagemQuadrada: v.imagemQuadrada,
        imagemRetangular: v.imagemRetangular,
        nome: v.nome,
        preco: v.preco,
        precoEmOferta: v.precoEmOferta,
        quantidade: 0,
        sabores: v.sabores,
        createdAt: v.createdAt,
      };
      novaLista.push(item);
    });

    return novaLista;
  }

  function buscaItem(id: string): SalgadoDto | undefined {
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
        adicionaSabores,
        saborEstaAdicionado,
      }}
    >
      {children}
    </SalgadosContext.Provider>
  );
}
