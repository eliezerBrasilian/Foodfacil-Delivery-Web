import { Linha } from "./Linha";

interface CustomNavProps {
  titulo: string;

  isActive: boolean;
}

function CustomNav({ titulo, isActive }: CustomNavProps) {
  return (
    <div style={{ flexDirection: "column" }}>
      <p
        style={{
          color: isActive ? "#ff0080" : "white",
          fontWeight: isActive ? "bolder" : "normal",
        }}
      >
        {titulo}
      </p>

      {isActive && <Linha />}
    </div>
  );
}

export { CustomNav };
