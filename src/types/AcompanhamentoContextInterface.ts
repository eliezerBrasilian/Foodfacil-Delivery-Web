import { AcompanhamentoDto } from "./AcompanhamentoDto";

export interface AcompanhamentoContextInterface {
  getAllAcompanhamentos: () => void;
  acompanhamentos: Array<AcompanhamentoDto>;
  carregado: boolean;
}
