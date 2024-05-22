import { PedidoDoUsuarioResponseDto } from "./PedidoDoUsuarioResponseDto";
import { PedidoRequestDto } from "./PedidoRequestDto";

export interface PedidoContextInterface {
  getAllPedidos: () => void;
  pedidos: Array<PedidoDoUsuarioResponseDto>;
  criar: (
    pedidoObj: PedidoRequestDto,
    onSuccess: (chavePix: string | null) => void
  ) => void;
}
