import { LocalStorageKeys } from "../enums/LocalStorageKeys";
import { MetodoPagamento } from "../enums/MetodoPagamento";
import { Plataforma } from "../enums/Plataforma";
import { AcompanhamentoDto } from "../types/AcompanhamentoDto";
import { Address } from "../types/Address";
import { PagamentoStatus } from "../types/PagamentoStatus";
import { PedidoRequestDto } from "../types/PedidoRequestDto";
import { PedidoStatus } from "../types/PedidoStatus";
import { SalgadoDto } from "../types/SalgadoDto";
import { SimplesAcompanhamento } from "../types/SimplesAdicional";
import { SimplesSalgado } from "../types/SimplesSalgado";

export class PedidoService {
  private pedidodata: PedidoRequestDto | null;

  constructor() {
    this.pedidodata = null;
  }
  build(
    salgadosList: SalgadoDto[],
    acompanhamentoList: AcompanhamentoDto[],
    metodoEscolhido: MetodoPagamento,
    total: number,
    saldo: number
  ) {
    var salgados: SimplesSalgado[] = salgadosList.map((v) => ({
      id: v.id,
      quantidade: v.quantidade,
      observacao: v.observacao,
      sabores: v.sabores,
    }));

    var acompanhamentos: SimplesAcompanhamento[] = acompanhamentoList.map(
      (v) => ({
        id: v.id,
        quantidade: v.quantidade,
      })
    );

    const numeroCasa = localStorage.getItem(
      LocalStorageKeys.NUMERO
    ) as unknown as number;

    var endereco: Address = {
      cidade: localStorage.getItem(LocalStorageKeys.CIDADE) as string,
      rua: localStorage.getItem(LocalStorageKeys.RUA) as string,
      numero: numeroCasa,
      bairro: localStorage.getItem(LocalStorageKeys.BAIRRO) as string,
      complemento: localStorage.getItem(
        LocalStorageKeys.PONTO_DE_REFERENCIA
      ) as string,
    };
    const novoPedido: PedidoRequestDto = {
      userId: localStorage.getItem(LocalStorageKeys.USER_ID) as string,
      userEmail: "exemplo@dominio.com",
      salgados: salgados,
      acompanhamentos: acompanhamentos,
      endereco: endereco,
      pagamentoEscolhido: metodoEscolhido,
      quantiaReservada: saldo,
      plataforma: Plataforma.WEB,
      dispositivoToken: "",
      total: total,
      createdAt: Date.now(),
      status: PedidoStatus.AGUARDANDO_PREPARO,
      pagamentoStatus: PagamentoStatus.AGUARDANDO_PAGAMENTO,
    };

    this.pedidodata = novoPedido;
  }

  getPedidoProcessado() {
    return this.pedidodata;
  }
}
