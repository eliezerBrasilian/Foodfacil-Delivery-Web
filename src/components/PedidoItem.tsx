import { useNavigate } from "react-router-dom";
import { Rotas } from "../enums/Rotas";
import { PedidoDoUsuarioResponseDto } from "../types/PedidoDoUsuarioResponseDto";
import { AppUtils } from "../utils/AppUtils";
import { PedidosItemBaixo } from "./PedidosItemBaixo";
import { PedidosItemCima } from "./PedidosItemCima";
import { PedidosItemMeio } from "./PedidosItemMeio";

interface PedidoItemProps {
  pedido: PedidoDoUsuarioResponseDto;
}

export function PedidoItem({ pedido }: PedidoItemProps) {
  const nav = useNavigate();
  return (
    <div>
      <p
        style={{
          marginTop: 10,
          marginBottom: 10,
          color: "#545454",
          fontSize: 12,
        }}
      >
        {AppUtils.milisegundosParaDiaAbreviadoDeMesDeAno(pedido.createdAt)}
      </p>
      <div
        style={{
          border: "1px solid #787878",
          borderRadius: 12,
          marginBottom: 10,
          paddingBottom: 10,
        }}
      >
        <div
          onClick={() => {
            nav(Rotas.TELA_DETALHES_DO_PEDIDO + "/" + pedido.id);
          }}
        >
          <PedidosItemCima salgados={pedido.salgados} />
        </div>

        <PedidosItemMeio
          pagamentoStatus={pedido.pagamentoStatus}
          pagamentoEscolhido={pedido.pagamentoEscolhido}
          createdAt={pedido.createdAt}
        />

        <PedidosItemBaixo
          chavePix={pedido.chavePix}
          pagamentoStatus={pedido.pagamentoStatus}
          pedidoStatus={pedido.status}
          createdAt={pedido.createdAt}
        />
      </div>
    </div>
  );
}
