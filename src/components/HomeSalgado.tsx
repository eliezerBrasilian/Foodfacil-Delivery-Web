import { cores } from "../assets/cores";
import salgadoStyles from "../modules/HomeSalgado.module.css";
import { SalgadoResponseDto } from "../types/SalgadoResponseDto";
import { AppUtils } from "../utils/AppUtils";

interface SalgadoProps {
  salgadoResponseDto: SalgadoResponseDto;
  handlePopUpEdicaoVisibilidade: () => void;
  ehCelular: boolean;
}

export function HomeSalgado({
  salgadoResponseDto,
  handlePopUpEdicaoVisibilidade,
}: SalgadoProps) {
  return (
    <div
      className={salgadoStyles.container}
      onClick={handlePopUpEdicaoVisibilidade}
    >
      <div className={salgadoStyles.esquerda}>
        <h2>{salgadoResponseDto?.nome}</h2>
        <p style={{ color: "#555353" }}>{salgadoResponseDto?.descricao}</p>
        <p className={salgadoStyles.preco} style={{ color: cores.preco }}>
          {AppUtils.toMoedaBrasileira(salgadoResponseDto?.preco)}
        </p>
      </div>

      <img src={salgadoResponseDto?.imagem} />
    </div>
  );
}
