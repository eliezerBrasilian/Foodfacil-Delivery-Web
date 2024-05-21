import { cores } from "../assets/cores";

interface BtnProps {
  text: string;
  width?: string;
  onClick?: () => void;
}
export function CustomBtn({
  text,
  width = "fit-content",
  onClick = () => {},
}: BtnProps) {
  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: cores.btn_vermelho,
        border: "none",
        borderRadius: 10,
        padding: 15,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: width,
        color: "#fff",
      }}
    >
      <p style={{ fontSize: 14 }}>{text}</p>
    </button>
  );
}
