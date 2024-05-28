import { cores } from "../assets/cores";
import { useContadorTotalCarrinho } from "../customHooks/useContadorTotalCarrinho";
import { Imagem } from "./Imagem";
import { OnlineStatusComponent } from "./OnlineStatusComponent";

export function HomeHeader() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        padding: 15,
      }}
    >
      <Imagem imagePath="top_logo.png" height={50} width={70} />

      <OnlineStatusComponent />

      <CarrinhoComCirculo />
    </div>
  );
}

export function CarrinhoComCirculo() {
  const contadorTotal = useContadorTotalCarrinho();
  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <img src="top_carrinho.png" height={30} width={30} />
      <div
        style={{
          position: "absolute",
          top: "10%",
          right: "-10%",
          height: 20,
          width: 20,
          backgroundColor: cores.contador_circulo_amarelo,
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: cores.font_ativa,
          fontSize: "11px",
          fontWeight: "bold",
        }}
      >
        {contadorTotal}
      </div>
    </div>
  );
}
