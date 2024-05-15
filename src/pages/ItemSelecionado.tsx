import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { cores } from "../assets/cores";
import { Imagem } from "../components/Imagem";
import { Linha } from "../components/Linha";
import { useSaborContext } from "../context/SaborContext";
import { useSalgadosContext } from "../context/SalgadosContext";
import s from "../modules/ItemSelecionado.module.css";
import { SaborResponseDto } from "../types/SaborResponseDto";
import { AppUtils } from "../utils/AppUtils";

export function ItemSelecionado() {
  const { id } = useParams();

  const { buscaItem } = useSalgadosContext();
  const { lista } = useSaborContext();

  const [saboresEscolhidos, setSaboresEscolhidos] = useState<
    Array<SaborResponseDto>
  >([]);

  const handleEscolheSabor = (sabor: SaborResponseDto) => {
    var existe = saboresEscolhidos.find((sab) => sab.id == sabor.id);

    if (!existe) {
      setSaboresEscolhidos((oldList) => {
        var aux = oldList.map((v) => v);
        aux.push(sabor);
        return aux;
      });
    } else {
      setSaboresEscolhidos((oldList) => {
        var aux: Array<SaborResponseDto> = [];

        oldList.forEach((sab) => {
          if (sab.id != sabor.id) aux.push(sab);
        });

        return aux;
      });
    }
  };

  console.log("------sabores escolhidos-------");
  console.log(saboresEscolhidos);

  useEffect(() => {
    if (id !== undefined) buscaItem(id);
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
            lista={lista}
            saboresEscolhidos={saboresEscolhidos}
            handleEscolheSabor={handleEscolheSabor}
          />
        </div>
      );
    else return <p>Item não encontrado</p>;
  } else return <p>Item não encontrado</p>;
}

interface SaboresParaEscolherProps {
  lista: SaborResponseDto[];
  saboresEscolhidos: SaborResponseDto[];
  handleEscolheSabor: (sabor: SaborResponseDto) => void;
}
export function SaboresParaEscolher({
  lista,
  handleEscolheSabor,
  saboresEscolhidos,
}: SaboresParaEscolherProps) {
  return (
    <div style={{ padding: 15 }}>
      {lista.map((sab) => (
        <SaborComponent
          sabor={sab}
          key={sab.id}
          handleEscolheSabor={handleEscolheSabor}
          isChecked={saboresEscolhidos.includes(sab)}
        />
      ))}
    </div>
  );
}

interface SaborComponentProps {
  sabor: SaborResponseDto;
  isChecked: boolean;
  handleEscolheSabor: (sabor: SaborResponseDto) => void;
}

export function SaborComponent({
  sabor,
  handleEscolheSabor,
  isChecked,
}: SaborComponentProps) {
  return (
    <div style={{ paddingBottom: 10 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <p>{sabor.nome}</p>
        <CustomCheckBox
          checked={isChecked}
          onClick={() => handleEscolheSabor(sabor)}
        />
      </div>

      <Linha borderBottomColor="#f1f1f1" />
    </div>
  );
}

interface CustomCheckBoxProps {
  checked: boolean;
  onClick: () => void;
}
export function CustomCheckBox({
  checked = false,
  onClick,
}: CustomCheckBoxProps) {
  return (
    <div
      onClick={onClick}
      style={{
        height: 30,
        width: 30,
        borderRadius: 6,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: checked ? cores.font_ativa : "black",
        backgroundColor: checked ? cores.font_ativa : "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {checked && <Imagem imagePath="/check.png" height={14} width={14} />}
    </div>
  );
}

interface ItemSelecionadoTopProps {
  capa?: string;
}

interface ItemSelecionadoDetalhesProps {
  titulo?: string;
  descricao?: string;
  preco?: number;
}

export function MonteSeuPedido() {
  return (
    <div
      style={{
        backgroundColor: "#f1f1f1",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        rowGap: 10,
        padding: 15,
      }}
    >
      <p style={{ color: "#4C4C4C", fontWeight: "700" }}>Monte seu pedido:</p>
      <p style={{ color: "#555353" }}>Escolha no mínimo 3 opções</p>
    </div>
  );
}

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
