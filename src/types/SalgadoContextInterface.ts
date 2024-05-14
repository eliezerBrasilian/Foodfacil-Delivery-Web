import { SalgadoRequestDto } from "./SalgadoRequestDto";
import { SalgadoRequestEditDto } from "./SalgadoRequestEditDto";
import { SalgadoResponseDto } from "./SalgadoResponseDto";

export interface SalgadoContextInterface {
  getAllSalgados: (onError: (s: string) => void) => {};
  salgados: Array<SalgadoResponseDto>;
  salgadosEmPromocao: Array<SalgadoResponseDto>;
  combos: Array<SalgadoResponseDto>;
  salvarSalgado: (
    salgadoObj: SalgadoRequestDto,
    token: string,
    onError: (message: string) => void
  ) => void;
  editarSalgado: (salgadoObj: SalgadoRequestEditDto, token: string) => void;
  excluirSalgado: (salgadoId: string, token: string) => void;
  excluirTodos: (token: string, onError: (s: string) => void) => void;
  carregado: boolean;
}
