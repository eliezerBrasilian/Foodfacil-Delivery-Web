import { MetodoPagamento } from "../enums/MetodoPagamento";
import { AcompanhamentoResumidoResponseDto } from "./AcompanhamentoResumidoResponseDto";
import { Address } from "./Address";
import { PagamentoStatus } from "./PagamentoStatus";
import { PedidoStatus } from "./PedidoStatus";
import { SalgadoResumidoResponseDto } from "./SalgadoResumidoResponseDto";

export interface PedidoDoUsuarioResponseDto {
  id: string;
  userId: string;
  salgados: SalgadoResumidoResponseDto[];
  acompanhamentos: AcompanhamentoResumidoResponseDto[];
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
