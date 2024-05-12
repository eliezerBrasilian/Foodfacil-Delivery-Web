import { cores } from "../assets/cores";
import { Imagem } from "./Imagem";
import { Linha } from "./Linha";

interface CustomNavProps {
  titulo: string;
  isActive: boolean;
  icone_padrao: string;
  icone_selecionado: string;
}

export function BottomBarItem({
  titulo,
  isActive,
  icone_padrao,
  icone_selecionado,
}: CustomNavProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Imagem
        height={25}
        width={30}
        imagePath={isActive ? icone_selecionado : icone_padrao}
      />
      <p
        style={{
          color: isActive ? cores.font_ativa : "black",
          fontWeight: "bolder",
        }}
      >
        {titulo}
      </p>

      {isActive && <Linha />}
    </div>
  );
}
