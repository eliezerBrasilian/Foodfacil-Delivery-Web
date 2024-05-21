import { MetodoPagamento } from "../enums/MetodoPagamento";

export interface MetodoPagamentoContextInterface {
  metodoEscolhido: MetodoPagamento;
  saldo: number;
  escolheMetodo: (metodo: string) => void;
  defineSaldo: (saldo: number) => void;
}
