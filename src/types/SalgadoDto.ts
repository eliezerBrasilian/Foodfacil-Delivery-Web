import { Categoria } from "../enums/Categoria";
import { Disponibilidade } from "../enums/Disponibilidade";

export interface SalgadoDto {
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
  quantidade: number;
  createdAt: number;
  observacao?: string | null;
  sabores: string[];
}
