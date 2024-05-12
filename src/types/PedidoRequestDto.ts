import { Categoria } from "../enums/Categoria"; // Importe o enum Categoria aqui
import { Disponibilidade } from "../enums/Disponibilidade"; // Importe o tipo Disponibilidade aqui

export interface PedidoRequestDto {
  nome: string;
  categoria: Categoria;
  descricao: string;
  preco: number;
  imagem: string;
  imagemRetangular: string;
  imagemQuadrada: string;
  emOferta: boolean;
  precoEmOferta: number;
  disponibilidade: Disponibilidade;
  createdAt: number;
  sabores: string[];
}
