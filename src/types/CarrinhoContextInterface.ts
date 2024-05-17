import { AcompanhamentoDto } from "./AcompanhamentoDto";
import { SalgadoDto } from "./SalgadoDto";

export interface CarrinhoContextInterface {
  salgadosList: Array<SalgadoDto>;
  acompanhamentoList: Array<AcompanhamentoDto>;
  incrementar: (salgadoId: string) => void;
  decrementar: (salgadoId: string) => void;
  addSalgado: (salgado: SalgadoDto) => void;
  addAcompanhamento: (acomp: AcompanhamentoDto) => void;
  incrementarAcompanhamento: (id: string) => void;
  decrementarAcompanhamento: (id: string) => void;
}
