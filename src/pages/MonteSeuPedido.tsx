export function MonteSeuPedido() {
  return (
    <div
      style={{
        backgroundColor: "#f1f1f1",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        rowGap: 10,
        padding: 15,
      }}
    >
      <p style={{ color: "#4C4C4C", fontWeight: "700" }}>Monte seu pedido:</p>
      <p style={{ color: "#555353" }}>Escolha no mínimo 3 opções</p>
    </div>
  );
}
