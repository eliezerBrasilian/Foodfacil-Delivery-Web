import { Categoria } from "../enums/Categoria";
import { Disponibilidade } from "../enums/Disponibilidade";

interface SalgadoResponseDto {
  id: string;
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

export type { SalgadoResponseDto };
