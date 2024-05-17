import { cores } from "../assets/cores";
import salgadoStyles from "../modules/HomeSalgado.module.css";
import { SalgadoDto } from "../types/SalgadoDto";
import { AppUtils } from "../utils/AppUtils";

interface SalgadoProps {
  salgadoDto: SalgadoDto;
  handlePopUpEdicaoVisibilidade: () => void;
  ehCelular: boolean;
}

export function HomeSalgado({
  salgadoDto,
  handlePopUpEdicaoVisibilidade,
}: SalgadoProps) {
  return (
    <div
      className={salgadoStyles.container}
      onClick={handlePopUpEdicaoVisibilidade}
    >
      <div className={salgadoStyles.esquerda}>
        <h2>{salgadoDto?.nome}</h2>
        <p style={{ color: "#555353" }}>{salgadoDto?.descricao}</p>
        <p className={salgadoStyles.preco} style={{ color: cores.preco }}>
          {AppUtils.toMoedaBrasileira(salgadoDto?.preco)}
        </p>
      </div>

      <img src={salgadoDto?.imagem} />
    </div>
  );
}
