import { api } from "../api/client/client";
import { PedidoDoUsuarioResponseDto } from "../types/PedidoDoUsuarioResponseDto";
import { PedidoRequestDto } from "../types/PedidoRequestDto";
import { ApiUtils } from "../utils/ApiUtils";

export class PedidoRepository {
  async getPedido(token: string, id: string) {
    try {
      const res: any = await new ApiUtils().fazerRequisicao(
        `pedido/${id}`,
        token
      );
      console.log(res);
      return res as PedidoDoUsuarioResponseDto;
    } catch (error: any) {
      console.error("Erro ao obter o pedido:", error.message);

      return null;
    }
  }
  async getAll(token: string, userId: string) {
    try {
      const res: any = await new ApiUtils().fazerRequisicao(
        `/user/pedidos/${userId}`,
        token
      );
      console.log(res);
      return res as Array<PedidoDoUsuarioResponseDto>;
    } catch (error: any) {
      console.error("Erro ao obter os dados:", error.message);

      return [];
    }
  }

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
