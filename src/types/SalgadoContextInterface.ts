import { SalgadoRequestDto } from "./SalgadoRequestDto";
import { SalgadoRequestEditDto } from "./SalgadoRequestEditDto";
import { SalgadoResponseDto } from "./SalgadoResponseDto";

export interface SalgadoContextInterface {
  salgados: Array<SalgadoResponseDto>;
  salgadosEmPromocao: Array<SalgadoResponseDto>;
  combos: Array<SalgadoResponseDto>;
  carregando: boolean;
  carregado: boolean;
  getAllSalgados: () => void;
  salvarSalgado: (
    salgadoObj: SalgadoRequestDto,
    token: string,
    onError: (message: string) => void
  ) => void;
  editarSalgado: (salgadoObj: SalgadoRequestEditDto, token: string) => void;
  excluirSalgado: (salgadoId: string, token: string) => void;
  excluirTodos: (token: string, onError: (s: string) => void) => void;
  buscaItem: (id: string) => SalgadoResponseDto | undefined;
  adicionaSabores(
    salgadoId: string,
    sabores: string[],
    observacao: string
  ): SalgadoResponseDto | null;
  saborEstaAdicionado(salgadoId: string, nome: string): boolean;
}
