import { CarrinhoItems } from "../components/CarrinhoItems";
import { Complementos } from "../components/Complementos";
import { FinalizarPedidoBtn } from "../components/FinalizarPedidoBtn";
import { Linha } from "../components/Linha";
import { PedidoMinimoAviso } from "../components/PedidoMinimoAviso";
import { ResumoDoPedido } from "../components/ResumoDoPedido";
import { TopBar } from "../components/TopBar";
import s from "../modules/TelaCarrinho.module.css";

export function TelaCarrinhoDeCompras() {
  return (
    <div className={s.container}>
      <TopBar text="Minha cesta" />
      <div style={{ marginTop: 20 }} />
      <CarrinhoItems />
      <Linha borderBottomColor="gray" borderBottomWidth={0.4} />
      <PedidoMinimoAviso />
      <Complementos />
      <ResumoDoPedido />
      <FinalizarPedidoBtn />
    </div>
  );
}
