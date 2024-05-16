import { cores } from "../assets/cores";
import { Imagem } from "./Imagem";

interface CarrinhoItemImagemProps {
  imagemTransparent: string;
}

export function CarrinhoItemImagem({
  imagemTransparent,
}: CarrinhoItemImagemProps) {
  const imagemT = 40;
  return (
    <div
      style={{
        backgroundColor: cores.rosa,
        width: "fit-content",
        padding: 15,
        borderRadius: 10,
      }}
    >
      <Imagem imagePath={imagemTransparent} height={imagemT} width={imagemT} />
    </div>
  );
}
