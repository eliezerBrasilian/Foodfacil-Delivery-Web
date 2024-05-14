import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useBottomBarContext } from "../context/BottomBarContext";
import { useLarguraAtual } from "../custom_hooks/useLarguraAtual";
import { Rotas } from "../enums/Rotas";
import { BottomBarItems } from "./BottomBarItems";

export function BottomBar() {
  const {
    isVisible,
    navHomeIsActive,
    navCardapioIsActive,
    navPedidosIsActive,
    navCarrinhoIsActive,
    navPerfilIsActive,
    handleHomeBottomBar,
    handleCardapioBottomBar,
    handleCarrinhoBottomBar,
    handlePedidosBottomBar,
    handlePerfilBottomBar,
    removeVisibility,
  } = useBottomBarContext();

  const location = useLocation();
  const nome = location.pathname;

  useEffect(() => {
    if (nome === Rotas.HOME) {
      handleHomeBottomBar();
    } else if (nome === Rotas.TELA_PEDIDOS) {
      handlePedidosBottomBar();
    } else if (nome === Rotas.TELA_CARDAPIO) {
      handleCardapioBottomBar();
    } else if (nome === Rotas.TELA_CARRINHO) {
      handleCarrinhoBottomBar();
    } else if (nome === Rotas.TELA_PERFIL) {
      handlePerfilBottomBar();
    } else {
      removeVisibility();
    }
  }, [location]);

  const larguraAtual = useLarguraAtual();

  if (isVisible) {
    if (larguraAtual <= 500) {
      return (
        <BottomBarItems
          navHomeIsActive={navHomeIsActive}
          navCardapioIsActive={navCardapioIsActive}
          navPedidosIsActive={navPedidosIsActive}
          navCarrinhoIsActive={navCarrinhoIsActive}
          navPerfilIsActive={navPerfilIsActive}
        />
      );
    } else return <div></div>;
  } else return <div></div>;
}
