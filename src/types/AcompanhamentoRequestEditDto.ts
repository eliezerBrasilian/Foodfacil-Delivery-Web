import { Disponibilidade } from "../enums/Disponibilidade";
import { ImagemType } from "./ImagemType";

export interface AcompanhamentoRequestEditDto {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  imagem: ImagemType;
  disponibilidade: Disponibilidade;
}
