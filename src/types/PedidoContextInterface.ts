import { PedidoRequestDto } from "./PedidoRequestDto";
import { PedidoRequestEditDto } from "./PedidoRequestEditDto";
import { PedidoResponseDto } from "./PedidoResponseDto";

export interface PedidoContextInterface {
  getAllPedidos: (token: string, onError: (message: string) => void) => void;
  pedidos: Array<PedidoResponseDto>;
  salvarPedido: (
    pedidoObj: PedidoRequestDto,
    token: string,
    onError: (message: string) => void
  ) => void;
  editarPedido: (
    pedidoObj: PedidoRequestEditDto,
    token: string,
    onSuccess: () => void
  ) => void;
  excluirPedido: (pedidoId: string, token: string) => void;
}
