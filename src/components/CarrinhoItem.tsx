import { useCarrinhoContext } from "../defaultContexts/CarrinhoContextDefault";
import { AppUtils } from "../utils/AppUtils";
import { CarrinhoItemImagem } from "./CarrinhoItemImagem";
import { CarrinhoItensBts } from "./CarrinhoItensBts";
import { Preco } from "./VerCarrinhoBtn";

export enum IdentificadorItem {
  SALGADO,
  ACOMPANHAMENTO,
}

interface CarrinhoItemProps {
  identificador: IdentificadorItem;
  id: string;
  nome: string;
  descricao: string;
  preco: Preco;
  imagemTransparent: string;
  contador: number;
}

export function CarrinhoItem({
  nome,
  descricao,
  preco,
  imagemTransparent,
  contador,
  identificador,
  id,
}: CarrinhoItemProps) {
  const {
    incrementarAcompanhamento,
    incrementar,
    decrementarAcompanhamento,
    decrementar,
  } = useCarrinhoContext();

  const precoCalculado = (preco as number) * contador;

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
        <p style={{ fontSize: 16, fontWeight: "600" }}>{nome}</p>
        <p style={{ fontSize: 13 }}>{descricao}</p>
        <p style={{ fontSize: 14, fontWeight: "600" }}>
          {AppUtils.toMoedaBrasileira(precoCalculado)}
        </p>
      </div>
      <CarrinhoItensBts
        contador={contador}
        incrementar={() => {
          if (identificador == IdentificadorItem.SALGADO) incrementar(id);
          else incrementarAcompanhamento(id);
        }}
        decrementar={() => {
          if (identificador == IdentificadorItem.SALGADO) decrementar(id);
          else decrementarAcompanhamento(id);
        }}
      />
    </div>
  );
}
