import { BrowserRouter, Route, Routes } from "react-router-dom";

import { BottomBar } from "../components/BottomBar";
import { Rotas } from "../enums/Rotas";
import { Home } from "../pages/Home";
import { ItemSelecionado } from "../pages/ItemSelecionado";
import { Login } from "../pages/Login";
import { TelaCardapio } from "../pages/TelaCardapio";
import { TelaCarrinhoDeCompras } from "../pages/TelaCarrinhoDeCompras";
import { TelaDadosDaConta } from "../pages/TelaDadosDaConta";
import { TelaDetalhesDoPedido } from "../pages/TelaDetalhesDoPedido";
import { TelaEscolherPagamento } from "../pages/TelaEscolherPagamento";
import { TelaFinalizarPedido } from "../pages/TelaFinalizarPedido";
import { TelaMeuEndereco } from "../pages/TelaMeuEndereco";
import { TelaPedidos } from "../pages/TelaPedidos";
import { TelaPerfil } from "../pages/TelaPerfil";
import { TelaVerChavePix } from "../pages/TelaVerChavePix";

export function RoutesApp() {
  const rotaItemSelecionado = Rotas.TELA_ITEM_SELECIONADO + "/:id";
  const rotaVerChavePix = Rotas.TELA_VER_CHAVE_PIX + "/:chave";
  const rotaDetalhesDoPedido = Rotas.TELA_DETALHES_DO_PEDIDO + "/:id";

  return (
    <BrowserRouter>
      <Routes>
        <Route path={Rotas.LOGIN} element={<Login />} />
        <Route path={Rotas.HOME} element={<Home />} />
        <Route path={Rotas.TELA_CARDAPIO} element={<TelaCardapio />} />
        <Route path={Rotas.TELA_PEDIDOS} element={<TelaPedidos />} />
        <Route path={Rotas.TELA_PERFIL} element={<TelaPerfil />} />
        <Route path={rotaItemSelecionado} element={<ItemSelecionado />} />
        <Route path={Rotas.TELA_CARRINHO} element={<TelaCarrinhoDeCompras />} />
        <Route
          path={Rotas.TELA_FINALIZAR_PEDIDO}
          element={<TelaFinalizarPedido />}
        />
        <Route
          path={Rotas.TELA_ESCOLHER_PAGAMENTO}
          element={<TelaEscolherPagamento />}
        />
        <Route path={rotaVerChavePix} element={<TelaVerChavePix />} />
        <Route path={rotaDetalhesDoPedido} element={<TelaDetalhesDoPedido />} />
        <Route
          path={Rotas.TELA_DADOS_DA_CONTA}
          element={<TelaDadosDaConta />}
        />
        <Route path={Rotas.TELA_MEU_ENDERECO} element={<TelaMeuEndereco />} />
      </Routes>
      <BottomBar />
    </BrowserRouter>
  );
}
