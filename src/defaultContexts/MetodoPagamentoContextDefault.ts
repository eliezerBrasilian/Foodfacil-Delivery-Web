import { createContext, useContext } from "react";
import { MetodoPagamento } from "../enums/MetodoPagamento";
import { MetodoPagamentoContextInterface } from "../types/MetodoDePagamanentoContextInterface";

const defaultContext: MetodoPagamentoContextInterface = {
  escolheMetodo: (_m: string) => {},
  saldo: 0,
  metodoEscolhido: MetodoPagamento.PIX,
  defineSaldo: (_s: number) => {},
};

export const MetodoPagamentoContext = createContext(defaultContext);

export function useMetodoPagamentoContext() {
  return useContext(MetodoPagamentoContext);
}
