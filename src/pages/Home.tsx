import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HomeCarrousel } from "../components/HomeCarrousel";
import { HomeHeader } from "../components/HomeHeader";
import { HomeSalgado } from "../components/HomeSalgado";
import { VerCarrinhoBtn } from "../components/VerCarrinhoBtn";
import { useBottomBarContext } from "../context/BottomBarContext";
import { useSaborContext } from "../context/SaborContext";
import { useLarguraAtual } from "../customHooks/useLarguraAtual";
import { useAcompanhamentoContext } from "../defaultContexts/AcompanhamentoContextDefault";
import { useSalgadosContext } from "../defaultContexts/SalgadoContextDefault";
import { LocalStorageKeys } from "../enums/LocalStorageKeys";
import { Rotas } from "../enums/Rotas";
import hs from "../modules/Home.module.css";

export function Home() {
  const { getAllSalgados, salgadosEmPromocao, carregado } =
    useSalgadosContext();

  const { getAll, carregado: saborFoiCarregado } = useSaborContext();
  const { getAllAcompanhamentos, carregado: carregadoAcompabhamento } =
    useAcompanhamentoContext();

  const { handleHomeBottomBar, activateVisibility } = useBottomBarContext();

  const nav = useNavigate();
  const larguraAtual = useLarguraAtual();

  // useEffect(() => localStorage.clear());

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
    <div className={hs.container}>
      <HomeHeader />
      <h1 style={{ marginTop: 10, fontSize: 18, marginLeft: 15 }}>Tá no app</h1>
      <HomeCarrousel />

      <h1 style={{ fontSize: 19, marginLeft: 15 }}>Promoções imperdíveis</h1>

      {salgadosEmPromocao.length == 0 ? (
        <p style={{ fontSize: 18, marginLeft: 15 }}>
          Não temos promções no momento, mas fique ligado(a)
        </p>
      ) : (
        <div style={{ marginTop: 25, paddingBottom: 80, marginLeft: 15 }}>
          {salgadosEmPromocao?.map((item, index) => (
            <HomeSalgado
              key={index}
              salgadoDto={item}
              handlePopUpEdicaoVisibilidade={() => {}}
              ehCelular={larguraAtual <= 500}
            />
          ))}
        </div>
      )}
      <VerCarrinhoBtn />
    </div>
  );
}
