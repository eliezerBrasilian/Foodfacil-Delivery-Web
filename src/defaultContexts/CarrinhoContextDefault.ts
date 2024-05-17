import { createContext, useContext } from "react";
import { CarrinhoContextInterface } from "../types/CarrinhoContextInterface";

const defaultContext: CarrinhoContextInterface = {
  salgadosList: [],
  acompanhamentoList: [],
  incrementar: (_salgadoId) => {},
  decrementar: (_salgadoId) => {},
  addSalgado: (_salgado) => {},
  addAcompanhamento: (_acomp) => {},
  decrementarAcompanhamento: (_id) => {},
  incrementarAcompanhamento: (_id) => {},
};

export const CarrinhoContext = createContext(defaultContext);

export function useCarrinhoContext() {
  return useContext(CarrinhoContext);
}
