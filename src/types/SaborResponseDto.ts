import { Disponibilidade } from "../enums/Disponibilidade";

export interface SaborResponseDto {
  id: string;
  nome: string;
  createdAt: number;
  disponibilidade: Disponibilidade;
}
