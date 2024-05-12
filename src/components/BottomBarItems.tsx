import { NavLink } from "react-router-dom";
import { Rotas } from "../enums/Rotas";
import bbis from "../modules/BottomBarItems.module.css";
import { BottomBarItem } from "./BottomBarItem";

interface BottomBarItemsPros {
  navHomeIsActive: boolean;
  navCardapioIsActive: boolean;
  navPedidosIsActive: boolean;
  navCarrinhoIsActive: boolean;
  navPerfilIsActive: boolean;
}

export function BottomBarItems({
  navHomeIsActive,
  navCardapioIsActive,
  navPedidosIsActive,
  navPerfilIsActive,
}: BottomBarItemsPros) {
  return (
    <div className={bbis.container}>
      <div className={bbis.menuItems}>
        <NavLink to={"/"}>
          {
            <BottomBarItem
              titulo={"Inicio"}
              isActive={navHomeIsActive}
              icone_padrao="home_icone_padrao.png"
              icone_selecionado="home_icone_selecionado.png"
            />
          }
        </NavLink>

        <NavLink to={Rotas.TELA_CARDAPIO}>
          {
            <BottomBarItem
              titulo={"Cardápio"}
              isActive={navCardapioIsActive}
              icone_padrao="cardapio_icone_padrao.png"
              icone_selecionado="cardapio_icone_selecionado.png"
            />
          }
        </NavLink>

        <NavLink to={Rotas.TELA_PEDIDOS}>
          {
            <BottomBarItem
              titulo={"Pedidos"}
              isActive={navPedidosIsActive}
              icone_padrao="pedido_icone_padrao.png"
              icone_selecionado="pedido_icone_selecionado.png"
            />
          }
        </NavLink>

        <NavLink to={Rotas.TELA_PERFIL}>
          {
            <BottomBarItem
              titulo={"Perfil"}
              isActive={navPerfilIsActive}
              icone_padrao="perfil_icone_padrao.png"
              icone_selecionado="perfil_icone_selecionado.png"
            />
          }
        </NavLink>
      </div>
    </div>
  );
}
