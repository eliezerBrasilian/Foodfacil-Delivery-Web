import { useEffect, useState } from "react";
import { useTaxaContext } from "../context/TaxaContext";
import { usePrecoTotalCarrinho } from "../custom_hooks/usePrecoTotalCarrinho";
import { AppUtils } from "../utils/AppUtils";

export function ResumoDoPedido() {
  const subtotal = usePrecoTotalCarrinho();

  const { taxa } = useTaxaContext();

  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    setTotal(taxa + subtotal);
  }, [taxa]);

  return (
    <div style={{ marginTop: 30 }}>
      <h4>Resumo do pedido</h4>
      <PedidoRow chave="Subtotal" valor={subtotal} />
      <PedidoRow chave="Taxa de entrega" valor={taxa} />
      {taxa != -1 && <PedidoRow chave="Total" valor={total} />}
    </div>
  );
}

interface PedidoRowProps {
  chave: string;
  valor: number | string;
}

function PedidoRow({ chave, valor }: PedidoRowProps) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <p style={{ color: chave == "Total" ? "#000" : "#666666" }}>{chave}</p>
      <p style={{ color: chave == "Taxa de entrega" ? "#0B8900" : "#666666" }}>
        {valor == -1
          ? "à calcular"
          : AppUtils.toMoedaBrasileira(valor as number)}
      </p>
    </div>
  );
}
