import { useNavigate } from "react-router-dom";
import { cores } from "../assets/cores";
import { useMetodoPagamentoContext } from "../defaultContexts/MetodoPagamentoContextDefault";
import { MetodoPagamento } from "../enums/MetodoPagamento";
import { Rotas } from "../enums/Rotas";
import { DinheiroView } from "./DinheiroView";
import { PixView } from "./PixView";

interface MetodoDePagamentoEmFinalizarPedidoProps {
  bairroState: string;
}
export function MetodoDePagamentoEmFinalizarPedido({
  bairroState,
}: MetodoDePagamentoEmFinalizarPedidoProps) {
  const { metodoEscolhido } = useMetodoPagamentoContext();

  const nav = useNavigate();

  return (
    <div style={{ marginTop: 25 }}>
      {/* cima */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h4>Método de pagamento</h4>
        <p
          onClick={() => {
            if (bairroState == "") {
              window.alert("adicione seu endereço primeiro");
            } else {
              nav(Rotas.TELA_ESCOLHER_PAGAMENTO);
            }
          }}
          style={{ fontSize: 13, color: cores.btn_vermelho }}
        >
          Trocar
        </p>
      </div>
      {/* baixo */}
      <div
        style={{
          marginTop: 20,
        }}
      >
        {metodoEscolhido == MetodoPagamento.PIX ? (
          <PixView selecionado={true} />
        ) : (
          <DinheiroView selecionado={true} />
        )}
      </div>
    </div>
  );
}
