import { ReactNode, createContext, useContext, useState } from "react";
import { CabecalhoContextInterface } from "./../types/CabecalhoContextInterface";

const defaultCabecalho = {
  removeVisibility: () => {},
  activateVisibility: () => {},
  isVisible: true,
  navHomeIsActive: true,
  navAdicionaisIsActive: false,
  navPedidosIsActive: false,
  navNotiticacoesIsActive: false,
  clicouMenuBarra: false,
  handleHomeCabecalho: () => {},
  handleAdicionaisCabecalho: () => {},
  handlePedidosCabecalho: () => {},
  handleNotificacoesCabecalho: () => {},
  handleClickMenuBarra: () => {},
} as CabecalhoContextInterface;

const CabecalhoContext = createContext(defaultCabecalho);

export function useCabecalhoContext() {
  return useContext(CabecalhoContext);
}

interface CabecalhoContextProps {
  children: ReactNode;
}

export function CabecalhoContextProvider({ children }: CabecalhoContextProps) {
  const [isVisible, setVisible] = useState(true);
  const [navHomeIsActive, setNavHomeIsActive] = useState(true);
  const [navAdicionaisIsActive, setNavAdicionaisIsActive] = useState(false);
  const [navPedidosIsActive, setnavPedidosIsActive] = useState(false);
  const [navNotiticacoesIsActive, setnavNotiticacoesIsActive] = useState(false);

  const [clicouMenuBarra, setClicouMenuBarra] = useState(false);

  function removeVisibility() {
    setVisible(false);
  }

  function activateVisibility() {
    setVisible(true);
  }

  const handleClickMenuBarra = () => {
    setClicouMenuBarra((v) => !v);
  };

  function handleHomeCabecalho() {
    setNavHomeIsActive(true);
    setNavAdicionaisIsActive(false);
    setnavNotiticacoesIsActive(false);
    setnavPedidosIsActive(false);
    setClicouMenuBarra(false);
  }
  function handleAdicionaisCabecalho() {
    setNavHomeIsActive(false);
    setNavAdicionaisIsActive(true);
    setnavNotiticacoesIsActive(false);
    setnavPedidosIsActive(false);
    setClicouMenuBarra(false);
  }
  function handlePedidosCabecalho() {
    setNavHomeIsActive(false);
    setNavAdicionaisIsActive(false);
    setnavNotiticacoesIsActive(false);
    setnavPedidosIsActive(true);
    setClicouMenuBarra(false);
  }
  function handleNotificacoesCabecalho() {
    setNavHomeIsActive(false);
    setNavAdicionaisIsActive(false);
    setnavNotiticacoesIsActive(true);
    setnavPedidosIsActive(false);
    setClicouMenuBarra(false);
  }

  return (
    <CabecalhoContext.Provider
      value={{
        removeVisibility,
        activateVisibility,
        isVisible,
        navHomeIsActive,
        navAdicionaisIsActive,
        navPedidosIsActive,
        navNotiticacoesIsActive,
        clicouMenuBarra,
        handleHomeCabecalho,
        handleAdicionaisCabecalho,
        handleNotificacoesCabecalho,
        handlePedidosCabecalho,
        handleClickMenuBarra,
      }}
    >
      {children}
    </CabecalhoContext.Provider>
  );
}
