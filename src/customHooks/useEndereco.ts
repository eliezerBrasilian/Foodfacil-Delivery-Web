import { useEffect, useState } from "react";
import { LocalStorageKeys } from "../enums/LocalStorageKeys";
import { MunicipioInterno } from "../enums/MunicipiosInternos";

export function useEndereco() {
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [bairro, setBairro] = useState("");
  const [complemento, setComplemento] = useState("");

  const [cidadeSelecionada, setCidadeSelecionada] = useState<string>(
    MunicipioInterno.BRAS_PIRES_PRINCIPAL
  );

  const [enderecoExiste, setEnderecoExiste] = useState(false);

  useEffect(() => {
    var optionalCidade = localStorage.getItem(LocalStorageKeys.CIDADE);
    var optionalRua = localStorage.getItem(LocalStorageKeys.RUA);
    var optionalNum = localStorage.getItem(LocalStorageKeys.NUMERO);
    var optionalB = localStorage.getItem(LocalStorageKeys.BAIRRO);
    var optionalPr = localStorage.getItem(LocalStorageKeys.PONTO_DE_REFERENCIA);

    if (
      optionalCidade != null &&
      optionalRua != null &&
      optionalNum != null &&
      optionalB != null &&
      optionalPr != null
    ) {
      setCidadeSelecionada(optionalCidade);
      setRua(optionalRua);
      setNumero(optionalNum);
      setBairro(optionalB);
      setComplemento(optionalPr);
      setEnderecoExiste(true);
    }
  }, []);

  function salvaEndereco(
    cidade: string,
    rua: string,
    numero: string,
    bairro: string,
    complemento: string
  ) {
    localStorage.setItem(LocalStorageKeys.CIDADE, cidade);
    localStorage.setItem(LocalStorageKeys.RUA, rua);
    localStorage.setItem(LocalStorageKeys.NUMERO, numero);
    localStorage.setItem(LocalStorageKeys.BAIRRO, bairro);
    localStorage.setItem(LocalStorageKeys.PONTO_DE_REFERENCIA, complemento);

    setCidadeSelecionada(cidade);
    setRua(rua);
    setNumero(numero);
    setBairro(bairro);
    setComplemento(complemento);
    setEnderecoExiste(true);
  }

  return {
    rua,
    numero,
    bairro,
    complemento,
    cidadeSelecionada,
    enderecoExiste,
    salvaEndereco,
    setRua,
    setNumero,
    setBairro,
    setComplemento,
    setCidadeSelecionada,
  };
}
