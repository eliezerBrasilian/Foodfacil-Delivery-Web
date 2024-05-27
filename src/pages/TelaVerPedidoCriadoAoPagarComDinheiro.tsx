import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { CustomBtn } from "../components/CustomBtn";
import { Imagem } from "../components/Imagem";
import { TopBar } from "../components/TopBar";
import { Rotas } from "../enums/Rotas";
import s from "../modules/TelaVerChavePix.module.css";
export function TelaVerPedidoCriadoAoPagarComDinheiro() {
  const nav = useNavigate();
  const tam = 190;

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
          Seu pedido foi criado com sucesso, você pode realizar o pagamento
          diretamente com o entregador
        </p>
      </div>

      <div style={{ marginTop: 70, display: "flex", justifyContent: "center" }}>
        <CustomBtn
          text="Acompanhar pedido"
          width="90%"
          onClick={() => {
            nav(Rotas.TELA_PEDIDOS);
          }}
        />
      </div>
    </div>
  );
}
