import { cores } from "../assets/cores";
import { Imagem } from "./Imagem";

export interface PixViewProps {
  selecionado?: boolean;
  onClick?: () => void;
}

export function PixView({
  selecionado = true,
  onClick = () => {},
}: PixViewProps) {
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
