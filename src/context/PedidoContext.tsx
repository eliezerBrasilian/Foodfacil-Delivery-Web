import { ReactNode, createContext, useContext, useState } from "react";
import { api } from "../api/client/client";
import { PedidoContextInterface } from "../types/PedidoContextInterface";
import { PedidoRequestDto } from "../types/PedidoRequestDto";
import { PedidoRequestEditDto } from "../types/PedidoRequestEditDto";
import { PedidoResponseDto } from "../types/PedidoResponseDto";

const defaultPedidoContext = {
  getAllPedidos: (_token: string, _onError: (message: string) => void) => {},
  pedidos: [],
  salvarPedido: (
    _p: PedidoRequestDto,
    _t: string,
    _onError: (message: string) => void
  ) => {},
  editarPedido: (_pedidoObj: PedidoRequestEditDto, _token: string) => {},
  excluirPedido: (_pedidoId: string, _token: string) => {},
} as PedidoContextInterface;

const PedidoContext = createContext(defaultPedidoContext);

export function usePedidoContext() {
  return useContext(PedidoContext);
}

interface PedidoContextProps {
  children: ReactNode;
}

function PedidoContextProvider({ children }: PedidoContextProps) {
  const [pedidos, setPedidos] = useState<Array<PedidoResponseDto>>([]);

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

  async function salvarPedido(
    pedidoObj: PedidoRequestDto,
    token: string,
    onError: (message: string) => void
  ) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await api.post("/pedido", pedidoObj, config);

      console.log(response.data);

      window.alert("salvo com sucesso");
    } catch (e: any) {
      console.log("erro: " + JSON.stringify(e.response.data));
      window.alert(e);
      onError(e.response.data.message);
    }
  }

  async function editarPedido(
    pedidoObj: PedidoRequestEditDto,
    token: string,
    onSuccess: () => void
  ) {
    console.log("Pedido para editar");
    console.log(pedidoObj);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await api.put(
        `/pedido/${pedidoObj.id}`,
        pedidoObj,
        config
      );

      console.log(response.data);

      onSuccess();
    } catch (e: any) {
      console.log("erro: " + e.response.data);
      window.alert(e);
    }
  }

  async function excluirPedido(pedidoId: string, token: string) {
    console.log("id do Pedido que será excluido");
    console.log(pedidoId);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await api.delete(`/pedido/${pedidoId}`, config);

      console.log(response.data);

      window.alert("excluido com sucesso");
    } catch (e: any) {
      console.log("erro: " + e.response);
      window.alert(e);
    }
  }

  return (
    <PedidoContext.Provider
      value={{
        getAllPedidos,
        pedidos,
        salvarPedido,
        editarPedido,
        excluirPedido,
      }}
    >
      {children}
    </PedidoContext.Provider>
  );
}
export { PedidoContextProvider };
