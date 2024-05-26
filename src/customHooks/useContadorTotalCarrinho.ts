import { useMemo } from "react";
import { useCarrinhoContext } from "../defaultContexts/CarrinhoContextDefault";

export function useContadorTotalCarrinho() {
  const { salgadosList, acompanhamentoList } = useCarrinhoContext();

  const contadorTotalSalgados = useMemo(() => {
    var total = 0;
    salgadosList.forEach((salg) => {
      var quantidade = salg.quantidade;

      total += quantidade;
    });
    return total;
  }, [salgadosList]);

  const contadorAcompanhamentos = useMemo(() => {
    var total = 0;
    acompanhamentoList.forEach((a) => {
      var quantidade = a.quantidade;

      total += quantidade;
    });
    return total;
  }, [salgadosList]);

  return contadorTotalSalgados + contadorAcompanhamentos;
}
