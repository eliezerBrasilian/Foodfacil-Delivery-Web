export interface NotificacaoRequestDTO {
  titulo: string;
  corpo: string;
  imagem: string | null;
  dados: Record<string, string>;
}
