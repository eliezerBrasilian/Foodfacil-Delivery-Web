import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { toast } from "react-toastify";
export class AppUtils {
  static copiaChavePixParaTeclado(chave: string) {
    navigator.clipboard
      .writeText(chave as string)
      .then(() => {
        toast("chave pix copiada");
      })
      .catch((_err) => {
        alert("Erro ao copiar chave pix");
      });
  }

  static isExpired(timestamp: number) {
    const MILLISECONDS_IN_24_HOURS = 24 * 60 * 60 * 1000; // Número de milissegundos em 24 horas

    const currentTime = Date.now();
    return currentTime - timestamp >= MILLISECONDS_IN_24_HOURS;
  }

  static milisegundosParaDiaAbreviadoDeMesDeAnoHoraMinutoSegundo(
    milisegundos: number
  ): string {
    console.log("milisegundos: " + milisegundos);

    try {
      const data = new Date(milisegundos);

      console.log("-------data: " + data);

      if (isNaN(data.getTime())) {
        throw new RangeError("Invalid time value");
      }

      return format(data, "dd 'de' MMMM 'de' yyyy 'às' HH:mm:ss", {
        locale: ptBR,
      });
    } catch (error: any) {
      throw new Error(error);
    }
  }

  static milisegundosParaDiaAbreviadoDeMesDeAno(milisegundos: number): string {
    const data = new Date(milisegundos);
    return format(data, "E. dd 'de' MMMM 'de' yyyy", { locale: ptBR });
  }

  static toMoedaBrasileira(valor: number) {
    return Intl.NumberFormat("pt-br", {
      style: "currency",
      currency: "BRL",
    }).format(valor);
  }

  static trataErro(message: string, callback: () => void) {
    if (message == "Access Denied") {
      window.alert("Acesso negado !");
      callback();
    }

    if (message == "AxiosError: Network Error") {
      window.alert("Erro ao se conectar com o servidor!");
      callback();
    }
  }
}
