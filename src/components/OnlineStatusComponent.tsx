import { useEffect } from "react";
import { cores } from "../assets/cores";
import { useOnlineContext } from "../defaultContexts/OnlineContext";
import { OnlineStatus } from "../types/OnlineStatus";

export function OnlineStatusComponent() {
  const { status, getOnlineStatus } = useOnlineContext();

  useEffect(() => {
    const intervalId = setInterval(getOnlineStatus, 3000);

    return () => clearInterval(intervalId);
  }, [status]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        columnGap: 5,
      }}
    >
      <p style={{ fontWeight: "600", marginBottom: 5 }}>
        {status == OnlineStatus.ONLINE
          ? "Estamos funcionando!"
          : "Estamos fechados agora!"}
      </p>
      <div
        style={{
          height: 12,
          width: 12,
          borderRadius: "50%",
          backgroundColor:
            status == OnlineStatus.ONLINE ? "green" : cores.btn_vermelho,
        }}
      />
    </div>
  );
}
