import { ChangeEvent } from "react";
import { cores } from "../assets/cores";
import { MunicipioInterno } from "../enums/MunicipiosInternos";

interface CadastrarEnderecoFormProps {
  rua: string;
  numero: string;
  bairro: string;
  cidade: string;
  complemento: string;
  handleCidadeChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  handleRuaChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleNumeroChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleBairroChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleComplementoChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
}
export function CadastrarEnderecoForm({
  rua,
  numero,
  bairro,
  cidade,
  complemento,
  handleCidadeChange,
  handleRuaChange,
  handleNumeroChange,
  handleBairroChange,
  handleComplementoChange,
  onClick,
}: CadastrarEnderecoFormProps) {
  return (
    <div style={{ padding: 15 }}>
      <h3 style={{ fontSize: 14 }}>Cadastrar endereço</h3>

      <p style={{ marginTop: 20 }}>Cidade</p>
      <select
        style={{
          border: "1px solid black",
          width: "fit-content",
          padding: 5,
          backgroundColor: cores.rosa,
        }}
        value={cidade}
        onChange={handleCidadeChange}
      >
        <option
          style={{ backgroundColor: "#fff" }}
          value={MunicipioInterno.BRAS_PIRES_PRINCIPAL}
        >
          {MunicipioInterno.BRAS_PIRES_PRINCIPAL}
        </option>
        <option
          style={{ backgroundColor: "#fff" }}
          value={MunicipioInterno.MALACACHETA}
        >
          {MunicipioInterno.MALACACHETA}
        </option>
        <option
          style={{ backgroundColor: "#fff" }}
          value={MunicipioInterno.VARZEA}
        >
          {MunicipioInterno.VARZEA}
        </option>
        <option
          style={{ backgroundColor: "#fff" }}
          value={MunicipioInterno.RIBEIRAO}
        >
          {MunicipioInterno.RIBEIRAO}
        </option>
      </select>

      <p style={{ marginTop: 20 }}>Rua</p>
      {rua == "" && (
        <p style={{ color: cores.btn_vermelho }}>A rua está vazia</p>
      )}
      <input
        style={{
          color: "#000",
          padding: 5,
          marginTop: 5,
          border: "1px solid gray",
        }}
        type="text"
        placeholder="digite o nome da sua rua..."
        value={rua}
        onChange={handleRuaChange}
      />

      <p style={{ marginTop: 20 }}>Número</p>
      {numero == "" && (
        <p style={{ color: cores.btn_vermelho }}>
          O número da sua casa está vazio
        </p>
      )}
      <input
        style={{
          color: "#000",
          padding: 5,
          marginTop: 5,
          border: "1px solid gray",
        }}
        type="number"
        placeholder="digite o numero da sua residência..."
        value={numero}
        onChange={handleNumeroChange}
      />

      <p style={{ marginTop: 20 }}>Bairro</p>
      {bairro == "" && (
        <p style={{ color: cores.btn_vermelho }}>O seu bairro está vazia</p>
      )}
      <input
        style={{
          color: "#000",
          padding: 5,
          marginTop: 5,
          border: "1px solid gray",
        }}
        type="text"
        placeholder="digite o nome do bairro..."
        value={bairro}
        onChange={handleBairroChange}
      />

      <div>
        <p style={{ marginTop: 20 }}>Complemento</p>
        {complemento == "" && (
          <p style={{ color: cores.btn_vermelho }}>
            Por favor adicione um ponto de referência
          </p>
        )}

        <input
          style={{
            color: "#000",
            padding: 5,
            marginTop: 5,
            border: "1px solid gray",
          }}
          type="text"
          placeholder="informe um ponto de referência..."
          value={complemento}
          onChange={handleComplementoChange}
        />
      </div>

      <button
        onClick={onClick}
        style={{
          padding: "7px 15px 7px 15px",
          borderRadius: 10,
          borderStyle: "none",
          backgroundColor: cores.preco,
          color: "#fff",
          marginTop: 30,
        }}
      >
        Salvar endereço
      </button>
    </div>
  );
}
