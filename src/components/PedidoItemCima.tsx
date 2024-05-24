import { Imagem } from "./Imagem";

interface PedidoItemCimaProps {
  imagem: string;
  titulo: string;
  descricao: string;
  podeExibirSeta: boolean;
}

export function PedidoItemCima({
  imagem,
  titulo,
  descricao,
  podeExibirSeta,
}: PedidoItemCimaProps) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: 40,
        marginBottom: 20,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", columnGap: 19 }}>
        <Imagem height={25} width={25} imagePath={imagem} />
        <div>
          <h2>{titulo}</h2>
          <p>{descricao}</p>
        </div>
      </div>

      {podeExibirSeta && (
        <Imagem height={15} width={15} imagePath={"/setadire_vermelho.png"} />
      )}
    </div>
  );
}
