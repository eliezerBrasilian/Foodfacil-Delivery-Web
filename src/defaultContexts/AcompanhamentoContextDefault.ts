import { createContext, useContext } from "react";
import { AcompanhamentoContextInterface } from "../types/AcompanhamentoContextInterface";

const defaultAcompanhamentoContext: AcompanhamentoContextInterface = {
  getAllAcompanhamentos: () => {},
  acompanhamentos: [],
  carregado: false,
};

export const AcompanhamentoContext = createContext(
  defaultAcompanhamentoContext
);

export function useAcompanhamentoContext() {
  return useContext(AcompanhamentoContext);
}
