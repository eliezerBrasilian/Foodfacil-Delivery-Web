import { useMemo } from "react";
import { useCarrinhoContext } from "../defaultContexts/CarrinhoContextDefault";

export function usePrecoTotalCarrinho() {
  const { carrinhoList } = useCarrinhoContext();

  const precoTotal = useMemo(() => {
    var total = 0;
    carrinhoList.forEach((salg) => {
      if (salg.emOferta) {
        total += salg.precoEmOferta;
      } else {
        total += salg.preco;
      }
    });
    return total;
  }, [carrinhoList]);

  return precoTotal;
}
