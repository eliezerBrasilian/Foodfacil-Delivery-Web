import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CustomLoading } from "../components/CustomLoading";
import { EnderecoEmFinalizarPedido } from "../components/EnderecoEmFinalizarPedido";
import { FinalizarPedidoBtn } from "../components/FinalizarPedidoBtn";
import { ItemsSelecionados } from "../components/ItemsSelecionados";
import { Linha } from "../components/Linha";
import { MetodoDePagamentoEmFinalizarPedido } from "../components/MetodoDePagamentoEmFinalizarPedido";
import { ResumoDoPedido } from "../components/ResumoDoPedido";
import { TopBar } from "../components/TopBar";
import { usePedidoContext } from "../context/PedidoContext";
import { useCarrinhoContext } from "../defaultContexts/CarrinhoContextDefault";
import { useMetodoPagamentoContext } from "../defaultContexts/MetodoPagamentoContextDefault";
import { LocalStorageKeys } from "../enums/LocalStorageKeys";
import { Rotas } from "../enums/Rotas";
import s from "../modules/TelaFinalizarPedido.module.css";
import { PedidoService } from "../services/PedidoService";

export function TelaFinalizarPedido() {
  const { salgadosList, acompanhamentoList } = useCarrinhoContext();
  const { metodoEscolhido, saldo } = useMetodoPagamentoContext();
  const { criar } = usePedidoContext();
  // const totalCarrinho = usePrecoTotalCarrinho();
  // const { taxa } = useTaxaContext();

  //const total = totalCarrinho + taxa;
  const total = 1;

  const [loading, setLoading] = useState(false);
  const cidade = localStorage.getItem(LocalStorageKeys.CIDADE);

  const nav = useNavigate();

  const handleClickFinalizarPedido = () => {
    setLoading(true);
    var pedidoService = new PedidoService();

    pedidoService.build(
      salgadosList,
      acompanhamentoList,
      metodoEscolhido,
      total,
      saldo
    );

    var pedidoProcessado = pedidoService.getPedidoProcessado();

    if (cidade != null) {
      if (pedidoProcessado != null) {
        criar(pedidoProcessado, (chavePix) => {
          console.log("chave pix");
          console.log(chavePix);
          setLoading(false);
          nav(Rotas.TELA_VER_CHAVE_PIX + "/" + chavePix);
        });
      }
    } else {
      setLoading(false);
      window.alert("Adicione seu endereço !");
    }
  };

  return (
    <div className={s.container} style={{ position: "relative" }}>
      <TopBar text="Finalizar pedido" />
      <div style={{ marginTop: 20 }} />
      <ItemsSelecionados />
      <p style={{ marginTop: 20, marginBottom: 20 }}>
        Tempo estimado de entrega: <strong>15 a 30 minutos</strong>
      </p>
      <Linha borderBottomColor="gray" borderBottomWidth={0.4} />
      <ResumoDoPedido />
      <EnderecoEmFinalizarPedido />
      <MetodoDePagamentoEmFinalizarPedido />
      {!loading && <FinalizarPedidoBtn onClick={handleClickFinalizarPedido} />}
      {loading && <TelaDeLoadingAPorcima />}
    </div>
  );
}

export function TelaDeLoadingAPorcima() {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        backgroundColor: "rgba(240, 240, 240, 0.7)",
        width: "100%",
        height: "100%",
        zIndex: 2,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CustomLoading />
    </div>
  );
}
