import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Imagem } from "../components/Imagem";
import { Linha } from "../components/Linha";
import { TopBar } from "../components/TopBar";
import { usePedidoContext } from "../context/PedidoContext";
import { MetodoPagamento } from "../enums/MetodoPagamento";
import s from "../modules/TelaDetalhesDoPedido.module.css";
import { PedidoDoUsuarioResponseDto } from "../types/PedidoDoUsuarioResponseDto";
import { AppUtils } from "../utils/AppUtils";
import { getPedidoStatusResult } from "./TelaPedidos";
export function TelaDetalhesDoPedido() {
  const { id } = useParams();
  const { getPedido } = usePedidoContext();
  const [pedido, setPedido] = useState<null | PedidoDoUsuarioResponseDto>(null);

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
  }, []);

  if (pedido != null)
    return (
      <div className={s.container}>
        <TopBar text={`Detalhes do pedido - ${id}`} />
        <div className={s.parte_cinza}>
          <p>{getPedidoStatusResult(pedido.status)}</p>
        </div>
        <div className={s.lanche_items_container}>
          {pedido.salgados.map((v, i) => (
            <div className={s.lanche_item} key={i}>
              <img className={s.img} src={v.imagem} />
              <div>
                <p>{v.nome}</p>
                <p>{v.descricao}</p>
              </div>
              <p>{AppUtils.toMoedaBrasileira(v.preco)}</p>
            </div>
          ))}
        </div>

        <Linha borderBottomColor="#EBEBEB" />
        <div className={s.resumo_do_pedido_container}>
          <h4>Resumo do pedido</h4>
          <div className={s.resumo_pedido_item}>
            <p>Subtotal</p>
            <p>{AppUtils.toMoedaBrasileira(pedido.total)}</p>
          </div>
          <div className={s.resumo_pedido_item}>
            <p>Taxa de entrega</p>
            <p>{AppUtils.toMoedaBrasileira(pedido.taxa)}</p>
          </div>

          <div className={s.resumo_pedido_item}>
            <p>Total</p>
            <p>{AppUtils.toMoedaBrasileira(pedido.taxa + pedido.total)}</p>
          </div>
        </div>
        <Linha borderBottomColor="#EBEBEB" />

        <div className={s.forma_pagamento_container}>
          <p>Forma de pagamento</p>
          <div>
            <Imagem
              imagePath={"../../public/pix_semfundo.png"}
              height={20}
              width={20}
            />
            <p>
              {pedido.pagamentoEscolhido == MetodoPagamento.PIX
                ? "Pix"
                : "Dinheiro"}{" "}
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
      </div>
    );
}
