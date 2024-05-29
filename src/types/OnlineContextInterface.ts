import { OnlineStatus } from "./OnlineStatus";

export interface OnlineContextInterface {
  status: OnlineStatus;
  getOnlineStatus(): Promise<void>;
}
