import { EnderecoEmFinalizarPedido } from "../components/EnderecoEmFinalizarPedido";
import { FinalizarPedidoBtn } from "../components/FinalizarPedidoBtn";
import { ItemsSelecionados } from "../components/ItemsSelecionados";
import { Linha } from "../components/Linha";
import { MetodoDePagamentoEmFinalizarPedido } from "../components/MetodoDePagamentoEmFinalizarPedido";
import { ResumoDoPedido } from "../components/ResumoDoPedido";
import { TopBar } from "../components/TopBar";
import s from "../modules/TelaFinalizarPedido.module.css";

export function TelaFinalizarPedido() {
  return (
    <div className={s.container}>
      <TopBar text="Finalizar pedido" />
      <div style={{ marginTop: 20 }} />
      <ItemsSelecionados />
      <p style={{ marginTop: 20, marginBottom: 20 }}>
        Tempo estimado de entrega: <strong>15 a 30 minutos</strong>
      </p>
      <Linha borderBottomColor="gray" borderBottomWidth={0.4} />
      <ResumoDoPedido />
      <EnderecoEmFinalizarPedido />
      <MetodoDePagamentoEmFinalizarPedido />
      <FinalizarPedidoBtn />
    </div>
  );
}
