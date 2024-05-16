import s from "../modules/ItemSelecionado.module.css";
import { AppUtils } from "../utils/AppUtils";
import { ItemSelecionadoDetalhesProps } from "./ItemSelecionadoDetalhesProps";

export function ItemSelecionadoDetalhes({
  titulo,
  descricao,
  preco,
}: ItemSelecionadoDetalhesProps) {
  return (
    <div className={s.detalhes_container}>
      <p className={s.titulo}>{titulo}</p>
      <p className={s.descricao}>{descricao}</p>
      <div className={s.chao}>
        <p className={s.preco}>
          {AppUtils.toMoedaBrasileira(preco !== undefined ? preco : 0)}
        </p>
        <p className={s.taxa_de_entrega}>Taxa de entrega: R$2,00</p>
      </div>
    </div>
  );
}
