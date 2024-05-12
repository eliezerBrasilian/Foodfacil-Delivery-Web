import { cores } from "../assets/cores";
import { Imagem } from "./Imagem";

interface CarrinhoComCirculoProps {
  contador?: number;
}

export function HomeHeader({ contador = 0 }: CarrinhoComCirculoProps) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      <Imagem imagePath="top_logo.png" height={50} width={70} />
      <div>
        <p>Estamos funcionando!</p>
        <p>De 18:30 às 22h</p>
      </div>
      <CarrinhoComCirculo contador={contador} />
    </div>
  );
}

function CarrinhoComCirculo({ contador }: CarrinhoComCirculoProps) {
  return (
    <div>
      <Imagem imagePath="top_carrinho.png" height={25} width={25} />
      <div
        style={{
          height: 19,
          width: 19,
          borderRadius: 19 / 2,
          background: cores.font_ativa,
          position: "absolute",
          top: 30,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <p style={{ color: "white", fontSize: 15 }}>{contador}</p>
      </div>
    </div>
  );
}
