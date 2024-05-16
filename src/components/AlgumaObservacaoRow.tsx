import { ObservacaoRowEsquerda } from "./ObservacaoRowEsquerda";

interface AlgumaObservacaoRowProps {
  contadorDeCaracteresDigitados?: number;
}
export function AlgumaObservacaoRow({
  contadorDeCaracteresDigitados = 0,
}: AlgumaObservacaoRowProps) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        paddingLeft: 15,
        paddingRight: 15,
      }}
    >
      <ObservacaoRowEsquerda />
      <p style={{ color: "#4C4C4C", fontWeight: "600" }}>
        {contadorDeCaracteresDigitados}/140
      </p>
    </div>
  );
}
