import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { cores } from "../assets/cores";
import { usePrecoTotalCarrinho } from "../customHooks/usePrecoTotalCarrinho";
import { useCarrinhoContext } from "../defaultContexts/CarrinhoContextDefault";
import { Rotas } from "../enums/Rotas";
import { AppUtils } from "../utils/AppUtils";

export type Preco = number | string | undefined;

export function VerCarrinhoBtn() {
  const precoTotal = usePrecoTotalCarrinho();

  const { salgadosList, acompanhamentoList } = useCarrinhoContext();

  const nav = useNavigate();

  const contadorTotalSalgados = useMemo(() => {
    var total = 0;
    salgadosList.forEach((salg) => {
      var quantidade = salg.quantidade;

      total += quantidade;
    });
    return total;
  }, [salgadosList]);

  const contadorAcompanhamentos = useMemo(() => {
    var total = 0;
    acompanhamentoList.forEach((a) => {
      var quantidade = a.quantidade;

      total += quantidade;
    });
    return total;
  }, [salgadosList]);

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
        <Esquerdo
          contador={contadorTotalSalgados + contadorAcompanhamentos}
          preco={precoTotal}
        />
        <Btn text="Ver carrinho" />
      </div>
    );
  return null;
}

interface EsquerdoProps {
  preco: Preco;
  contador: number;
}

function Esquerdo({ contador, preco }: EsquerdoProps) {
  const contadorText = contador > 1 ? "items" : "item";
  return (
    <div>
      <p style={{ color: "#3C3B3B" }}>Total sem a entrega</p>
      <div style={{ display: "flex", columnGap: 5 }}>
        <p>{AppUtils.toMoedaBrasileira(preco as number)}</p>

        <p style={{ color: "#3C3B3B" }}>
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
      <p>{text}</p>
    </div>
  );
}
