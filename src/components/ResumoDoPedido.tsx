import { useEffect, useState } from "react";
import { useTaxaContext } from "../context/TaxaContext";
import { usePrecoTotalCarrinho } from "../customHooks/usePrecoTotalCarrinho";
import { PedidoRow } from "./PedidoRow";

export function ResumoDoPedido() {
  const subtotal = usePrecoTotalCarrinho();

  const { taxa } = useTaxaContext();

  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    setTotal(taxa + subtotal);
  }, [taxa, subtotal]);

  return (
    <div style={{ marginTop: 30 }}>
      <h4>Resumo do pedido</h4>
      <PedidoRow chave="Subtotal" valor={subtotal} />

      <PedidoRow chave="Taxa de entrega" valor={taxa} />
      {taxa != -1 && <PedidoRow chave="Total" valor={total} />}
    </div>
  );
}
