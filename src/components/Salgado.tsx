import salgadoStyles from "../modules/Salgado.module.css";
import { SalgadoDto } from "../types/SalgadoDto";
import { AppUtils } from "../utils/AppUtils";

interface SalgadoProps {
  salgadoDto: SalgadoDto;
  onClick: () => void;
  ehCelular: boolean;
}

export function Salgado({ salgadoDto, onClick, ehCelular }: SalgadoProps) {
  if (ehCelular)
    return (
      <div
        onClick={onClick}
        style={{
          display: "flex",
          alignItems: "center",
          columnGap: 10,
          marginBottom: 10,
        }}
      >
        <img
          src={salgadoDto?.imagemQuadrada}
          style={{ height: 90, width: 90, borderRadius: 10 }}
        />
        <div className={salgadoStyles.direita}>
          <h2>{salgadoDto?.nome}</h2>
          <p style={{ color: "#555353" }}>{salgadoDto?.descricao}</p>
          <p>{AppUtils.toMoedaBrasileira(salgadoDto?.preco)}</p>
        </div>
      </div>
    );
  else
    return (
      <div
        className={salgadoStyles.container}
        onClick={onClick}
        style={ehCelular ? { flexDirection: "column" } : {}}
      >
        <img src={salgadoDto?.imagemQuadrada} />
        <div className={salgadoStyles.direita}>
          <h2>{salgadoDto?.nome}</h2>
          <p>{salgadoDto?.descricao}</p>
          <p>{salgadoDto?.categoria}</p>
          <p>{AppUtils.toMoedaBrasileira(salgadoDto?.preco)}</p>
          <p>{salgadoDto?.emOferta ? "Em oferta" : "Não está em oferta"}</p>
        </div>
      </div>
    );
}
