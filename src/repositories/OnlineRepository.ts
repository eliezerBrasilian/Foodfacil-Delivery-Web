import { api } from "../api/client/client";
import { OnlineStatus } from "../types/OnlineStatus";

export class OnlineRepository {
  async consultaOnline() {
    const res = await api.get("/online/665287ff3e1d222ca310d080");
    const status: OnlineStatus = res.data;

    console.log(status);

    return status;
  }
}
