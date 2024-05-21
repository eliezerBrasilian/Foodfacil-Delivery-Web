import { AppUtils } from "../utils/AppUtils";

interface PedidoRowProps {
  chave: string;
  valor: number | string;
}

export function PedidoRow({ chave, valor }: PedidoRowProps) {
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
