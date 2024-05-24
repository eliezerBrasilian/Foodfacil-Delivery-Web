import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
export class AppUtils {
  static isExpired(timestamp: number) {
    const MILLISECONDS_IN_24_HOURS = 24 * 60 * 60 * 1000; // Número de milissegundos em 24 horas

    const currentTime = Date.now();
    return currentTime - timestamp >= MILLISECONDS_IN_24_HOURS;
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
