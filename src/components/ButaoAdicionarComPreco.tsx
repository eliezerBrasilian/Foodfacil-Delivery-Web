import { cores } from "../assets/cores";
import { AppUtils } from "../utils/AppUtils";

export type Preco = number | string | undefined;

interface ButaoAdicionarComPrecoProps {
  preco: Preco;
  onClick: () => void;
}

export function ButaoAdicionarComPreco({
  preco,
  onClick,
}: ButaoAdicionarComPrecoProps) {
  return (
    <div
      onClick={onClick}
      style={{
        backgroundColor: cores.btn_vermelho,
        borderRadius: 10,
        padding: 15,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        columnGap: 20,
        width: "fit-content",
        position: "fixed",
        bottom: 20,
        right: 20,
        color: "#fff",
      }}
    >
      <p>Adicionar</p>
      <p>{AppUtils.toMoedaBrasileira(preco as number)}</p>
    </div>
  );
}
