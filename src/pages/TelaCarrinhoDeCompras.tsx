import { CarrinhoItems } from "../components/CarrinhoItems";
import { Complementos } from "../components/Complementos";
import { Linha } from "../components/Linha";
import { PedidoMinimoAviso } from "../components/PedidoMinimoAviso";
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
    </div>
  );
}
