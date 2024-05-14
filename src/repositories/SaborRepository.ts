import { SaborResponseDto } from "../types/SaborResponseDto";
import { ApiUtils } from "../utils/ApiUtils";

export class SaborRepository {
  async getAll(token: string) {
    try {
      const lista: Array<SaborResponseDto> =
        await new ApiUtils().fazerRequisicao("/sabor", token);

      return lista;
    } catch (error: any) {
      console.error("Erro ao obter os dados:", error.message);

      return [];
    }
  }
}
