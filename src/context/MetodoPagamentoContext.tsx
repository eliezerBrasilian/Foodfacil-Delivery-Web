import { ReactNode, useState } from "react";
import { MetodoPagamentoContext } from "../defaultContexts/MetodoPagamentoContextDefault";
import { MetodoPagamento } from "../enums/MetodoPagamento";

interface MetodoPagamentoContextProps {
  children: ReactNode;
}

export function MetodoPagamentoContextProvider({
  children,
}: MetodoPagamentoContextProps) {
  const [metodoEscolhido, setMetodoEscolhido] = useState(MetodoPagamento.PIX);
  const [saldo, setSaldo] = useState(0);

  function escolheMetodo(m: string) {
    if (m == MetodoPagamento.DINHEIRO) setMetodoEscolhido(m);
    else setMetodoEscolhido(MetodoPagamento.PIX);
  }

  function defineSaldo(saldo: number) {
    console.log("s: " + saldo);
    setSaldo(saldo);
  }

  return (
    <MetodoPagamentoContext.Provider
      value={{ metodoEscolhido, saldo, escolheMetodo, defineSaldo }}
    >
      {children}
    </MetodoPagamentoContext.Provider>
  );
}
