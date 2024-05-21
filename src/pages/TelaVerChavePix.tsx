import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { cores } from "../assets/cores";
import { CustomBtn } from "../components/CustomBtn";
import { Imagem } from "../components/Imagem";
import { TopBar } from "../components/TopBar";
import s from "../modules/TelaVerChavePix.module.css";
export function TelaVerChavePix() {
  const { chave } = useParams();
  const tam = 190;

  let strCortada = chave?.toString().substring(0, 20) + "...";

  const handleClickCopiaChavePix = () => {
    navigator.clipboard
      .writeText(chave as string)
      .then(() => {
        toast("chave pix copiada");
      })
      .catch((_err) => {
        alert("Erro ao copiar chave pix");
      });
  };
  return (
    <div className={s.container}>
      <TopBar text="Confirme seu Pagamento" />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          alignItems: "center",
          marginTop: 70,
        }}
      >
        <Imagem
          width={tam}
          height={tam}
          imagePath="/mao_confirma_pagamento.png"
        />
        <div style={{ marginTop: 20 }} />
        <h3>Pedido aguardando pagamento</h3>
        <div style={{ marginTop: 20 }} />
        <p>
          Copie o código abaixo e utilize o pix copia e cola no aplicativo que
          você vai fazer o pagamento:
        </p>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "90%",
            backgroundColor: "#fff",
            border: `1px solid ${cores.btn_vermelho}`,
            borderRadius: 12,
            padding: "8px 15px 8px 15px",
            marginTop: 30,
          }}
        >
          <p>{strCortada}</p>
          <button
            onClick={handleClickCopiaChavePix}
            style={{ backgroundColor: "transparent", border: "none" }}
          >
            <Imagem
              width={30}
              height={30}
              imagePath="/copia_cola_amarelo.png"
            />
          </button>
        </div>
      </div>

      <div style={{ marginTop: 70, display: "flex", justifyContent: "center" }}>
        <CustomBtn
          text="Copiar chave pix"
          width="90%"
          onClick={handleClickCopiaChavePix}
        />
      </div>
      <ToastContainer />
    </div>
  );
}
