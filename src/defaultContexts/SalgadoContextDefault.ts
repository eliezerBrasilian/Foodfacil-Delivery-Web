import { createContext, useContext } from "react";
import { SalgadoContextInterface } from "../types/SalgadoContextInterface";
import { SalgadoRequestDto } from "../types/SalgadoRequestDto";
import { SalgadoRequestEditDto } from "../types/SalgadoRequestEditDto";
import { SalgadoResponseDto } from "../types/SalgadoResponseDto";

const defaultContext: SalgadoContextInterface = {
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
  excluirSalgado: (_salgadoId: string, _token: string) => {},
  excluirTodos: (_t: string, _onError: (s: string) => void) => {},
  buscaItem: (_id: string): SalgadoResponseDto | undefined => {
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
