import { cores } from "../assets/cores";
import { Imagem } from "./Imagem";

interface EnderecoCadastradoProps {
  rua: string;
  bairro: string;
  cidade: string;
  numero: string;
  complemento: string;
  onClickAtivaModal: () => void;
}
export function EnderecoCadastrado({
  rua,
  bairro,
  cidade,
  numero,
  complemento,
  onClickAtivaModal,
}: EnderecoCadastradoProps) {
  const localizacaoTam = 20;
  return (
    <div style={{ marginTop: 25 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h4>Entregar no endereço</h4>
        <p
          onClick={onClickAtivaModal}
          style={{ fontSize: 13, color: cores.btn_vermelho }}
        >
          Trocar
        </p>
      </div>

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
        <div style={{ display: "flex", columnGap: 10, alignItems: "center" }}>
          <Imagem
            imagePath="/localizacao_amarela.png"
            height={localizacaoTam}
            width={localizacaoTam}
          />
          <div>
            <h4>
              Rua {rua}, {numero}
            </h4>
            <p>
              {bairro}, {cidade} - MG
            </p>
            <p>{complemento}</p>
          </div>
        </div>

        <Imagem
          imagePath="/check_amarelo.png"
          height={localizacaoTam}
          width={localizacaoTam}
        />
      </div>
    </div>
  );
}
