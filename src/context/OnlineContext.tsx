import { ReactNode, useState } from "react";
import { OnlineContext } from "../defaultContexts/OnlineContext";
import { OnlineRepository } from "../repositories/OnlineRepository";
import { OnlineStatus } from "../types/OnlineStatus";

interface OnlineContextProps {
  children: ReactNode;
}

export function OnlineContextProvider({ children }: OnlineContextProps) {
  var onlineRepository = new OnlineRepository();
  const [status, setStatus] = useState(OnlineStatus.OFFLINE);

  async function getOnlineStatus() {
    const resp = await onlineRepository.consultaOnline();
    setStatus(resp);
  }

  return (
    <OnlineContext.Provider
      value={{
        status,
        getOnlineStatus,
      }}
    >
      {children}
    </OnlineContext.Provider>
  );
}
