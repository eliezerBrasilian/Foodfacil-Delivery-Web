import { useNavigate } from "react-router-dom";
import { cores } from "../assets/cores";
import { useTaxaContext } from "../context/TaxaContext";
import { useContadorTotalCarrinho } from "../customHooks/useContadorTotalCarrinho";
import { usePrecoTotalCarrinho } from "../customHooks/usePrecoTotalCarrinho";
import { useCarrinhoContext } from "../defaultContexts/CarrinhoContextDefault";
import { Rotas } from "../enums/Rotas";
import { AppUtils } from "../utils/AppUtils";

export type Preco = number | string | undefined;

export function VerCarrinhoBtn() {
  const precoTotal = usePrecoTotalCarrinho();

  const { salgadosList } = useCarrinhoContext();

  const nav = useNavigate();

  const contadorTotal = useContadorTotalCarrinho();

  if (salgadosList.length > 0)
    return (
      <div
        onClick={() => nav(Rotas.TELA_CARRINHO)}
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
          bottom: 80,
          left: 0,
        }}
      >
        <Esquerdo contador={contadorTotal} preco={precoTotal} />
        <Btn text="Ver carrinho" />
      </div>
    );
  return null;
}

interface EsquerdoProps {
  preco: number;
  contador: number;
}

function Esquerdo({ contador, preco }: EsquerdoProps) {
  const contadorText = contador > 1 ? "items" : "item";

  const { taxa } = useTaxaContext();

  const total = taxa == -1 ? preco : taxa + preco;

  return (
    <div>
      <p style={{ color: "#3C3B3B", fontSize: 13 }}>
        Total {taxa == -1 ? "sem" : "com"} a taxa de entrega
      </p>
      <div style={{ display: "flex", columnGap: 5 }}>
        <p style={{ fontSize: 15, fontWeight: "bold" }}>
          {AppUtils.toMoedaBrasileira(total)}
        </p>

        <p style={{ color: "#3C3B3B", fontSize: 15 }}>
          / {contador} {contadorText}
        </p>
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
      <p style={{ fontSize: 13 }}>{text}</p>
    </div>
  );
}
