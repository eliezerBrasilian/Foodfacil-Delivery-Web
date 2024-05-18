import { cores } from "../assets/cores";
import { Imagem } from "./Imagem";
import { Linha } from "./Linha";

interface NaoPossuiEnderecoEmFinalizarPedidoProps {
  onClickAtivaModal: () => void;
}

export function NaoPossuiEnderecoEmFinalizarPedido({
  onClickAtivaModal,
}: NaoPossuiEnderecoEmFinalizarPedidoProps) {
  const imgTam = 15;
  return (
    <div>
      <div style={{ marginTop: 20 }} />
      <Linha borderBottomColor="gray" borderBottomWidth={0.4} />
      <div style={{ marginTop: 20 }} />
      <p>Você ainda não possui um endereço de entrega realize seu cadastro!</p>
      <div
        onClick={onClickAtivaModal}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          columnGap: 10,
          marginTop: 20,
        }}
      >
        <Imagem height={imgTam} width={imgTam} imagePath="/adc_endereco.png" />
        <p
          style={{
            color: cores.btn_vermelho,
            fontSize: 15,
            fontWeight: "600",
          }}
        >
          Adicionar Endereço de Entrega
        </p>
      </div>
      <div style={{ marginTop: 20 }} />
      <Linha borderBottomColor="gray" borderBottomWidth={0.4} />
    </div>
  );
}
