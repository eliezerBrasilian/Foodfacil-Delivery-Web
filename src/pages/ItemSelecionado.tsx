import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSalgadosContext } from "../context/SalgadosContext";
import s from "../modules/ItemSelecionado.module.css";

export function ItemSelecionado() {
  const { id } = useParams();

  const { buscaItem } = useSalgadosContext();

  const nav = useNavigate();

  useEffect(() => {
    if (id !== undefined) buscaItem(id);
  }, []);

  if (id !== undefined)
    return (
      <div className={s.container}>
        <img
          className={s.seta_voltar}
          src="/public/seta_voltar.png"
          onClick={() => {
            nav(-1);
          }}
        />

        <img
          className={s.capa}
          src={buscaItem(id)?.imagemRetangular}
          height={200}
          width={"100%"}
        />
        <p className={s.titulo}>{buscaItem(id)?.nome}</p>
        <p className={s.descricao}>{buscaItem(id)?.descricao}</p>
        <p className={s.preco}>{buscaItem(id)?.preco}</p>
        <p className={s.taxa_de_entrega}>Taxa de entrega: R$2,00</p>
      </div>
    );
  else return <p>Item não encontrado</p>;
}
