import { BrowserRouter, Route, Routes } from "react-router-dom";

import { BottomBar } from "../components/BottomBar";
import { Rotas } from "../enums/Rotas";
import { Home } from "../pages/Home";
import { ItemSelecionado } from "../pages/ItemSelecionado";
import { Login } from "../pages/Login";
import { TelaCardapio } from "../pages/TelaCardapio";
import { TelaNotificacoes } from "../pages/TelaNotificacoes";
import { TelaPedidos } from "./../pages/TelaPedidos";

export function RoutesApp() {
  const rotaItemSelecionado = Rotas.TELA_ITEM_SELECIONADO + "/:id";
  return (
    <BrowserRouter>
      <Routes>
        <Route path={Rotas.LOGIN} element={<Login />} />
        <Route path={Rotas.HOME} element={<Home />} />
        <Route path={Rotas.TELA_CARDAPIO} element={<TelaCardapio />} />
        <Route path={Rotas.TELA_PEDIDOS} element={<TelaPedidos />} />
        <Route path={Rotas.TELA_PERFIL} element={<TelaNotificacoes />} />
        <Route path={rotaItemSelecionado} element={<ItemSelecionado />} />
      </Routes>
      <BottomBar />
    </BrowserRouter>
  );
}
