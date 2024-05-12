export interface BottomBarContextInterface {
  removeVisibility: () => void;
  activateVisibility: () => void;
  isVisible: boolean;
  navHomeIsActive: boolean;
  navCardapioIsActive: boolean;
  navPedidosIsActive: boolean;
  navCarrinhoIsActive: boolean;
  navPerfilIsActive: boolean;
  handleHomeBottomBar(): void;
  handleCardapioBottomBar(): void;
  handlePedidosBottomBar(): void;
  handleCarrinhoBottomBar(): void;
  handlePerfilBottomBar(): void;
}
