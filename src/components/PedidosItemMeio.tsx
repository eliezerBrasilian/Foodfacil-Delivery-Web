import { MetodoPagamento } from "../enums/MetodoPagamento";
import { PagamentoStatus } from "../types/PagamentoStatus";
import { AppUtils } from "../utils/AppUtils";
import { Imagem } from "./Imagem";

interface PedidosItemMeioProps {
  pagamentoStatus: PagamentoStatus;
  pagamentoEscolhido: MetodoPagamento;
  createdAt: number;
}

export function PedidosItemMeio({
  pagamentoStatus,
  pagamentoEscolhido,
  createdAt,
}: PedidosItemMeioProps) {
  var text = "";

  if (pagamentoStatus == PagamentoStatus.AGUARDANDO_PAGAMENTO) {
    text =
      pagamentoEscolhido == MetodoPagamento.PIX
        ? "Aguardando pagamento via pix"
        : "Aguardando pagamento em dinheiro";
  } else if (pagamentoStatus == PagamentoStatus.PAGAMENTO_APROVADO) {
    text = "Pagamento aprovado";
  } else if (pagamentoStatus == PagamentoStatus.PAGAMENTO_REEMBOLSADO) {
    text = "Pagamento foi reembolsado";
  } else if (pagamentoStatus == PagamentoStatus.PAGAMENTO_REJEITADO) {
    text = "Pagamento foi rejeitado";
  }

  if (
    pagamentoStatus == PagamentoStatus.AGUARDANDO_PAGAMENTO &&
    AppUtils.isExpired(createdAt)
  )
    return null;
  return (
    <div
      style={{
        width: "100%",
        height: 40,
        backgroundColor: "#F5F5F5",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        columnGap: 8,
      }}
    >
      <Imagem height={15} width={15} imagePath={"/aguardando_pagamento.png"} />

      <p style={{ fontSize: 13, fontWeight: "500", fontFamily: "Inter" }}>
        {text}
      </p>
    </div>
  );
}
