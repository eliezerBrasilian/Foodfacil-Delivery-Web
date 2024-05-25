import { ChangeEvent, useEffect, useState } from "react";
import { CadastrarEnderecoForm } from "../components/CadastrarEnderecoForm";
import { CustomBtn } from "../components/CustomBtn";
import { IsNotEmpty } from "../components/EnderecoEmFinalizarPedido";
import { TopBar } from "../components/TopBar";
import { useEndereco } from "../customHooks/useEndereco";

export function TelaMeuEndereco() {
  const {
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
  } = useEndereco();

  const [edicaoAtiva, setEdicaoAtiva] = useState(false);

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

  const onClick = () => {
    if (
      IsNotEmpty(rua) &&
      IsNotEmpty(numero) &&
      IsNotEmpty(bairro) &&
      IsNotEmpty(complemento)
    ) {
      salvaEndereco(cidadeSelecionada, rua, numero, bairro, complemento);
    }
  };

  useEffect(() => {
    if (bairro !== "") {
      console.log("O endereço foi salvo e o bairro é: ", bairro);
    }
  }, [bairro]);

  return (
    <div style={{ padding: 15, height: "100vh", width: "100vw" }}>
      <TopBar text="Detalhes do meu endereço" />
      {enderecoExiste && !edicaoAtiva ? (
        <div style={{ marginTop: 30 }}>
          <h3 style={{ marginTop: 10 }}>Cidade</h3>
          <p>{cidadeSelecionada}</p>
          <h3 style={{ marginTop: 10 }}>Rua</h3>
          <p>{rua}</p>
          <h3 style={{ marginTop: 10 }}>Número da casa</h3>
          <p>{numero}</p>
          <h3 style={{ marginTop: 10 }}>Bairro</h3>
          <p>{bairro}</p>
          <h3 style={{ marginTop: 10 }}>Complemento</h3>
          <p>{complemento}</p>

          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              marginTop: 70,
            }}
          >
            <CustomBtn
              icon="edit_branca.png"
              text="Editar endereço"
              backgroundColor="#545677"
              onClick={() => {
                setEdicaoAtiva(true);
              }}
            />
          </div>
        </div>
      ) : (
        <CadastrarEnderecoForm
          bairro={bairro}
          cidade={cidadeSelecionada}
          complemento={complemento}
          rua={rua}
          numero={numero}
          handleBairroChange={handleBairroChange}
          handleCidadeChange={handleCidadeChange}
          handleComplementoChange={handleComplementoChange}
          handleNumeroChange={handleNumeroChange}
          handleRuaChange={handleRuaChange}
          onClick={() => {
            onClick();
            setEdicaoAtiva(false);
          }}
        />
      )}
    </div>
  );
}
