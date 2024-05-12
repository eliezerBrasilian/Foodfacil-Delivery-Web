import { ReactNode, createContext, useContext, useState } from "react";
import { api } from "../api/client/client";
import { NotificacaoContextInterface } from "../types/NotificacaoContextInterface";
import { NotificacaoRequestDTO } from "../types/NotificacaoRequestDTO";
import { TokenDispositivoResponseDto } from "../types/TokenDispositivoResponseDto";

const defaultNotificacaoContext: NotificacaoContextInterface = {
  enviaNotificacao: (
    _notificacaoRequestDto: NotificacaoRequestDTO,
    _onSuccess: (_msg: string) => void,
    _onError: (_msg: string) => void,
    _token: string
  ) => {},
  listaTokensDeCelulares: (
    _token: string,
    _onSuccess: (_msg: string) => void,
    _onError: (_msg: string) => void
  ) => {},
  listTokensDeCelulares: Array<TokenDispositivoResponseDto>(),
  excluir: (
    _id: string,
    _token: string,
    _onSuccess: (msg: string) => void,
    _onError: (msg: string) => void
  ) => {},
};

const notificacaoContext = createContext(defaultNotificacaoContext);

export function useNotificacaoContext() {
  return useContext(notificacaoContext);
}

interface NotificacaoContextProps {
  children: ReactNode;
}

export function NotificacaoContextProvider({
  children,
}: NotificacaoContextProps) {
  const [listTokensDeCelulares, setListTokensDeCelulares] = useState<
    Array<TokenDispositivoResponseDto>
  >(Array<TokenDispositivoResponseDto>());

  async function enviaNotificacao(
    notificacaoRequestDto: NotificacaoRequestDTO,
    onSuccess: (msg: string) => void,
    onError: (msg: string) => void,
    token: string
  ) {
    //

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      await api.post("/notificacao/em-massa", notificacaoRequestDto, config);

      console.log("sucesso ao enviar notiticacao");
      onSuccess("salvo com sucesso");
    } catch (e: any) {
      console.log(e);
      onError(e.response.data.message);
    }
  }

  async function listaTokensDeCelulares(
    token: string,
    onSuccess: (_msg: string) => void,
    onError: (_msg: string) => void
  ) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      var resp = await api.get("/notificacao/tokens-salvos-de-celular", config);

      setListTokensDeCelulares(resp.data);

      console.log("sucesso ao listar notiticacoes");
      onSuccess("listado com sucesso");
    } catch (e: any) {
      console.log(e);
      onError(e.response.data.message);
    }
  }

  async function excluir(
    id: string,
    token: string,
    onSuccess: (msg: string) => void,
    onError: (msg: string) => void
  ) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await api.delete(
        `/notificacao/tokens-salvos-de-celular/${id}`,
        config
      );

      console.log(response.data);
      onSuccess("excluido com sucesso");

      setListTokensDeCelulares((prevList) => {
        var aux: Array<TokenDispositivoResponseDto> = [];
        prevList.forEach((item) => {
          if (item.id != id) aux.push(item);
        });

        return aux;
      });
    } catch (e: any) {
      console.log("erro: " + e.response);
      onError(e);
    }
  }

  return (
    <notificacaoContext.Provider
      value={{
        enviaNotificacao,
        listaTokensDeCelulares,
        listTokensDeCelulares,
        excluir,
      }}
    >
      {children}
    </notificacaoContext.Provider>
  );
}
