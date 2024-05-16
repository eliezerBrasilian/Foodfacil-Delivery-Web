import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AlgumaObservacaoRow } from "../components/AlgumaObservacaoRow";
import { ButaoAdicionarComPreco } from "../components/ButaoAdicionarComPreco";
import { ItemSelecionadoDetalhes } from "../components/ItemSelecionadoDetalhes";
import { MonteSeuPedido } from "../components/MonteSeuPedido";
import { ObservacaoTextInput } from "../components/ObservacaoTextInput";
import { SaboresParaEscolher } from "../components/SaboresParaEscolher";
import { useSaborContext } from "../context/SaborContext";
import { useCarrinhoContext } from "../defaultContexts/CarrinhoContextDefault";
import { useSalgadosContext } from "../defaultContexts/SalgadoContextDefault";
import s from "../modules/ItemSelecionado.module.css";
import { ItemSelecionadoTop } from "./ItemSelecionadoTop";

export function ItemSelecionado() {
  const { id } = useParams();

  const { buscaItem, adicionaSabores } = useSalgadosContext();
  const { lista: listaDeSabores } = useSaborContext();
  const { addSalgado } = useCarrinhoContext();

  const [saboresEscolhidos, setSaboresEscolhidos] = useState<string[]>([]);

  const [observacaoText, setObservacaoText] = useState("");

  const onChangeText = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (event.target.value.length < 141) {
      setObservacaoText(event.target.value);
    }
  };

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
    }
  };

  const onClickAdd = () => {
    if (id !== undefined) {
      //adicionar sabores no salgado e observacao
      const optionalSalgadoAtualizado = adicionaSabores(
        id,
        saboresEscolhidos,
        observacaoText
      );
      //adicionar esse salgado no carrinho
      if (optionalSalgadoAtualizado != null)
        addSalgado(optionalSalgadoAtualizado);
    }
  };

  useEffect(() => {
    if (id !== undefined) {
      const optionalSalg = buscaItem(id);

      if (optionalSalg != undefined) {
        setSaboresEscolhidos(optionalSalg.sabores);
      }
    }
  }, []);

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
          <AlgumaObservacaoRow
            contadorDeCaracteresDigitados={observacaoText.length}
          />
          <ObservacaoTextInput onChangeText={onChangeText} />
          <ButaoAdicionarComPreco
            preco={buscaItem(id)?.preco}
            onClick={onClickAdd}
          />
        </div>
      );
    else return <p>Item não encontrado</p>;
  } else return <p>Item não encontrado</p>;
}
