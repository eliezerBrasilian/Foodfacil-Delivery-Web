import { cores } from "../assets/cores";
import { Imagem } from "./Imagem";
import { PixViewProps } from "./PixView";

export function DinheiroView({ selecionado, onClick }: PixViewProps) {
  return (
    <div
      onClick={onClick}
      style={{
        display: "flex",
        columnGap: 20,
        alignItems: "center",
        width: "100%",
        border: "1px solid gray",
        padding: "7px 15px 7px 15px",
        borderRadius: 10,
        borderColor: selecionado ? cores.btn_vermelho : "gray",
      }}
    >
      <Imagem imagePath="/cedula_dinheiro.png" height={20} width={20} />
      <div>
        <p>Dinheiro</p>
        <p style={{ color: "gray" }}>Entregue ao entregador</p>
      </div>
    </div>
  );
}
