import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { CustomBtn } from "../components/CustomBtn";
import { Imagem } from "../components/Imagem";
import { Linha } from "../components/Linha";
import { TopBar } from "../components/TopBar";
import { usePedidoContext } from "../context/PedidoContext";
import { MetodoPagamento } from "../enums/MetodoPagamento";
import s from "../modules/TelaDetalhesDoPedido.module.css";
import { PedidoService } from "../services/PedidoService";
import { PagamentoStatus } from "../types/PagamentoStatus";
import { PedidoDoUsuarioResponseDto } from "../types/PedidoDoUsuarioResponseDto";
import { AppUtils } from "../utils/AppUtils";

export function TelaDetalhesDoPedido() {
  const { id } = useParams();
  const { getPedido } = usePedidoContext();
  const [pedido, setPedido] = useState<null | PedidoDoUsuarioResponseDto>(null);
  const pedidoService = new PedidoService();

  useEffect(() => {
    async function buscaPedido() {
      if (id !== undefined) {
        const pedido = await getPedido(id);
        setPedido(pedido);
        console.log("pedido é:");
        console.log(pedido);
      }
    }
    buscaPedido();

    const intervalId = setInterval(buscaPedido, 3000);

    return () => clearInterval(intervalId);
  }, []);

  const handleClickCopiaChavePix = (chave: string) => {
    AppUtils.copiaChavePixParaTeclado(chave as string);
  };

  if (pedido != null)
    return (
      <div className={s.container}>
        <TopBar text={`Detalhes do pedido - ${id}`} />
        {AppUtils.isExpired(pedido.createdAt) &&
        pedido.pagamentoStatus != PagamentoStatus.PAGAMENTO_APROVADO ? (
          <p className={s.pedido_expirado}>Pedido expirado</p>
        ) : (
          <div className={s.parte_cinza}>
            <Imagem
              imagePath={
                pedidoService.getPedidoStatusResult(pedido.status).icone
              }
              height={20}
              width={20}
            />

            <p>
              {pedido.pagamentoStatus == PagamentoStatus.AGUARDANDO_PAGAMENTO
                ? `Aguardando pagamento via ${
                    pedido.pagamentoEscolhido == MetodoPagamento.PIX
                      ? "PIX"
                      : "Dinheiro"
                  }`
                : pedidoService.getPedidoStatusResult(pedido.status).text}
            </p>
          </div>
        )}

        <div className={s.lanche_items_container}>
          {pedido.salgados.map((v, i) => (
            <div>
              <div className={s.lanche_item} key={i}>
                <img className={s.img} src={v.imagem} />
                <div>
                  <p>{v.nome}</p>
                  <p>{v.descricao}</p>
                </div>
                <p>{AppUtils.toMoedaBrasileira(v.preco)}</p>
              </div>
              {v.observacao != "" && (
                <div>
                  <p className={s.observacao}>Observacao: {v.observacao}</p>
                  <Linha borderBottomColor="gray" borderBottomWidth={0.2} />
                </div>
              )}
            </div>
          ))}
        </div>

        <Linha borderBottomColor="#EBEBEB" />
        <div className={s.resumo_do_pedido_container}>
          <h4>Resumo do pedido</h4>
          <div className={s.resumo_pedido_item}>
            <p>Subtotal</p>
            <p>{AppUtils.toMoedaBrasileira(pedido.total - pedido.taxa)}</p>
          </div>
          <div className={s.resumo_pedido_item}>
            <p>Taxa de entrega</p>
            <p>{AppUtils.toMoedaBrasileira(pedido.taxa)}</p>
          </div>

          <div className={s.resumo_pedido_item}>
            <p>Total</p>
            <p>{AppUtils.toMoedaBrasileira(pedido.total)}</p>
          </div>
        </div>
        <Linha borderBottomColor="#EBEBEB" />

        <div className={s.forma_pagamento_container}>
          <p>Forma de pagamento</p>

          <div>
            <Imagem
              imagePath={
                pedido.pagamentoEscolhido == MetodoPagamento.PIX
                  ? "/pix_semfundo.png"
                  : "/cedula_dinheiro.png"
              }
              height={20}
              width={20}
            />
            <p>
              {pedido.pagamentoEscolhido == MetodoPagamento.PIX
                ? "Pix"
                : "Dinheiro"}
            </p>
          </div>
        </div>
        <Linha borderBottomColor="#EBEBEB" />
        <div className={s.endereco_container}>
          <p
            style={{
              color: "#666666",
              fontSize: 14,
              marginTop: 20,
              marginBottom: 20,
            }}
          >
            Endereço de entrega
          </p>
          <p>Rua: {pedido.endereco.rua}</p>
          <p>Bairro: {pedido.endereco.bairro}</p>
          <p>Número: {pedido.endereco.numero}</p>
          <p>Cidade: {pedido.endereco.cidade}</p>
          <p>Ponto de referência: {pedido.endereco.complemento}</p>
        </div>

        {pedido.pagamentoEscolhido == MetodoPagamento.PIX &&
          !AppUtils.isExpired(pedido.createdAt) &&
          pedido.pagamentoStatus == PagamentoStatus.AGUARDANDO_PAGAMENTO && (
            <div
              style={{
                marginTop: 25,
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <CustomBtn
                text="Copiar chave Pix"
                onClick={() => handleClickCopiaChavePix(pedido.chavePix)}
              />
            </div>
          )}
        <ToastContainer />
      </div>
    );
}
