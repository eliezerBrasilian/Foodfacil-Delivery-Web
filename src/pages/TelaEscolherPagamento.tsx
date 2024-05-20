import { useState } from "react";
import { cores } from "../assets/cores";
import { Imagem } from "../components/Imagem";
import { TopBar } from "../components/TopBar";
import s from "../modules/TelaEscolherPagamento.module.css";

export function TelaEscolherPagamento() {
  //const [dinheiroDefininido, setDinheiro] = useState(0);

  const [pixSelecionado, setSelecionaPix] = useState(true);
  const [dinSelecionado, setSelecionaDin] = useState(false);

  const handleClickPixView = () => {
    setSelecionaPix(true);
    setSelecionaDin(false);
  };
  const handleClickDinView = () => {
    setSelecionaPix(false);
    setSelecionaDin(true);
  };
  return (
    <div className={s.container}>
      <TopBar text="Pagamento" />
      <div style={{ marginTop: 20 }} />

      <h3>Formas de pagamento</h3>
      <div style={{ marginTop: 20 }} />
      <PixView selecionado={pixSelecionado} onClick={handleClickPixView} />
      <div style={{ marginTop: 13 }} />
      <DinheiroView selecionado={dinSelecionado} onClick={handleClickDinView} />
    </div>
  );
}

interface PixViewProps {
  selecionado: boolean;
  onClick: () => void;
}

export function PixView({ selecionado, onClick }: PixViewProps) {
  return (
    <div
      onClick={onClick}
      style={{
        display: "flex",
        columnGap: 20,
        alignItems: "center",
        width: "100%",
        border: "1px solid gray",
        padding: "12px 15px 12px 15px",
        borderRadius: 10,
        borderColor: selecionado ? cores.btn_vermelho : "gray",
      }}
    >
      <Imagem imagePath="/pix_comfundo.png" height={20} width={20} />
      <p>Pix</p>
    </div>
  );
}
export function DinheiroView({ selecionado, onClick }: PixViewProps) {
  return (
    <div
      onClick={onClick}
      style={{
        display: "flex",
        columnGap: 20,
        alignItems: "center",
        width: "100%",
        border: "1px solid gray",
        padding: "7px 15px 7px 15px",
        borderRadius: 10,
        borderColor: selecionado ? cores.btn_vermelho : "gray",
      }}
    >
      <Imagem imagePath="/cedula_dinheiro.png" height={20} width={20} />
      <div>
        <p>Dinheiro</p>
        <p style={{ color: "gray" }}>Entregue ao entregador</p>
      </div>
    </div>
  );
}
