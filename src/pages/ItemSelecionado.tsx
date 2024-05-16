import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSaborContext } from "../context/SaborContext";
import { useSalgadosContext } from "../context/SalgadosContext";
import s from "../modules/ItemSelecionado.module.css";
import { ItemSelecionadoDetalhes } from "./ItemSelecionadoDetalhes";
import { ItemSelecionadoTop } from "./ItemSelecionadoTop";
import { MonteSeuPedido } from "./MonteSeuPedido";
import { SaboresParaEscolher } from "./SaboresParaEscolher";

export function ItemSelecionado() {
  const { id } = useParams();

  const { buscaItem, adicionaSabor, salgados } = useSalgadosContext();
  const { lista: listaDeSabores } = useSaborContext();

  const [saboresEscolhidos, setSaboresEscolhidos] = useState<string[]>([]);

  const handleEscolheSabor = (sabor: string) => {
    if (id != null) {
      setSaboresEscolhidos((oldStateList) => {
        var aux: string[];

        if (!oldStateList.includes(sabor)) {
          aux = oldStateList.map((v) => v);
          aux.push(sabor);
        } else {
          aux = [];
          aux = oldStateList.filter((v) => v != sabor);
        }

        return aux;
      });

      adicionaSabor(id, sabor);
    }
  };

  useEffect(() => {
    if (id !== undefined) {
      const optionalSalg = buscaItem(id);

      if (optionalSalg != undefined) {
        setSaboresEscolhidos(optionalSalg.sabores);
      }
    }
  }, [salgados]);

  console.log("-------escolhidos-------");
  console.log(saboresEscolhidos);

  if (id !== undefined) {
    if (buscaItem(id) !== undefined)
      return (
        <div className={s.container}>
          <ItemSelecionadoTop capa={buscaItem(id)?.imagemRetangular} />
          <ItemSelecionadoDetalhes
            titulo={buscaItem(id)?.nome}
            descricao={buscaItem(id)?.descricao}
            preco={buscaItem(id)?.preco}
          />
          <MonteSeuPedido />
          <SaboresParaEscolher
            lista={listaDeSabores}
            saboresEscolhidos={saboresEscolhidos}
            onClick={handleEscolheSabor}
          />
        </div>
      );
    else return <p>Item não encontrado</p>;
  } else return <p>Item não encontrado</p>;
}
