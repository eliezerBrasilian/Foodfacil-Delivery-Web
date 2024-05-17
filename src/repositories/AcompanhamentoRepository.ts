import { AcompanhamentoResponseDto } from "../types/AcompanhamentoResponseDto";
import { ApiUtils } from "../utils/ApiUtils";

export class AcompanhamentoRepository {
  async getAll(token: string) {
    try {
      const resp: any = await new ApiUtils().fazerRequisicao(
        "/acompanhamento",
        token
      );

      return resp.lista as Array<AcompanhamentoResponseDto>;
    } catch (error: any) {
      console.error("Erro ao obter os dados:", error.message);

      return [];
    }
  }
}
