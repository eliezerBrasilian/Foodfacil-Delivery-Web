import { AxiosResponse } from "axios";
import { api } from "../api/client/client";

export class ApiUtils {
  async fazerRequisicao<T>(rota: string) {
    const maxTentativas = 5;
    let tentativas = 0;

    async function requisicaoRecursiva(rota: string): Promise<T> {
      try {
        const response: AxiosResponse<T> = await api.get(rota);
        console.log(response);
        return response.data;
      } catch (error: any) {
        if (tentativas < maxTentativas) {
          tentativas++;
          console.log(
            `Tentativa ${tentativas} de ${maxTentativas} - Timeout. Tentando novamente...`
          );

          // Chama recursivamente a função fazerRequisicao
          return requisicaoRecursiva(rota);
        } else {
          console.log(
            `Tentativa ${
              tentativas + 1
            } de ${maxTentativas} - Timeout. Tentando novamente...`
          );
          throw new Error(
            `Não foi possível obter os dados após ${maxTentativas} tentativas.`
          );
        }
      }
    }

    try {
      return await requisicaoRecursiva(rota);
    } catch (error: any) {
      console.error("Erro ao obter os dados:", error.message);

      return [];
    }
  }
}
