export function MonteSeuPedido() {
  return (
    <div
      style={{
        backgroundColor: "#f1f1f1",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        rowGap: 4,
        padding: 15,
      }}
    >
      <p style={{ color: "#4C4C4C", fontWeight: "700", fontSize: 13 }}>
        Monte seu pedido:
      </p>
      <p style={{ color: "#555353", fontSize: 12 }}>
        Escolha no mínimo 3 opções
      </p>
    </div>
  );
}
