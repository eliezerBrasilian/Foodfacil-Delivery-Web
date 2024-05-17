import { useCarrinhoContext } from "../defaultContexts/CarrinhoContextDefault";
import { CarrinhoItem, IdentificadorItem } from "./CarrinhoItem";

export function CarrinhoItems() {
  const { salgadosList, acompanhamentoList } = useCarrinhoContext();

  return (
    <div>
      {salgadosList.map((v, i) => (
        <CarrinhoItem
          key={i}
          nome={v.nome}
          descricao={v.descricao}
          preco={v.preco}
          imagemTransparent={v.imagem}
          contador={v.quantidade}
          identificador={IdentificadorItem.SALGADO}
          id={v.id}
        />
      ))}
      <div style={{ marginTop: 10 }} />
      {acompanhamentoList.map((v, i) => (
        <CarrinhoItem
          key={i}
          nome={v.nome}
          descricao={v.descricao}
          preco={v.preco}
          imagemTransparent={v.imagem}
          contador={v.quantidade}
          identificador={IdentificadorItem.ACOMPANHAMENTO}
          id={v.id}
        />
      ))}
    </div>
  );
}
