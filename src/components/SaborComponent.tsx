import { CustomCheckBox } from "./CustomCheckBox";
import { Linha } from "./Linha";

interface SaborComponentProps {
  nome: string;
  isChecked: boolean;
  onClick: (nome: string) => void;
}

export function SaborComponent({
  nome,
  onClick,
  isChecked,
}: SaborComponentProps) {
  return (
    <div style={{ paddingBottom: 10 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <p>{nome}</p>
        <CustomCheckBox checked={isChecked} onClick={() => onClick(nome)} />
      </div>

      <Linha borderBottomColor="#f1f1f1" />
    </div>
  );
}
