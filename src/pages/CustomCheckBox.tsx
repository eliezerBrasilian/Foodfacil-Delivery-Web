import { cores } from "../assets/cores";
import { Imagem } from "../components/Imagem";

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
        height: 30,
        width: 30,
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
