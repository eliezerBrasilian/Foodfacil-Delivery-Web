import { createContext, useContext } from "react";
import { CarrinhoContextInterface } from "../types/CarrinhoContextInterface";
import { SalgadoResponseDto } from "../types/SalgadoResponseDto";

const defaultContext: CarrinhoContextInterface = {
  carrinhoList: [],
  incrementar: (_salgadoId: string) => {},
  decrementar: (_salgadoId: string) => {},
  addSalgado: (_salgado: SalgadoResponseDto) => {},
};

export const CarrinhoContext = createContext(defaultContext);

export function useCarrinhoContext() {
  return useContext(CarrinhoContext);
}
