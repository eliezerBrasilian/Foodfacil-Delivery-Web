import { useNavigate } from "react-router-dom";
import { useTaxaContext } from "../context/TaxaContext";
import { usePrecoTotalCarrinho } from "../customHooks/usePrecoTotalCarrinho";
import { Rotas } from "../enums/Rotas";
import { AppUtils } from "../utils/AppUtils";
import { CustomBtn } from "./CustomBtn";

export type Preco = number | string | undefined;

interface FinalizarPedidoBtnProps {
  onClick: () => void;
}
export function FinalizarPedidoBtn({ onClick }: FinalizarPedidoBtnProps) {
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
        <CustomBtn text="Finalizar pedido" onClick={onClick} />
      </div>
    );
  return null;
}

interface EsquerdoProps {
  preco: Preco;
}

function Esquerdo({ preco }: EsquerdoProps) {
  const { taxa } = useTaxaContext();

  if (taxa == -1)
    return (
      <div>
        <p style={{ color: "#3C3B3B", fontSize: 14 }}>
          Total sem a taxa de entrega
        </p>
        <div style={{ display: "flex", columnGap: 5 }}>
          <p style={{ fontSize: 16 }}>
            {AppUtils.toMoedaBrasileira(preco as number)}
          </p>
        </div>
      </div>
    );
  else {
    return (
      <div>
        <p style={{ color: "#3C3B3B", fontSize: 14 }}>
          Total com a taxa de entrega
        </p>
        <div style={{ display: "flex", columnGap: 5 }}>
          <p style={{ fontSize: 16 }}>
            {AppUtils.toMoedaBrasileira((preco as number) + taxa)}
          </p>
        </div>
      </div>
    );
  }
}
