import { ReactNode, createContext, useContext, useState } from "react";
import { LocalStorageKeys } from "../enums/LocalStorageKeys";
import { SaborRepository } from "../repositories/SaborRepository";
import { SaborContextInterface } from "../types/SaborContextInterface";
import { SaborResponseDto } from "../types/SaborResponseDto";

const defaultContext: SaborContextInterface = {
  carregado: false,
  carregando: true,
  getAll: () => {},
  lista: [],
};

const SaborContext = createContext(defaultContext);

type SaborProviderProps = {
  children: ReactNode;
};

export function useSaborContext() {
  return useContext(SaborContext);
}

export function SaborContextProvider({ children }: SaborProviderProps) {
  const [lista, setLista] = useState<Array<SaborResponseDto>>([]);

  const [carregado, setCarregado] = useState(false);
  const [carregando, setCarregando] = useState(true);

  const saborRepository = new SaborRepository();

  async function getAll() {
    setCarregando(true);
    var token = localStorage.getItem(LocalStorageKeys.TOKEN);

    if (token != null) {
      var _lista = await saborRepository.getAll(token);

      setLista(_lista);
    }
    setCarregado(true);
    setCarregando(false);
  }

  return (
    <SaborContext.Provider value={{ getAll, carregado, carregando, lista }}>
      {children}
    </SaborContext.Provider>
  );
}
