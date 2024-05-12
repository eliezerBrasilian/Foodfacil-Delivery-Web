import { Disponibilidade } from "../enums/Disponibilidade";

export interface AcompanhamentoRequestDto {
  nome: string;
  descricao: string;
  preco: number;
  imagem: string | null;
  disponibilidade: Disponibilidade;
  createdAt: number;
}
