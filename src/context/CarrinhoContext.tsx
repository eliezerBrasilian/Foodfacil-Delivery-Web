import { ReactNode, useState } from "react";
import { CarrinhoContext } from "../defaultContexts/CarrinhoContextDefault";
import { SalgadoResponseDto } from "../types/SalgadoResponseDto";

interface CarrinhoContextProps {
  children: ReactNode;
}

export function CarrinhoContextProvider({ children }: CarrinhoContextProps) {
  const [carrinhoList, setCarrinhoList] = useState<SalgadoResponseDto[]>([]);

  function incrementar(_salgadoId: string) {}
  function decrementar(_salgadoId: string) {}
  function addSalgado(salgado: SalgadoResponseDto) {
    const index = carrinhoList.findIndex((s) => s.id == salgado.id);

    if (index == -1) {
      setCarrinhoList((oldStateList) => {
        var aux: SalgadoResponseDto[] = oldStateList.map((v) => v);
        aux.push(salgado);

        return aux;
      });
    } else {
      setCarrinhoList((oldStateList) => {
        var aux: SalgadoResponseDto[] = oldStateList.map((v) => v);
        aux[index] = salgado;

        return aux;
      });
    }
  }

  console.log("-------no carrinho---------");
  console.log(carrinhoList);
  return (
    <CarrinhoContext.Provider
      value={{ carrinhoList, incrementar, decrementar, addSalgado }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
}
