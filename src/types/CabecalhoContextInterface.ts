export interface CabecalhoContextInterface {
  removeVisibility: () => void;
  activateVisibility: () => void;
  isVisible: boolean;
  navHomeIsActive: boolean;
  navAdicionaisIsActive: boolean;
  navPedidosIsActive: boolean;
  navNotiticacoesIsActive: boolean;
  clicouMenuBarra: boolean;
  handleHomeCabecalho(): void;
  handleAdicionaisCabecalho(): void;
  handlePedidosCabecalho(): void;
  handleNotificacoesCabecalho(): void;
  handleClickMenuBarra(): void;
}
