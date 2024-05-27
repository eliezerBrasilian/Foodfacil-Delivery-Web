import { MetodoPagamento } from "../enums/MetodoPagamento";
import { Plataforma } from "../enums/Plataforma";
import { AcompanhamentoDto } from "./AcompanhamentoDto";
import { Address } from "./Address";
import { PagamentoStatus } from "./PagamentoStatus";
import { PedidoStatus } from "./PedidoStatus";
import { SalgadoDto } from "./SalgadoDto";

export interface PedidoRequestDto {
  userId: string;
  userEmail: string;
  salgados: SalgadoDto[];
  acompanhamentos: AcompanhamentoDto[];
  endereco: Address;
  pagamentoEscolhido: MetodoPagamento;
  quantiaReservada: number;
  plataforma: Plataforma;
  dispositivoToken: string;
  total: number;
  createdAt: number;
  status: PedidoStatus;
  pagamentoStatus: PagamentoStatus;
  taxa: number;
}
