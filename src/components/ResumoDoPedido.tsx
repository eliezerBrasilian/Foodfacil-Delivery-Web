import { usePrecoTotalCarrinho } from "../custom_hooks/usePrecoTotalCarrinho";
import { AppUtils } from "../utils/AppUtils";

export function ResumoDoPedido() {
  const subtotal = usePrecoTotalCarrinho();
  return (
    <div style={{ marginTop: 40 }}>
      <h4>Resumo do pedido</h4>
      <PedidoRow chave="Subtotal" valor={subtotal} />
      <PedidoRow chave="Taxa de entrega" valor={"à calcular"} />
      {/* <PedidoRow chave="Total" valor={16} /> */}
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
        {valor == "à calcular"
          ? valor
          : AppUtils.toMoedaBrasileira(valor as number)}
      </p>
    </div>
  );
}
