import { Imagem } from "./Imagem";

interface CarrinhoItensBtsProps {
  contador: number;
  incrementar?: () => void;
  decrementar?: () => void;
}

export function CarrinhoItensBts({
  contador,
  decrementar,
  incrementar,
}: CarrinhoItensBtsProps) {
  var tam = 25;
  return (
    <div
      style={{
        backgroundColor: "#F6F6F6",
        display: "flex",
        columnGap: 8,
        justifyContent: "space-between",
        alignItems: "center",
        padding: 5,
      }}
    >
      <Imagem
        height={tam}
        width={tam}
        imagePath="/menos.png"
        onClick={decrementar}
      />
      <p style={{ fontFamily: "Inter", fontSize: 15 }}>{contador}</p>
      <Imagem
        height={tam}
        width={tam}
        imagePath="/mais.png"
        onClick={incrementar}
      />
    </div>
  );
}
