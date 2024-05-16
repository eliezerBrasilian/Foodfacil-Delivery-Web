import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { cores } from "../assets/cores";
import { Imagem } from "../components/Imagem";
import { useSaborContext } from "../context/SaborContext";
import { useSalgadosContext } from "../context/SalgadosContext";
import s from "../modules/ItemSelecionado.module.css";
import { AppUtils } from "../utils/AppUtils";
import { ItemSelecionadoDetalhes } from "./ItemSelecionadoDetalhes";
import { ItemSelecionadoTop } from "./ItemSelecionadoTop";
import { MonteSeuPedido } from "./MonteSeuPedido";
import { SaboresParaEscolher } from "./SaboresParaEscolher";

export function ItemSelecionado() {
  const { id } = useParams();

  const { buscaItem, adicionaSabor, salgados } = useSalgadosContext();
  const { lista: listaDeSabores } = useSaborContext();

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

  // console.log("-------escolhidos-------");
  // console.log(saboresEscolhidos);

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
          <ButaoAdicionarComPreco preco={buscaItem(id)?.preco} />
        </div>
      );
    else return <p>Item não encontrado</p>;
  } else return <p>Item não encontrado</p>;
}

export type Preco = number | string | undefined;

interface ButaoAdicionarComPrecoProps {
  preco: Preco;
}

export function ButaoAdicionarComPreco({ preco }: ButaoAdicionarComPrecoProps) {
  return (
    <div
      style={{
        backgroundColor: cores.btn_vermelho,
        borderRadius: 10,
        padding: 15,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        columnGap: 20,
        width: "fit-content",
        position: "absolute",
        bottom: 20,
        right: 20,
        color: "#fff",
      }}
    >
      <p>Adicionar</p>
      <p>{AppUtils.toMoedaBrasileira(preco as number)}</p>
    </div>
  );
}

interface ObservacaoTextInputProps {
  onChangeText: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export function ObservacaoTextInput({
  onChangeText,
}: ObservacaoTextInputProps) {
  return (
    <div style={{ width: "100%", padding: 15 }}>
      <textarea
        onChange={onChangeText}
        style={{
          border: "1px solid #ccc",
          borderRadius: "4px",
          height: "140px",
          padding: "8px",
          resize: "none", // Impede o redimensionamento do textarea pelo usuário
          width: "100%", // Ocupa toda a largura disponível,
        }}
        placeholder="Digite sua observação..."
        maxLength={141}
      />
    </div>
  );
}

interface AlgumaObservacaoRowProps {
  contadorDeCaracteresDigitados?: number;
}
export function AlgumaObservacaoRow({
  contadorDeCaracteresDigitados = 0,
}: AlgumaObservacaoRowProps) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        paddingLeft: 15,
        paddingRight: 15,
      }}
    >
      <ObservacaoRowEsquerda />
      <p style={{ color: "#4C4C4C", fontWeight: "600" }}>
        {contadorDeCaracteresDigitados}/140
      </p>
    </div>
  );
}

function ObservacaoRowEsquerda() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        columnGap: 10,
      }}
    >
      <Imagem imagePath="/message.png" height={26} width={26} />
      <p style={{ color: "#4C4C4C", fontWeight: "600" }}>Alguma observação?</p>
    </div>
  );
}
