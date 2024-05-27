import { Disponibilidade } from "../enums/Disponibilidade";

export interface AcompanhamentoRequestDto {
  nome: string;
  descricao: string;
  preco: number;
  imagem: string;
  disponibilidade: Disponibilidade;
  createdAt: number;
  quantidade: number;
}
