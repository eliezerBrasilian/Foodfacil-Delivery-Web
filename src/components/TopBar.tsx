import { useNavigate } from "react-router-dom";
import { Imagem } from "./Imagem";

interface TopBarProps {
  text: string;
}

export function TopBar({ text }: TopBarProps) {
  const iconSize = 30;
  const nav = useNavigate();
  return (
    <div
      onClick={() => nav(-1)}
      style={{
        display: "flex",
        columnGap: 40,
        alignItems: "center",
        width: "fit-content",
      }}
    >
      <Imagem imagePath="/seta_voltar.png" height={iconSize} width={iconSize} />
      <p>{text}</p>
    </div>
  );
}
