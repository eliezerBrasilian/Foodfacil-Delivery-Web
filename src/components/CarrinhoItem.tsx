import { CarrinhoItemImagem } from "./CarrinhoItemImagem";
import { CarrinhoItensBts } from "./CarrinhoItensBts";
import { Preco } from "./VerCarrinhoBtn";

interface CarrinhoItemProps {
  nome: string;
  descricao: string;
  preco: Preco;
  imagemTransparent: string;
  contador: number;
  incrementar?: () => void;
  decrementar?: () => void;
}

export function CarrinhoItem({
  nome,
  descricao,
  preco,
  imagemTransparent,
  contador,
}: CarrinhoItemProps) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        columnGap: 10,
        marginBottom: 10,
      }}
    >
      <CarrinhoItemImagem imagemTransparent={imagemTransparent} />
      <div>
        <p>{nome}</p>
        <p>{descricao}</p>
        <p>{preco}</p>
      </div>
      <CarrinhoItensBts contador={contador} />
    </div>
  );
}
