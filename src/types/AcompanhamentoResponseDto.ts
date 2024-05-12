import { Disponibilidade } from "../enums/Disponibilidade";

export interface AcompanhamentoResponseDto {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  imagem: string;
  disponibilidade: Disponibilidade;
  createdAt: number;
}
