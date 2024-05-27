import { Categoria } from "../enums/Categoria"; // Importe o enum Categoria aqui
import { Disponibilidade } from "../enums/Disponibilidade"; // Importe o tipo Disponibilidade aqui

interface SalgadoRequestDto {
  nome: string;
  categoria: Categoria | string;
  descricao: string;
  preco: number;
  imagem: string;
  imagemRetangular: string | null;
  imagemQuadrada: string | null;
  emOferta: boolean;
  precoEmOferta: number;
  disponibilidade: Disponibilidade | string;
  createdAt: number;
  observacao: string;
  quantidade: number;
  sabores: string[];
}

export type { SalgadoRequestDto };
