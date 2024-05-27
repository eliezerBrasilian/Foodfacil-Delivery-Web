import { MetodoPagamento } from "../enums/MetodoPagamento";
import { AcompanhamentoRequestDto } from "./AcompanhamentoRequestDto";
import { Address } from "./Address";
import { PagamentoStatus } from "./PagamentoStatus";
import { PedidoStatus } from "./PedidoStatus";
import { SalgadoRequestDto } from "./SalgadoRequestDto";

export interface PedidoDoUsuarioResponseDto {
  id: string;
  userId: string;
  salgados: SalgadoRequestDto[];
  acompanhamentos: AcompanhamentoRequestDto[];
  endereco: Address;
  pagamentoEscolhido: MetodoPagamento;
  quantiaReservada: number;
  total: number;
  createdAt: number;
  status: PedidoStatus;
  pagamentoStatus: PagamentoStatus;
  chavePix: string;
  taxa: number;
}
