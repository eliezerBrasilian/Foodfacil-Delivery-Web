import { MetodoPagamento } from "../enums/MetodoPagamento";
import { Plataforma } from "../enums/Plataforma";
import { Address } from "./Address";
import { PagamentoStatus } from "./PagamentoStatus";
import { PedidoStatus } from "./PedidoStatus";
import { SimplesAcompanhamento } from "./SimplesAdicional";
import { SimplesSalgado } from "./SimplesSalgado";

export interface PedidoRequestDto {
  userId: string;
  userEmail: string;
  salgados: SimplesSalgado[];
  acompanhamentos: SimplesAcompanhamento[];
  endereco: Address;
  pagamentoEscolhido: MetodoPagamento;
  quantiaReservada: number;
  plataforma: Plataforma;
  dispositivoToken: string;
  total: number;
  createdAt: number;
  status: PedidoStatus;
  pagamentoStatus: PagamentoStatus;
}
