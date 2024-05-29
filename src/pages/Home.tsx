import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HomeCarrousel } from "../components/HomeCarrousel";
import { HomeHeader } from "../components/HomeHeader";
import { HomeSalgado } from "../components/HomeSalgado";
import { VerCarrinhoBtn } from "../components/VerCarrinhoBtn";
import { useBottomBarContext } from "../context/BottomBarContext";
import { useSaborContext } from "../context/SaborContext";
import { useAcompanhamentoContext } from "../defaultContexts/AcompanhamentoContextDefault";
import { useCarrinhoContext } from "../defaultContexts/CarrinhoContextDefault";
import { useSalgadosContext } from "../defaultContexts/SalgadoContextDefault";
import { LocalStorageKeys } from "../enums/LocalStorageKeys";
import { Rotas } from "../enums/Rotas";
import hs from "../modules/Home.module.css";

export function Home() {
  const { getAllSalgados, carregado, maisPedidos } = useSalgadosContext();

  const { getAll, carregado: saborFoiCarregado } = useSaborContext();
  const { getAllAcompanhamentos, carregado: carregadoAcompabhamento } =
    useAcompanhamentoContext();

  const { handleHomeBottomBar, activateVisibility } = useBottomBarContext();

  const nav = useNavigate();

  const { salgadosList } = useCarrinhoContext();

  useEffect(() => {
    activateVisibility();
    handleHomeBottomBar();
  }, []);

  useEffect(() => {
    if (!carregado) {
      getAllSalgados();
    }
  }, []);

  useEffect(() => {
    if (!saborFoiCarregado) {
      getAll();
    }
  }, []);

  useEffect(() => {
    if (!carregadoAcompabhamento) {
      getAllAcompanhamentos();
    }
  }, []);

  useEffect(() => {
    var token = localStorage.getItem(LocalStorageKeys.TOKEN);
    if (token == null) {
      nav(Rotas.LOGIN);
    }
  }, []);

  return (
    <div
      className={hs.container}
      style={{
        marginBottom: salgadosList.length > 0 ? 90 : 0,
      }}
    >
      <HomeHeader />
      <h1>Tá no site</h1>
      <HomeCarrousel />

      {/* <h1>Promoções imperdíveis</h1>

      {salgadosEmPromocao.length == 0 ? (
        <p>Não temos promoções no momento, mas fique ligado(a)</p>
      ) : (
        <div
          style={{
            marginTop: 15,
            paddingBottom: 80,
            paddingLeft: 10,
            paddingRight: 10,
          }}
        >
          {salgadosEmPromocao?.map((item, index) => (
            <HomeSalgado
              key={index}
              salgadoDto={item}
              handlePopUpEdicaoVisibilidade={() => {}}
            />
          ))}
        </div>
      )} */}
      <h1 style={{ marginTop: 20 }}>Mais pedidos</h1>

      {maisPedidos.length == 0 ? (
        <p>Não temos promoções no momento, mas fique ligado(a)</p>
      ) : (
        <div
          style={{
            marginTop: 15,
            paddingLeft: 10,
            paddingRight: 10,
          }}
        >
          {maisPedidos?.map((item, index) => (
            <HomeSalgado
              key={index}
              salgadoDto={item}
              handlePopUpEdicaoVisibilidade={() => {
                nav(`${Rotas.TELA_ITEM_SELECIONADO}/${item.id}`);
              }}
            />
          ))}
        </div>
      )}

      <VerCarrinhoBtn />
    </div>
  );
}
