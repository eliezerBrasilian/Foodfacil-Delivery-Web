import { useState } from "react";
import { TopBar } from "../components/TopBar";
import { LocalStorageKeys } from "../enums/LocalStorageKeys";
import { AppUtils } from "../utils/AppUtils";

export function TelaDadosDaConta() {
  const [nome] = useState(localStorage.getItem(LocalStorageKeys.NOME));
  const [foto] = useState(localStorage.getItem(LocalStorageKeys.FOTO));
  const [email] = useState(localStorage.getItem(LocalStorageKeys.EMAIL));
  const [createdAt] = useState(
    localStorage.getItem(LocalStorageKeys.CREATED_AT)
  );
  return (
    <div style={{ padding: 15, height: "100vh", width: "100vw" }}>
      <TopBar text="Detalhes da minha conta" />
      <div style={{ marginTop: 30 }}>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginBottom: 15,
          }}
        >
          <img
            src={foto == undefined ? "" : foto}
            style={{ borderRadius: "50%" }}
          />
        </div>

        <h3 style={{ marginTop: 10 }}>Nome</h3>
        <p>{nome}</p>
        <h3 style={{ marginTop: 10 }}>Email</h3>
        <p>{email}</p>
        <h3 style={{ marginTop: 10 }}>Conta criada em</h3>

        {createdAt != null && (
          <p>
            {AppUtils.milisegundosParaDiaAbreviadoDeMesDeAnoHoraMinutoSegundo(
              Number(createdAt)
            )}
          </p>
        )}
      </div>
    </div>
  );
}
