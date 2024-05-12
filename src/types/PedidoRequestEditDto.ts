import { PedidoStatus } from "../enums/PedidoStatus";

export interface PedidoRequestEditDto {
  id: string;
  pedidoStatus: PedidoStatus | string;
  dispositivoToken: string | null;
}
