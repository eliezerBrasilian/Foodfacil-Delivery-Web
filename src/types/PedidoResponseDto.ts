import { PagamentoStatus } from "../enums/PagamentoStatus";
import { PedidoStatus } from "../enums/PedidoStatus";
import { Plataforma } from "../enums/Plataforma";
import { TipoDePagamento } from "../enums/TipoDePagamento";
import { AcompanhamentoResumidoResponseDto } from "./AcompanhamentoResumidoResponseDto";
import { Address } from "./Address";

import { SalgadoResumidoResponseDto } from "./SalgadoResumidoResponseDto";
import { UserResponseDto } from "./UserResponseDto";

export interface PedidoResponseDto {
  id: string;
  usuario: UserResponseDto;
  salgados: SalgadoResumidoResponseDto[];
  acompanhamentos: AcompanhamentoResumidoResponseDto[];
  endereco: Address;
  pagamentoEscolhido: TipoDePagamento;
  quantiaReservada: number;
  plataforma: Plataforma;
  dispositivoToken: string;
  total: number;
  createdAt: number;
  status: PedidoStatus;
  pagamentoStatus: PagamentoStatus;
}
