import { usePrecoTotalCarrinho } from "../customHooks/usePrecoTotalCarrinho";
import { Imagem } from "./Imagem";

export function PedidoMinimoAviso() {
  const precoTotal = usePrecoTotalCarrinho();

  if (precoTotal < 20)
    return (
      <div
        style={{
          backgroundColor: "#FFF9E8",
          padding: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 30,
        }}
      >
        <Imagem imagePath="/exclamacao_aviso.png" height={30} width={30} />

        <p style={{ color: "#BBA76C" }}>
          O pedido mínimo para entrega é de R$ 20,00
        </p>
      </div>
    );
  return null;
}
