import { SalgadoResponseDto } from "./SalgadoResponseDto";

export interface CarrinhoContextInterface {
  carrinhoList: Array<SalgadoResponseDto>;
  incrementar: (salgadoId: string) => void;
  decrementar: (salgadoId: string) => void;
  addSalgado: (salgado: SalgadoResponseDto) => void;
}
