import { SalgadoResumidoResponseDto } from "../types/SalgadoResumidoResponseDto";
import { PedidoItemCima } from "./PedidoItemCima";

interface PedidosItemCimaProps {
  salgados: SalgadoResumidoResponseDto[];
}

export function PedidosItemCima({ salgados }: PedidosItemCimaProps) {
  return (
    <div style={{ padding: 12 }}>
      {salgados.map((v, i) => (
        <PedidoItemCima
          imagem={v.imagem}
          descricao={v.descricao}
          titulo={v.nome}
          key={i}
          podeExibirSeta={i == 0}
        />
      ))}
    </div>
  );
}
