import { ChangeEvent } from "react";
import nstyles from "../modules/Notificacao.module.css";
import { ImagemType } from "../types/ImagemType";
import { Imagem } from "./Imagem";

interface NotificacaoProps {
  titulo: string;
  tituloText: string;
  corpo: string;
  imagem: ImagemType;
  onClick: () => void;
  onChangeTituloText: (text: string) => void;
  onChangeCorpo: (text: string) => void;
  onChangeImagem: (event: ChangeEvent<HTMLInputElement>) => void;
}

export function NotificacaoItem({
  titulo,
  tituloText,
  corpo,
  imagem,
  onClick,
  onChangeTituloText,
  onChangeCorpo,
  onChangeImagem,
}: NotificacaoProps) {
  return (
    <div className={nstyles.container}>
      <h4>{titulo}</h4>
      <hr />
      <li>tituloText</li>

      <input
        className={nstyles.input_escrita}
        type="text"
        value={tituloText}
        onChange={(e) => onChangeTituloText(e.target.value)}
      />
      <li>corpo</li>
      <input
        className={nstyles.input_escrita}
        type="text"
        value={corpo}
        onChange={(e) => onChangeCorpo(e.target.value)}
      />

      <li>imagem</li>
      <input type="file" accept="image/*" onChange={onChangeImagem} />
      {imagem != null && (
        <Imagem
          width={100}
          height={70}
          imagePath={URL.createObjectURL(imagem as File)}
        />
      )}

      <div style={{ display: "flex", columnGap: 15 }}>
        <button className={nstyles.btn_salvar} onClick={onClick}>
          Enviar
        </button>
      </div>
    </div>
  );
}
