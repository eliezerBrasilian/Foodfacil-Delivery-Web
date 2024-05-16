import { CarrinhoItems } from "../components/CarrinhoItems";
import { TopBar } from "../components/TopBar";
import s from "../modules/TelaCarrinho.module.css";

export function TelaCarrinhoDeCompras() {
  return (
    <div className={s.container}>
      <TopBar text="Minha cesta" />
      <div style={{ marginTop: 20 }} />
      <CarrinhoItems />
    </div>
  );
}
