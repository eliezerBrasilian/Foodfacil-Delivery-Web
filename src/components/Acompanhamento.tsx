import salgadoStyles from "../modules/Salgado.module.css";
import { AcompanhamentoResponseDto } from "../types/AcompanhamentoResponseDto";
import { AppUtils } from "../utils/AppUtils";

interface AcompanhamentoProps {
  acompanhamentoResponseDto: AcompanhamentoResponseDto;
  handlePopUpEdicaoVisibilidade: () => void;
  ehCelular: boolean;
}

function Acompanhamento({
  acompanhamentoResponseDto,
  handlePopUpEdicaoVisibilidade,
  ehCelular,
}: AcompanhamentoProps) {
  console.log(acompanhamentoResponseDto);
  return (
    <div
      className={salgadoStyles.container}
      onClick={handlePopUpEdicaoVisibilidade}
      style={ehCelular ? { flexDirection: "column" } : {}}
    >
      <img src={acompanhamentoResponseDto.imagem || ""} />

      <div className={salgadoStyles.direita}>
        <h2>{acompanhamentoResponseDto?.nome}</h2>
        <p>{acompanhamentoResponseDto?.descricao}</p>
        <p>{AppUtils.toMoedaBrasileira(acompanhamentoResponseDto?.preco)}</p>
      </div>
    </div>
  );
}

export { Acompanhamento };
