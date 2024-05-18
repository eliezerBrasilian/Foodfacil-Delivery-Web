import { useCarrinhoContext } from "../defaultContexts/CarrinhoContextDefault";
import { Linha } from "./Linha";

export function ItemsSelecionados() {
  const { salgadosList, acompanhamentoList } = useCarrinhoContext();

  return (
    <div>
      {salgadosList.map((v) => (
        <ItemSelecionado item={v} key={v.id} />
      ))}

      {acompanhamentoList.map((v) => (
        <ItemSelecionado item={v} key={v.id} />
      ))}
    </div>
  );
}

interface ItemSelecionadoProps {
  item: any;
}
export function ItemSelecionado({ item }: ItemSelecionadoProps) {
  const imgTam = 80;

  const naoExisteObservacao =
    item.observacao == "" || item.observacao == undefined;

  return (
    <div>
      {/* cima */}
      <div
        style={{
          marginTop: 10,
          display: "flex",
          alignItems: "center",
          columnGap: 10,
          backgroundColor: "#F8F6F6",
          padding: 10,
          borderRadius: 10,
          marginBottom: 5,
        }}
      >
        <img
          src={
            item.imagemQuadrada == undefined ? item.imagem : item.imagemQuadrada
          }
          style={{ height: imgTam, width: imgTam, borderRadius: 10 }}
        />

        <div>
          <h5>{item.nome}</h5>
          <p>{item.descricao}</p>
        </div>
      </div>
      {/* baixo */}
      <div>
        {naoExisteObservacao ? null : (
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "flex-end",
            }}
          >
            <div
              style={{
                width: "fit-content",
                padding: 8,
                backgroundColor: "#0B8900",
                borderRadius: 10,
              }}
            >
              <p style={{ color: "#fff", fontSize: 11 }}>Possui observação</p>
            </div>
          </div>
        )}
        <Linha borderBottomColor="gray" borderBottomWidth={0.4} />
      </div>
    </div>
  );
}
