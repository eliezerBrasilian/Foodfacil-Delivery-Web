import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { LocalStorageKeys } from "../enums/LocalStorageKeys";
import { MunicipioInterno } from "../enums/MunicipiosInternos";
import { TaxaContextInterface } from "../types/TaxaContextInterface";

const defaultContext: TaxaContextInterface = {
  defineTaxa: (_m: string) => {},
  taxa: -1,
};

const TaxaContext = createContext(defaultContext);

export function useTaxaContext() {
  return useContext(TaxaContext);
}

interface TaxaContextProps {
  children: ReactNode;
}

export function TaxaContextProvider({ children }: TaxaContextProps) {
  const [taxa, setTaxa] = useState<number>(-1);

  useEffect(() => {
    var optionalCidade = localStorage.getItem(LocalStorageKeys.CIDADE);

    if (optionalCidade != null) {
      console.log(optionalCidade === MunicipioInterno.BRAS_PIRES_PRINCIPAL);
      if (optionalCidade === MunicipioInterno.BRAS_PIRES_PRINCIPAL) {
        setTaxa(2);
      } else if (optionalCidade == MunicipioInterno.RIBEIRAO) {
        setTaxa(10);
      } else {
        setTaxa(5);
      }
    }
  }, [taxa]);

  function defineTaxa(m: string) {
    if (m === MunicipioInterno.BRAS_PIRES_PRINCIPAL) {
      setTaxa(2);
    } else if (m == MunicipioInterno.RIBEIRAO) {
      setTaxa(10);
    } else {
      setTaxa(5);
    }
  }

  return (
    <TaxaContext.Provider value={{ taxa, defineTaxa }}>
      {children}
    </TaxaContext.Provider>
  );
}
