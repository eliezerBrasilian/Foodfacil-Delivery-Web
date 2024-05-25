import { ToastContainer } from "react-toastify";
import { cores } from "../assets/cores";
import { AppUtils } from "../utils/AppUtils";
import { Imagem } from "./Imagem";

interface ChavePixViewProps {
  chave: string | undefined;
  marginTop?: number;
}
export function ChavePixView({ chave, marginTop = 30 }: ChavePixViewProps) {
  let strCortada = chave?.toString().substring(0, 20) + "...";

  const handleClickCopiaChavePix = () => {
    AppUtils.copiaChavePixParaTeclado(chave as string);
  };

  return (
    <div
      onClick={handleClickCopiaChavePix}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "90%",
        backgroundColor: "#fff",
        border: `1px solid ${cores.btn_vermelho}`,
        borderRadius: 12,
        padding: "8px 15px 8px 15px",
        marginTop: marginTop,
      }}
    >
      <p>{strCortada}</p>
      <button style={{ backgroundColor: "transparent", border: "none" }}>
        <Imagem width={30} height={30} imagePath="/copia_cola_amarelo.png" />
      </button>
      <ToastContainer />
    </div>
  );
}
