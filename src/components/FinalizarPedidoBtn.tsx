import { useNavigate } from "react-router-dom";
import { cores } from "../assets/cores";
import { usePrecoTotalCarrinho } from "../custom_hooks/usePrecoTotalCarrinho";
import { Rotas } from "../enums/Rotas";
import { AppUtils } from "../utils/AppUtils";

export type Preco = number | string | undefined;

export function FinalizarPedidoBtn() {
  const precoTotal = usePrecoTotalCarrinho();

  const nav = useNavigate();

  if (precoTotal >= 20)
    return (
      <div
        onClick={() => nav(Rotas.TELA_FINALIZAR_PEDIDO)}
        style={{
          backgroundColor: "white",
          margin: 0,
          padding: 15,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          columnGap: 20,
          width: "100%",
          position: "fixed",
          bottom: 10,
          left: 0,
        }}
      >
        <Esquerdo preco={precoTotal} />
        <Btn text="Finalizar pedido" />
      </div>
    );
  return null;
}

interface EsquerdoProps {
  preco: Preco;
}

function Esquerdo({ preco }: EsquerdoProps) {
  return (
    <div>
      <p style={{ color: "#3C3B3B" }}>Total sem a taxa de entrega</p>
      <div style={{ display: "flex", columnGap: 5 }}>
        <p>{AppUtils.toMoedaBrasileira(preco as number)}</p>
      </div>
    </div>
  );
}

interface BtnProps {
  text: string;
}
function Btn({ text }: BtnProps) {
  return (
    <div
      style={{
        backgroundColor: cores.btn_vermelho,
        borderRadius: 10,
        padding: 15,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "fit-content",
        color: "#fff",
      }}
    >
      <p>{text}</p>
    </div>
  );
}
