import { PedidoRequestDto } from "./PedidoRequestDto";
import { PedidoResponseDto } from "./PedidoResponseDto";

export interface PedidoContextInterface {
  getAllPedidos: (token: string, onError: (message: string) => void) => void;
  pedidos: Array<PedidoResponseDto>;
  criar: (
    pedidoObj: PedidoRequestDto,
    onSuccess: (chavePix: string | null) => void
  ) => void;
}
