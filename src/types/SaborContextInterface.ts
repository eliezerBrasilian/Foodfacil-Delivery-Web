import { SaborResponseDto } from "./SaborResponseDto";

export interface SaborContextInterface {
  lista: Array<SaborResponseDto>;
  getAll: () => void;
  carregado: boolean;
  carregando: boolean;
}
