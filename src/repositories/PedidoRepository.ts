import { api } from "../api/client/client";
import { PedidoRequestDto } from "../types/PedidoRequestDto";

export class PedidoRepository {
  async criaPedido(
    token: string,
    pedido: PedidoRequestDto,
    onSuccess: (chavePix: string | null) => void
  ) {
    console.log("em criaPedido");
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response: any = await api.post(`/user/pedido`, pedido, config);
      console.log(response);
      onSuccess(response.data as string);
    } catch (error: any) {
      console.log(error.response.data.message);
      throw new Error(error);
    }
  }
}
