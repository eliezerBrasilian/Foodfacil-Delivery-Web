import salgadoStyles from "../modules/Salgado.module.css";
import { SalgadoResponseDto } from "../types/SalgadoResponseDto";
import { AppUtils } from "../utils/AppUtils";

interface SalgadoProps {
  salgadoResponseDto: SalgadoResponseDto;
  handlePopUpEdicaoVisibilidade: () => void;
  ehCelular: boolean;
}

export function Salgado({
  salgadoResponseDto,
  handlePopUpEdicaoVisibilidade,
  ehCelular,
}: SalgadoProps) {
  if (ehCelular)
    return (
      <div
        onClick={handlePopUpEdicaoVisibilidade}
        style={{
          display: "flex",
          alignItems: "center",
          columnGap: 10,
          marginBottom: 10,
        }}
      >
        <img
          src={salgadoResponseDto?.imagemQuadrada}
          style={{ height: 90, width: 90, borderRadius: 10 }}
        />
        <div className={salgadoStyles.direita}>
          <h2>{salgadoResponseDto?.nome}</h2>
          <p style={{ color: "#555353" }}>{salgadoResponseDto?.descricao}</p>
          <p>{AppUtils.toMoedaBrasileira(salgadoResponseDto?.preco)}</p>
        </div>
      </div>
    );
  else
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
