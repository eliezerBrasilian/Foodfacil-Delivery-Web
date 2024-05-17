import { Disponibilidade } from "../enums/Disponibilidade";

export interface AcompanhamentoDto {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  imagem: string;
  disponibilidade: Disponibilidade;
  quantidade: number;
  createdAt: number;
}
