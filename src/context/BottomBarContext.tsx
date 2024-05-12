import { ReactNode, createContext, useContext, useState } from "react";
import { BottomBarContextInterface } from "../types/BottomBarContextInterface";

const defaultBottomBar = {
  removeVisibility: () => {},
  activateVisibility: () => {},
  isVisible: true,
  navHomeIsActive: true,
  navCardapioIsActive: false,
  navPedidosIsActive: false,
  navCarrinhoIsActive: false,
  navPerfilIsActive: false,
  handleHomeBottomBar: () => {},
  handleCardapioBottomBar: () => {},
  handlePedidosBottomBar: () => {},
  handleCarrinhoBottomBar: () => {},
  handlePerfilBottomBar: () => {},
} as BottomBarContextInterface;

const BottomBarContext = createContext(defaultBottomBar);

export function useBottomBarContext() {
  return useContext(BottomBarContext);
}

interface BottomBarContextProps {
  children: ReactNode;
}

export function BottomBarContextProvider({ children }: BottomBarContextProps) {
  const [isVisible, setVisible] = useState(true);
  const [navHomeIsActive, setNavHomeIsActive] = useState(true);
  const [navCardapioIsActive, setNavCardapioIsActive] = useState(false);
  const [navPedidosIsActive, setnavPedidosIsActive] = useState(false);
  const [navCarrinhoIsActive, setNavCarrinhoIsActive] = useState(false);
  const [navPerfilIsActive, setnavPerfilIsActive] = useState(false);

  function removeVisibility() {
    setVisible(false);
  }

  function activateVisibility() {
    setVisible(true);
  }

  function handleHomeBottomBar() {
    setNavHomeIsActive(true);
    setNavCardapioIsActive(false);
    setnavPedidosIsActive(false);
    setNavCarrinhoIsActive(false);
    setnavPerfilIsActive(false);
  }
  function handleCardapioBottomBar() {
    setNavHomeIsActive(false);
    setNavCardapioIsActive(true);
    setnavPedidosIsActive(false);
    setNavCarrinhoIsActive(false);
    setnavPerfilIsActive(false);
  }
  function handlePedidosBottomBar() {
    setNavHomeIsActive(false);
    setNavCardapioIsActive(false);
    setnavPedidosIsActive(true);
    setNavCarrinhoIsActive(false);
    setnavPerfilIsActive(false);
  }
  function handleCarrinhoBottomBar() {
    setNavHomeIsActive(false);
    setNavCardapioIsActive(false);
    setnavPedidosIsActive(false);
    setNavCarrinhoIsActive(true);
    setnavPerfilIsActive(false);
  }
  function handlePerfilBottomBar() {
    setNavHomeIsActive(false);
    setNavCardapioIsActive(false);
    setnavPedidosIsActive(false);
    setNavCarrinhoIsActive(false);
    setnavPerfilIsActive(true);
  }

  return (
    <BottomBarContext.Provider
      value={{
        removeVisibility,
        activateVisibility,
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
      }}
    >
      {children}
    </BottomBarContext.Provider>
  );
}
