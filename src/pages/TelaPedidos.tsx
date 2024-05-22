import { useEffect, useState } from "react";
import { AppTitulo } from "../components/AppTitulo";
import { ChavePixView } from "../components/ChavePixView";
import { CustomLoading } from "../components/CustomLoading";
import { Imagem } from "../components/Imagem";
import { usePedidoContext } from "../context/PedidoContext";
import { MetodoPagamento } from "../enums/MetodoPagamento";
import s from "../modules/TelaPedido.module.css";
import { PagamentoStatus } from "../types/PagamentoStatus";
import { PedidoDoUsuarioResponseDto } from "../types/PedidoDoUsuarioResponseDto";
import { SalgadoResumidoResponseDto } from "../types/SalgadoResumidoResponseDto";

export function TelaPedidos() {
  const [carregando, _setCarregando] = useState(false);
  const { getAllPedidos, pedidos } = usePedidoContext();

  useEffect(() => {
    getAllPedidos();
  }, []);

  return (
    <div className={s.container}>
      <AppTitulo text="Meus Pedidos" />

      <div style={{ padding: 15 }}>
        <h3>Histórico</h3>

        {carregando ? (
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <CustomLoading />
          </div>
        ) : (
          <PedidoMainContent pedidos={pedidos} />
        )}
      </div>
    </div>
  );
}

interface PedidoMainContentprops {
  pedidos: PedidoDoUsuarioResponseDto[];
}

export function PedidoMainContent({ pedidos }: PedidoMainContentprops) {
  if (pedidos.length == 0) return <p>Sem pedidos no momento</p>;
  return (
    <div style={{ marginBottom: 70, marginTop: 10 }}>
      {pedidos.map((v, i) => (
        <PedidoItem pedido={v} key={i} />
      ))}
    </div>
  );
}

interface PedidoItemProps {
  pedido: PedidoDoUsuarioResponseDto;
}

export function PedidoItem({ pedido }: PedidoItemProps) {
  return (
    <div
      style={{
        border: "1px solid #787878",
        borderRadius: 12,
        marginBottom: 10,
        paddingBottom: 10,
      }}
    >
      <PedidosItemCima salgados={pedido.salgados} />
      <PedidosItemMeio
        pagamentoStatus={pedido.pagamentoStatus}
        pagamentoEscolhido={pedido.pagamentoEscolhido}
      />
      <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
        <ChavePixView chave={pedido.chavePix} marginTop={0} />
      </div>
    </div>
  );
}

interface PedidosItemCimaProps {
  salgados: SalgadoResumidoResponseDto[];
}

export function PedidosItemCima({ salgados }: PedidosItemCimaProps) {
  return (
    <div style={{ padding: 12 }}>
      {salgados.map((v, i) => (
        <PedidoItemCima
          imagem={v.imagem}
          descricao={v.nome}
          titulo={v.nome}
          key={i}
        />
      ))}
    </div>
  );
}

interface PedidoItemCimaProps {
  imagem: string;
  titulo: string;
  descricao: string;
}

export function PedidoItemCima({
  imagem,
  titulo,
  descricao,
}: PedidoItemCimaProps) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: 40,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", columnGap: 19 }}>
        <Imagem height={25} width={25} imagePath={imagem} />
        <div>
          <h2>{titulo}</h2>
          <p>{descricao}</p>
        </div>
      </div>

      <Imagem height={15} width={15} imagePath={"/setadire_vermelho.png"} />
    </div>
  );
}

interface PedidosItemMeioProps {
  pagamentoStatus: PagamentoStatus;
  pagamentoEscolhido: MetodoPagamento;
}

export function PedidosItemMeio({
  pagamentoStatus,
  pagamentoEscolhido,
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
