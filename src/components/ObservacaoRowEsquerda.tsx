import { Imagem } from "./Imagem";

export function ObservacaoRowEsquerda() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        columnGap: 10,
      }}
    >
      <Imagem imagePath="/message.png" height={26} width={26} />
      <p style={{ color: "#4C4C4C", fontWeight: "600" }}>Alguma observação?</p>
    </div>
  );
}
