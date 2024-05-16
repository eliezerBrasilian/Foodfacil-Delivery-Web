import { useNavigate } from "react-router-dom";
import { Imagem } from "./Imagem";

interface TopBarProps {
  text: string;
}

export function TopBar({ text }: TopBarProps) {
  const iconSize = 30;
  const nav = useNavigate();
  return (
    <div style={{ display: "flex", columnGap: 40, alignItems: "center" }}>
      <Imagem
        imagePath="/seta_voltar.png"
        height={iconSize}
        width={iconSize}
        onClick={() => nav(-1)}
      />
      <p>{text}</p>
    </div>
  );
}
