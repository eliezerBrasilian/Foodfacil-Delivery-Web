import { cores } from "../assets/cores";
import { Imagem } from "./Imagem";

interface BtnProps {
  text: string;
  width?: string;
  backgroundColor?: string;
  icon?: string;
  onClick?: () => void;
}
export function CustomBtn({
  text,
  width = "fit-content",
  backgroundColor = cores.btn_vermelho,
  icon,
  onClick = () => {},
}: BtnProps) {
  if (icon != undefined) {
    return (
      <button
        onClick={onClick}
        style={{
          backgroundColor: backgroundColor,
          border: "none",
          borderRadius: 10,
          padding: 15,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          columnGap: 5,
          width: width,
          color: "#fff",
        }}
      >
        <Imagem imagePath={icon} height={20} width={20} />
        <p style={{ fontSize: 14 }}>{text}</p>
      </button>
    );
  } else
    return (
      <button
        onClick={onClick}
        style={{
          backgroundColor: backgroundColor,
          border: "none",
          borderRadius: 10,
          padding: 15,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: width,
          color: "#fff",
        }}
      >
        <p style={{ fontSize: 14 }}>{text}</p>
      </button>
    );
}
