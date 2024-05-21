import { useNavigate } from "react-router-dom";
import { Rotas } from "../enums/Rotas";

export function TelaPerfil() {
  const nav = useNavigate();
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        minWidth: "100vw",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <button
        onClick={() => {
          localStorage.clear();
          nav(Rotas.LOGIN);
        }}
      >
        <p>Sair</p>
      </button>
    </div>
  );
}
