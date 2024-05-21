import { useMemo } from "react";
import { useCarrinhoContext } from "../defaultContexts/CarrinhoContextDefault";

export function usePrecoTotalCarrinho() {
  const { salgadosList, acompanhamentoList } = useCarrinhoContext();

  const precoTotalSalgados = useMemo(() => {
    var total = 0;
    salgadosList.forEach((salg) => {
      var quantidade = salg.quantidade;

      if (salg.emOferta) {
        total += salg.precoEmOferta * quantidade;
      } else {
        total += salg.preco * quantidade;
      }
    });
    return total;
  }, [salgadosList]);

  const precoTotalAcompanhamentos = useMemo(() => {
    var total = 0;
    acompanhamentoList.forEach((a) => {
      var quantidade = a.quantidade;

      total += a.preco * quantidade;
    });
    return total;
  }, [acompanhamentoList]);

  return precoTotalSalgados + precoTotalAcompanhamentos;
}
