import { SalgadoDto } from "./SalgadoDto";

export interface SalgadoContextInterface {
  salgados: Array<SalgadoDto>;
  salgadosEmPromocao: Array<SalgadoDto>;
  combos: Array<SalgadoDto>;
  carregando: boolean;
  carregado: boolean;
  getAllSalgados: () => void;
  buscaItem: (id: string) => SalgadoDto | undefined;
  adicionaSabores(
    salgadoId: string,
    sabores: string[],
    observacao: string
  ): SalgadoDto | null;
  saborEstaAdicionado(salgadoId: string, nome: string): boolean;
}
