import { useAcompanhamentoContext } from "../defaultContexts/AcompanhamentoContextDefault";
import { useCarrinhoContext } from "../defaultContexts/CarrinhoContextDefault";
import s from "../modules/Complementos.module.css";
import { AcompanhamentoDto } from "../types/AcompanhamentoDto";
import { AppUtils } from "../utils/AppUtils";
import { Imagem } from "./Imagem";

export function Complementos() {
  const { acompanhamentos } = useAcompanhamentoContext();
  const { acompanhamentoList } = useCarrinhoContext();

  if (acompanhamentoList.length == acompanhamentos.length) return null;
  return (
    <div>
      <p style={{ marginTop: 10 }}>Compre também</p>
      <ComplementosList />
    </div>
  );
}

function ComplementosList() {
  const { acompanhamentos } = useAcompanhamentoContext();
  const { addAcompanhamento, acompanhamentoList } = useCarrinhoContext();

  return (
    <div style={{ display: "flex", columnGap: 5, marginTop: 15 }}>
      {acompanhamentos.map((v, i) => (
        <ComplementoItem
          key={i}
          item={v}
          adicionar={addAcompanhamento}
          jaEstaAdicionado={
            acompanhamentoList.findIndex((al) => al.id == v.id) != -1
          }
        />
      ))}
    </div>
  );
}

interface ComplementoItemProps {
  item: AcompanhamentoDto;
  adicionar: (pedidoObj: AcompanhamentoDto) => void;
  jaEstaAdicionado: boolean;
}

function ComplementoItem({
  item,
  adicionar,
  jaEstaAdicionado,
}: ComplementoItemProps) {
  if (!jaEstaAdicionado)
    return (
      <div>
        <div className={s.cima}>
          <img className={s.imagem} src={item.imagem} alt="Central" />
          <div className={s.circle} onClick={() => adicionar(item)}>
            <Imagem imagePath="/ad_vermelho.png" height={20} width={20} />
          </div>
        </div>
        <div>
          <p style={{ fontWeight: "600" }}>
            {AppUtils.toMoedaBrasileira(item.preco)}
          </p>
          <p style={{ color: "#606060" }}>{item.nome}</p>
          <p style={{ color: "#606060" }}>{item.descricao}</p>
        </div>
      </div>
    );
  return null;
}
