import { NotificacaoRequestDTO } from "./NotificacaoRequestDTO";
import { TokenDispositivoResponseDto } from "./TokenDispositivoResponseDto";

export interface NotificacaoContextInterface {
  enviaNotificacao: (
    notificacaoRequestDto: NotificacaoRequestDTO,
    onSuccess: (msg: string) => void,
    onError: (msg: string) => void,
    token: string
  ) => void;
  listaTokensDeCelulares: (
    token: string,
    onSuccess: (msg: string) => void,
    onError: (msg: string) => void
  ) => void;
  listTokensDeCelulares: Array<TokenDispositivoResponseDto>;
  excluir: (
    id: string,
    token: string,
    onSuccess: (msg: string) => void,
    onError: (msg: string) => void
  ) => void;
}
