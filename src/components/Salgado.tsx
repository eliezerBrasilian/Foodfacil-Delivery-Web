import salgadoStyles from "../modules/Salgado.module.css";
import { SalgadoResponseDto } from "../types/SalgadoResponseDto";
import { AppUtils } from "../utils/AppUtils";

interface SalgadoProps {
  salgadoResponseDto: SalgadoResponseDto;
  handlePopUpEdicaoVisibilidade: () => void;
  ehCelular: boolean;
}

function Salgado({
  salgadoResponseDto,
  handlePopUpEdicaoVisibilidade,
  ehCelular,
}: SalgadoProps) {
  return (
    <div
      className={salgadoStyles.container}
      onClick={handlePopUpEdicaoVisibilidade}
      style={ehCelular ? { flexDirection: "column" } : {}}
    >
      <img src={salgadoResponseDto?.imagemQuadrada} />
      <div className={salgadoStyles.direita}>
        <h2>{salgadoResponseDto?.nome}</h2>
        <p>{salgadoResponseDto?.descricao}</p>
        <p>{salgadoResponseDto?.categoria}</p>
        <p>{AppUtils.toMoedaBrasileira(salgadoResponseDto?.preco)}</p>
        <p>
          {salgadoResponseDto?.emOferta ? "Em oferta" : "Não está em oferta"}
        </p>
      </div>
    </div>
  );
}

export { Salgado };
