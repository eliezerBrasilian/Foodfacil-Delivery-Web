import { SalgadoResponseDto } from "../types/SalgadoResponseDto";
import { ApiUtils } from "../utils/ApiUtils";

export class SalgadoRepository {
  async getAll(token: string) {
    try {
      const res: any = await new ApiUtils().fazerRequisicao("/salgado", token);

      return res.lista as Array<SalgadoResponseDto>;
    } catch (error: any) {
      console.error("Erro ao obter os dados:", error.message);

      return [];
    }
  }
}
