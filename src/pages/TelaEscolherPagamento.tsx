import { useEffect, useMemo, useState } from "react";
import { Values } from "react-currency-format";
import { DinheiroView } from "../components/DinheiroView";
import { PixView } from "../components/PixView";
import { TopBar } from "../components/TopBar";
import { TrocoPopUpView } from "../components/TrocoPopUpView";
import { useTaxaContext } from "../context/TaxaContext";
import { usePrecoTotalCarrinho } from "../customHooks/usePrecoTotalCarrinho";
import { useMetodoPagamentoContext } from "../defaultContexts/MetodoPagamentoContextDefault";
import { MetodoPagamento } from "../enums/MetodoPagamento";
import s from "../modules/TelaEscolherPagamento.module.css";

export function TelaEscolherPagamento() {
  const { escolheMetodo, metodoEscolhido, defineSaldo, saldo } =
    useMetodoPagamentoContext();

  const [popUpVisivel, setPopUpVisivel] = useState(false);

  const total = usePrecoTotalCarrinho();
  const { taxa } = useTaxaContext();

  const [btnConfirmarVisivel, setBtnConfirmarVisivel] = useState(false);

  const inicialTotalState = saldo == 0 ? total + taxa : saldo;

  useEffect(() => {
    const t = total + taxa;

    if (inicialTotalState > t) {
      setBtnConfirmarVisivel(true);
    } else setBtnConfirmarVisivel(false);
  }, []);

  const [valorInput, setValorInput] = useState(inicialTotalState);

  const handleClickPixView = () => {
    escolheMetodo(MetodoPagamento.PIX);
  };
  const handleClickDinView = () => {
    setPopUpVisivel(true);
    escolheMetodo(MetodoPagamento.DINHEIRO);
  };

  const handleClickPrecisoDeTroco = () => {
    defineSaldo(valorInput);
    setPopUpVisivel(false);
  };
  const handleClickNaoPrecisoDeTroco = () => {
    defineSaldo(total + taxa);
    setPopUpVisivel(false);
  };

  const metodoEscolhidoSnap = useMemo(() => {
    return metodoEscolhido;
  }, [metodoEscolhido]);

  const onChangeValorInput = (values: Values) => {
    const v = values.floatValue;
    console.log("v: " + v);

    if (!isNaN(v)) {
      setValorInput(v);

      const t = total + taxa;

      if (v > t) {
        setBtnConfirmarVisivel(true);
      } else setBtnConfirmarVisivel(false);
    } else {
      console.log("exato");
      setValorInput(0);
      setBtnConfirmarVisivel(false);
    }
  };

  return (
    <div
      className={s.container}
      style={{ backgroundColor: popUpVisivel ? "#d0d0d0" : "#fff" }}
    >
      <TopBar text="Pagamento" />
      <div style={{ marginTop: 20 }} />

      <h3>Formas de pagamento</h3>
      <div style={{ marginTop: 20 }} />
      <PixView
        selecionado={metodoEscolhidoSnap == MetodoPagamento.PIX}
        onClick={handleClickPixView}
      />
      <div style={{ marginTop: 13 }} />
      <DinheiroView
        selecionado={metodoEscolhidoSnap == MetodoPagamento.DINHEIRO}
        onClick={handleClickDinView}
      />
      {popUpVisivel && (
        <TrocoPopUpView
          valorInput={valorInput}
          onChangeValorInput={onChangeValorInput}
          handleClickNaoPrecisoDeTroco={handleClickNaoPrecisoDeTroco}
          handleClickPrecisoDeTroco={handleClickPrecisoDeTroco}
          btnConfirmarVisivel={btnConfirmarVisivel}
        />
      )}
    </div>
  );
}
