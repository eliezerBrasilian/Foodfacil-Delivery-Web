import { ReactNode, createContext, useContext, useState } from "react";
import { LocalStorageKeys } from "../enums/LocalStorageKeys";
import { PedidoRepository } from "../repositories/PedidoRepository";
import { PedidoContextInterface } from "../types/PedidoContextInterface";
import { PedidoDoUsuarioResponseDto } from "../types/PedidoDoUsuarioResponseDto";
import { PedidoRequestDto } from "../types/PedidoRequestDto";

const defaultPedidoContext: PedidoContextInterface = {
  getAllPedidos: () => {},
  getPedido: async (_id: string) => null,
  pedidos: [],
  criar: (
    _p: PedidoRequestDto,
    _onSuccess: (chavePix: string | null) => void
  ) => {},
};

const PedidoContext = createContext(defaultPedidoContext);

export function usePedidoContext() {
  return useContext(PedidoContext);
}

interface PedidoContextProps {
  children: ReactNode;
}

export function PedidoContextProvider({ children }: PedidoContextProps) {
  const [pedidos, setPedidos] = useState<Array<PedidoDoUsuarioResponseDto>>([]);

  const pedidoRepository = new PedidoRepository();

  async function getPedido(id: string) {
    var token = localStorage.getItem(LocalStorageKeys.TOKEN);

    if (token != null) {
      const pedido = await pedidoRepository.getPedido(token, id);
      return pedido;
    }
    return null;
  }

  async function getAllPedidos() {
    var token = localStorage.getItem(LocalStorageKeys.TOKEN);
    var userId = localStorage.getItem(LocalStorageKeys.USER_ID);

    if (token != null && userId != null) {
      const lista = await pedidoRepository.getAll(token, userId);
      setPedidos(lista);
    }
  }

  async function criar(
    pedidoObj: PedidoRequestDto,
    onSuccess: (chavePix: string | null) => void
  ) {
    var token = localStorage.getItem(LocalStorageKeys.TOKEN);

    if (token != null) {
      await pedidoRepository.criaPedido(token, pedidoObj, onSuccess);
    }
  }

  return (
    <PedidoContext.Provider
      value={{
        getAllPedidos,
        pedidos,
        criar,
        getPedido,
      }}
    >
      {children}
    </PedidoContext.Provider>
  );
}
