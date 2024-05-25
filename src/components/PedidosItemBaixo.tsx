import { PagamentoStatus } from "../types/PagamentoStatus";
import { PedidoStatus } from "../types/PedidoStatus";
import { AppUtils } from "../utils/AppUtils";
import { ChavePixView } from "./ChavePixView";

import s from "../modules/TelaPedido.module.css";
import { PedidoService } from "../services/PedidoService";
import { Imagem } from "./Imagem";

interface PedidosItemBaixoProps {
  chavePix: string;
  pagamentoStatus: PagamentoStatus;
  pedidoStatus: PedidoStatus;
  createdAt: number;
}

export function PedidosItemBaixo({
  chavePix,
  pagamentoStatus,
  pedidoStatus,
  createdAt,
}: PedidosItemBaixoProps) {
  const pedidoService = new PedidoService();

  if (
    pagamentoStatus == PagamentoStatus.AGUARDANDO_PAGAMENTO &&
    !AppUtils.isExpired(createdAt)
  )
    return (
      <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
        <ChavePixView chave={chavePix} marginTop={0} />
      </div>
    );
  else if (
    pagamentoStatus == PagamentoStatus.AGUARDANDO_PAGAMENTO &&
    AppUtils.isExpired(createdAt)
  ) {
    return (
      <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
        <p className={s.pedido_expirado}>pedido expirado</p>
      </div>
    );
  } else
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 20,
          columnGap: 4,
        }}
      >
        <Imagem
          height={15}
          width={15}
          imagePath={pedidoService.getPedidoStatusResult(pedidoStatus).icone}
        />
        <p>{pedidoService.getPedidoStatusResult(pedidoStatus).text}</p>
      </div>
    );
}
