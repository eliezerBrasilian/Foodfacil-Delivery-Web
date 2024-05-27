import { cores } from "../assets/cores";
import { OnlineStatus } from "../types/OnlineStatus";

interface OnlineStatusComponentProps {
  status: OnlineStatus;
}
export function OnlineStatusComponent({ status }: OnlineStatusComponentProps) {
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
