import { useNavigate } from "react-router-dom";
import { ItemSelecionadoTopProps } from "../components/ItemSelecionadoDetalhesProps";
import s from "../modules/ItemSelecionado.module.css";

export function ItemSelecionadoTop({ capa }: ItemSelecionadoTopProps) {
  const nav = useNavigate();
  return (
    <div>
      <img
        className={s.seta_voltar}
        src="/seta_voltar.png"
        onClick={() => {
          nav(-1);
        }}
      />

      <img className={s.capa} src={capa} height={200} width={"100%"} />
    </div>
  );
}
