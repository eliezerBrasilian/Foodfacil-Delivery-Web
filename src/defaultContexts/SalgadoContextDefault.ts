import { createContext, useContext } from "react";
import { SalgadoContextInterface } from "../types/SalgadoContextInterface";
import { SalgadoDto } from "../types/SalgadoDto";

const defaultContext: SalgadoContextInterface = {
  salgados: Array<SalgadoDto>(),
  salgadosEmPromocao: Array<SalgadoDto>(),
  maisPedidos: Array<SalgadoDto>(),
  combos: Array<SalgadoDto>(),
  carregado: false,
  carregando: true,
  getAllSalgados: () => {},
  buscaItem: (_id: string): SalgadoDto | undefined => {
    return undefined;
  },
  adicionaSabores: (
    _salgadoId: string,
    _sabores: string[],
    _observacao: string
  ) => null,
  saborEstaAdicionado: (_salgadoId: string, _nome: string) => false,
};

export const SalgadosContext = createContext(defaultContext);

export function useSalgadosContext() {
  return useContext(SalgadosContext);
}
