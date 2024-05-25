import { cores } from "../assets/cores";
import { Imagem } from "./Imagem";

interface CustomCheckBoxProps {
  checked: boolean;
  onClick: () => void;
}
export function CustomCheckBox({
  checked = false,
  onClick,
}: CustomCheckBoxProps) {
  return (
    <div
      onClick={onClick}
      style={{
        height: 24,
        width: 24,
        borderRadius: 6,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: checked ? cores.font_ativa : "black",
        backgroundColor: checked ? cores.font_ativa : "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {checked && <Imagem imagePath="/check.png" height={14} width={14} />}
    </div>
  );
}
