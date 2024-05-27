import { ChangeEvent, useEffect, useState } from "react";

import { LocalStorageKeys } from "../enums/LocalStorageKeys";
import { MunicipioInterno } from "../enums/MunicipiosInternos";

import Modal from "react-modal";
import { useTaxaContext } from "../context/TaxaContext";
import { EnderecoCadastrado } from "./EnderecoCadastrado";
import { ModalAdicionarEndereco } from "./ModalAdicionarEndereco";
import { NaoPossuiEnderecoEmFinalizarPedido } from "./NaoPossuiEnderecoEmFinalizarPedido";
Modal.setAppElement("#root");

interface EnderecoEmFinalizarPedidoProps {
  setBairroState: React.Dispatch<React.SetStateAction<string>>;
}
export function EnderecoEmFinalizarPedido({
  setBairroState,
}: EnderecoEmFinalizarPedidoProps) {
  const [enderecoDefinido, setDefineEndereco] = useState(false);
  const [clicouAdicionarEndereco, setClicouAdicionarEndereco] = useState(false);

  const { defineTaxa } = useTaxaContext();

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
      setDefineEndereco(true);
      setCidadeSelecionada(optionalCidade);
      setRua(optionalRua);
      setNumero(optionalNum);
      setBairro(optionalB);
      setComplemento(optionalPr);
      setBairroState(optionalB);
    }
  }, []);

  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [bairro, setBairro] = useState("");
  const [complemento, setComplemento] = useState("");

  const [cidadeSelecionada, setCidadeSelecionada] = useState<string>(
    MunicipioInterno.BRAS_PIRES_PRINCIPAL
  );

  const [ruaEstaVazia, setRuaEstaVazia] = useState(false);
  const [numeroEstaVazia, setNumeroEstaVazia] = useState(false);
  const [bairroEstaVazia, setBairroEstaVazia] = useState(false);
  const [complementoEstaVazia, setComplementoEstaVazia] = useState(false);

  const handleCidadeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setCidadeSelecionada(selectedValue);
  };
  const handleRuaChange = (event: ChangeEvent<HTMLInputElement>) => {
    const v = event.target.value;
    setRua(v);
  };
  const handleNumeroChange = (event: ChangeEvent<HTMLInputElement>) => {
    const v = event.target.value;
    setNumero(v);
  };
  const handleBairroChange = (event: ChangeEvent<HTMLInputElement>) => {
    const v = event.target.value;
    setBairro(v);
  };
  const handleComplementoChange = (event: ChangeEvent<HTMLInputElement>) => {
    const v = event.target.value;
    setComplemento(v);
  };

  const onClickAtivaModal = () => {
    setClicouAdicionarEndereco(true);
  };
  const onClickFecharModal = () => {
    setClicouAdicionarEndereco(false);
  };

  const onClick = () => {
    if (IsEmpty(rua)) {
      setRuaEstaVazia(true);
    }
    if (IsEmpty(numero)) {
      setNumeroEstaVazia(true);
    }
    if (IsEmpty(bairro)) {
      setBairroEstaVazia(true);
    }
    if (IsEmpty(complemento)) {
      setComplementoEstaVazia(true);
    }
    //
    if (IsNotEmpty(rua)) {
      setRuaEstaVazia(false);
    }
    if (IsNotEmpty(numero)) {
      setNumeroEstaVazia(false);
    }
    if (IsNotEmpty(bairro)) {
      setBairroEstaVazia(false);
    }
    if (IsNotEmpty(complemento)) {
      setComplementoEstaVazia(false);
    }
    if (
      IsNotEmpty(rua) &&
      IsNotEmpty(numero) &&
      IsNotEmpty(bairro) &&
      IsNotEmpty(complemento)
    ) {
      localStorage.setItem(LocalStorageKeys.CIDADE, cidadeSelecionada);
      localStorage.setItem(LocalStorageKeys.RUA, rua);
      localStorage.setItem(LocalStorageKeys.NUMERO, numero);
      localStorage.setItem(LocalStorageKeys.BAIRRO, bairro);
      localStorage.setItem(LocalStorageKeys.PONTO_DE_REFERENCIA, complemento);

      defineTaxa(cidadeSelecionada);
      setDefineEndereco(true);
      setClicouAdicionarEndereco(false);
      setBairroState(bairro.trim());
    }
  };

  if (clicouAdicionarEndereco) {
    return (
      <ModalAdicionarEndereco
        rua={rua}
        numero={numero}
        bairro={bairro}
        cidade={cidadeSelecionada}
        complemento={complemento}
        handleCidadeChange={handleCidadeChange}
        ruaEstaVazia={ruaEstaVazia}
        numeroEstaVazia={numeroEstaVazia}
        bairroEstaVazia={bairroEstaVazia}
        complementoEstaVazia={complementoEstaVazia}
        handleRuaChange={handleRuaChange}
        handleNumeroChange={handleNumeroChange}
        handleBairroChange={handleBairroChange}
        handleComplementoChange={handleComplementoChange}
        onClick={onClick}
        onClickFecharModal={onClickFecharModal}
      />
    );
  } else {
    if (enderecoDefinido) {
      return (
        <EnderecoCadastrado
          rua={rua}
          numero={numero}
          bairro={bairro}
          cidade={cidadeSelecionada}
          complemento={complemento}
          onClickAtivaModal={onClickAtivaModal}
        />
      );
    } else {
      return (
        <NaoPossuiEnderecoEmFinalizarPedido
          onClickAtivaModal={onClickAtivaModal}
        />
      );
    }
  }
}

export function IsNotEmpty(s: string) {
  return s != "";
}
export function IsEmpty(s: string) {
  return s == "";
}
