import CurrencyFormat, { Values } from "react-currency-format";
import { cores } from "../assets/cores";

interface TrocoPopUpViewProps {
  valorInput: number;
  btnConfirmarVisivel: boolean;
  handleClickNaoPrecisoDeTroco: () => void;
  handleClickPrecisoDeTroco: () => void;
  onChangeValorInput: (values: Values) => void;
}

export function TrocoPopUpView({
  valorInput,
  btnConfirmarVisivel,
  onChangeValorInput,
  handleClickNaoPrecisoDeTroco,
  handleClickPrecisoDeTroco,
}: TrocoPopUpViewProps) {
  return (
    <div
      style={{
        backgroundColor: "white",
        width: "100%",
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 580,
        padding: 30,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <h4>Vai precisar de troco?</h4>
        <p style={{ color: "#575656", marginTop: 25 }}>
          Digite o valor que você vai pagar em dinheiro, pra que entregador leve
          o troco para você.
        </p>
        <div style={{ display: "flex", columnGap: 20, marginTop: 30 }}>
          <p style={{ color: "#484747", fontWeight: "600" }}>R$</p>
          <CurrencyFormat
            value={valorInput}
            decimalSeparator=","
            thousandSeparator="."
            isNumericString={true}
            allowNegative={false}
            decimalScale={2}
            fixedDecimalScale={true}
            onValueChange={onChangeValorInput}
            style={{
              borderStyle: "none",
              borderBottom: "1px solid black",
              outline: "none",
              fontSize: 17,
              fontWeight: "600",
              maxWidth: 70,
              textAlign: "center",
            }}
          />
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          rowGap: 15,
          width: "100%",
          marginBottom: 30,
        }}
      >
        {btnConfirmarVisivel && (
          <button
            onClick={handleClickPrecisoDeTroco}
            style={{
              backgroundColor: "#D9D9D9",
              height: 50,
              border: "1px solid transparent",
              borderRadius: 11,
            }}
          >
            <p>Confirmar</p>
          </button>
        )}

        <button
          onClick={handleClickNaoPrecisoDeTroco}
          style={{
            backgroundColor: "#fff",
            height: 50,
            border: `1px solid ${cores.btn_vermelho}`,
            borderRadius: 11,
          }}
        >
          <p style={{ color: cores.btn_vermelho }}>Não preciso de troco</p>
        </button>
      </div>
    </div>
  );
}
