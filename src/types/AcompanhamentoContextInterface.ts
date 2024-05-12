import { AcompanhamentoRequestDto } from "./AcompanhamentoRequestDto";
import { AcompanhamentoRequestEditDto } from "./AcompanhamentoRequestEditDto";
import { AcompanhamentoResponseDto } from "./AcompanhamentoResponseDto";

export interface AcompanhamentoContextInterface {
  getAllAcompanhamentos: () => void;
  acompanhamentos: Array<AcompanhamentoResponseDto>;
  salvarAcompanhamento: (
    pedidoObj: AcompanhamentoRequestDto,
    token: string,
    onError: (message: string) => void
  ) => void;
  editarAcompanhamento: (
    acompObj: AcompanhamentoRequestEditDto,
    token: string
  ) => void;
  excluirAcompanhamento: (acompId: string, token: string) => void;
  carregado: boolean;
}
