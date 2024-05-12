import { Disponibilidade } from "../enums/Disponibilidade";

interface IngredienteDto {
  nome: String;
  imagem: String | undefined;
  preco: number;
  createdAt: number;
  disponibilidade: Disponibilidade;
}

export type { IngredienteDto };
