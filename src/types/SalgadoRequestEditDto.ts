import { Categoria } from "../enums/Categoria"; // Importe o enum Categoria aqui
import { Disponibilidade } from "../enums/Disponibilidade"; // Importe o tipo Disponibilidade aqui
import { ImagemType } from "./ImagemType";

export interface SalgadoRequestEditDto {
  id: string;
  nome: string;
  categoria: Categoria;
  descricao: string;
  preco: number;
  imagem: ImagemType;
  imagemRetangular: ImagemType;
  imagemQuadrada: ImagemType;
  emOferta: boolean;
  precoEmOferta: number;
  disponibilidade: Disponibilidade;
  sabores: string[] | null;
}
