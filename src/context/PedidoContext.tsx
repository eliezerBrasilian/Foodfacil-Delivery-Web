import { ReactNode, createContext, useContext, useState } from "react";
import { api } from "../api/client/client";
import { PedidoContextInterface } from "../types/PedidoContextInterface";
import { PedidoRequestDto } from "../types/PedidoRequestDto";
import { PedidoResponseDto } from "../types/PedidoResponseDto";
import { LocalStorageKeys } from "../enums/LocalStorageKeys";
import { PedidoRepository } from "../repositories/PedidoRepository";

const defaultPedidoContext: PedidoContextInterface = {
  getAllPedidos: (_token: string, _onError: (message: string) => void) => {},
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

function PedidoContextProvider({ children }: PedidoContextProps) {
  const [pedidos, setPedidos] = useState<Array<PedidoResponseDto>>([]);

  const pedidoRepository = new PedidoRepository();

  async function getAllPedidos(
    token: string,
    onError: (message: string) => void
  ) {
    console.log("get all");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      var response = await api.get("/pedido", config);
      console.log(response.data.lista);

      console.log("data- pedidos------");
      console.log(response.data);

      var lista: Array<PedidoResponseDto> = response.data.lista;

      setPedidos(lista);
    } catch (e: any) {
      console.log("erro: " + e.response.data);
      onError(e.response.data.message);
    }
  }

  async function criar(
    pedidoObj: PedidoRequestDto,
    onSuccess: (chavePix: string | null) => void
  ) {
    var token = LocalStorageKeys.TOKEN;

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
      }}
    >
      {children}
    </PedidoContext.Provider>
  );
}
export { PedidoContextProvider };
