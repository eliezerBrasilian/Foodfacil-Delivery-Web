import { api } from "../api/client/client";
import { SalgadoResponseDto } from "../types/SalgadoResponseDto";

export class SalgadoRepository {
  async getAll(onError: (str: string) => void) {
    try {
      var response = await api.get("/salgado");
      console.log(response);

      var lista: Array<SalgadoResponseDto> = response.data.lista;
      return lista;
    } catch (e: any) {
      console.log("erro: " + e);
      onError(e.response.data);
      return [];
    }
  }
}
