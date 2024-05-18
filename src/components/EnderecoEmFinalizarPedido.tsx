import { ChangeEvent, useEffect, useState } from "react";

import { LocalStorageKeys } from "../enums/LocalStorageKeys";
import { MunicipioInterno } from "../enums/MunicipiosInternos";

import Modal from "react-modal";
import { cores } from "../assets/cores";
import { Imagem } from "./Imagem";
import { ModalAdicionarEndereco } from "./ModalAdicionarEndereco";
import { NaoPossuiEnderecoEmFinalizarPedido } from "./NaoPossuiEnderecoEmFinalizarPedido";
import { useTaxaContext } from "../context/TaxaContext";
Modal.setAppElement("#root");

export function EnderecoEmFinalizarPedido() {
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
      <NaoPossuiEnderecoEmFinalizarPedido
        onClickAtivaModal={onClickAtivaModal}
      />;
    }
  }
}
interface EnderecoCadastradoProps {
  rua: string;
  bairro: string;
  cidade: string;
  numero: string;
  complemento: string;
  onClickAtivaModal: () => void;
}
export function EnderecoCadastrado({
  rua,
  bairro,
  cidade,
  numero,
  complemento,
  onClickAtivaModal,
}: EnderecoCadastradoProps) {
  const localizacaoTam = 20;
  return (
    <div style={{ marginTop: 25 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h4>Entregar no endereço</h4>
        <p
          onClick={onClickAtivaModal}
          style={{ fontSize: 13, color: cores.btn_vermelho }}
        >
          Trocar
        </p>
      </div>

      <div
        style={{
          marginTop: 20,
          border: "1px solid red",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingLeft: 15,
          paddingRight: 15,
          paddingTop: 10,
          paddingBottom: 10,
          borderRadius: 10,
        }}
      >
        <div style={{ display: "flex", columnGap: 10, alignItems: "center" }}>
          <Imagem
            imagePath="/localizacao_amarela.png"
            height={localizacaoTam}
            width={localizacaoTam}
          />
          <div>
            <h4>
              Rua {rua}, {numero}
            </h4>
            <p>
              {bairro}, {cidade} - MG
            </p>
            <p>{complemento}</p>
          </div>
        </div>

        <Imagem
          imagePath="/check_amarelo.png"
          height={localizacaoTam}
          width={localizacaoTam}
        />
      </div>
    </div>
  );
}

function IsNotEmpty(s: string) {
  return s != "";
}
function IsEmpty(s: string) {
  return s == "";
}
