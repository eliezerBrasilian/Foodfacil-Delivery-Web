import { useCarrinhoContext } from "../defaultContexts/CarrinhoContextDefault";
import { CarrinhoItem } from "./CarrinhoItem";

export function CarrinhoItems() {
  const { carrinhoList } = useCarrinhoContext();

  return (
    <div>
      {carrinhoList.map((v, i) => (
        <CarrinhoItem
          key={i}
          nome={v.nome}
          descricao={v.descricao}
          preco={v.preco}
          imagemTransparent={v.imagem}
          contador={1}
        />
      ))}
    </div>
  );
}
