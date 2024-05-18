import { cores } from "../assets/cores";
import { Imagem } from "./Imagem";

export function MetodoDePagamentoEmFinalizarPedido() {
  const pixTam = 20;
  const checkTam = 20;
  return (
    <div style={{ marginTop: 25 }}>
      {/* cima */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h4>Método de pagamento</h4>
        <p style={{ fontSize: 13, color: cores.btn_vermelho }}>Trocar</p>
      </div>
      {/* baixo */}
      <div
        style={{
          marginTop: 20,
          border: "1px solid red",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingLeft: 15,
          paddingRight: 15,
          paddingTop: 10,
          paddingBottom: 10,
          borderRadius: 10,
        }}
      >
        {/* esquerda */}
        <div style={{ display: "flex", alignItems: "center", columnGap: 12 }}>
          <Imagem
            height={pixTam}
            width={pixTam}
            imagePath="/pix_comfundo.png"
          />
          <p>Pix</p>
        </div>
        <Imagem
          height={checkTam}
          width={checkTam}
          imagePath="/check_amarelo.png"
        />
      </div>
    </div>
  );
}
