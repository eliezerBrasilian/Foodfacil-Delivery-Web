import { createContext, useContext } from "react";
import { OnlineContextInterface } from "../types/OnlineContextInterface";
import { OnlineStatus } from "../types/OnlineStatus";

const defaultOnlineContext: OnlineContextInterface = {
  getOnlineStatus: async () => {},
  status: OnlineStatus.OFFLINE,
};

export const OnlineContext = createContext(defaultOnlineContext);

export function useOnlineContext() {
  return useContext(OnlineContext);
}
