import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HomeCarrousel } from "../components/HomeCarrousel";
import { HomeHeader } from "../components/HomeHeader";
import { HomeSalgado } from "../components/HomeSalgado";
import { useBottomBarContext } from "../context/BottomBarContext";
import { useSaborContext } from "../context/SaborContext";
import { useSalgadosContext } from "../context/SalgadosContext";
import { LocalStorageKeys } from "../enums/LocalStorageKeys";
import { Rotas } from "../enums/Rotas";
import hs from "../modules/Home.module.css";
import { AppUtils } from "../utils/AppUtils";
import { useLarguraAtual } from "./../custom_hooks/useLarguraAtual";

export function Home() {
  const { getAllSalgados, salgadosEmPromocao, carregado } =
    useSalgadosContext();

  const { getAll, carregado: saborFoiCarregado } = useSaborContext();

  const { handleHomeBottomBar, activateVisibility } = useBottomBarContext();

  const nav = useNavigate();
  const larguraAtual = useLarguraAtual();

  // useEffect(() => localStorage.clear());

  // const onError = (message: string) => {
  //   if (message == "Access Denied") {
  //     window.alert("Acesso negado !");
  //     localStorage.clear();
  //     nav(Rotas.LOGIN);
  //   }

  //   if (message == "AxiosError: Network Error") {
  //     window.alert("Erro ao se conectar com o servidor!");
  //     localStorage.clear();
  //     nav(Rotas.LOGIN);
  //   }
  // };

  useEffect(() => {
    activateVisibility();
    handleHomeBottomBar();
  }, []);

  useEffect(() => {
    if (!carregado) {
      getAllSalgados((msg) =>
        AppUtils.trataErro(msg, () => {
          localStorage.clear();
          nav(Rotas.LOGIN);
        })
      );
    }
  }, []);

  useEffect(() => {
    if (!saborFoiCarregado) {
      getAll();
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
      <h1 style={{ marginTop: 10, fontSize: 18 }}>Tá no app</h1>
      <HomeCarrousel />

      <h1 style={{ fontSize: 19 }}>Promoções imperdíveis</h1>

      {salgadosEmPromocao.length == 0 ? (
        <p style={{ fontSize: 18 }}>
          Não temos promções no momento, mas fique ligado(a)
        </p>
      ) : (
        <div style={{ marginTop: 25, marginBottom: 50 }}>
          {salgadosEmPromocao?.map((item, index) => (
            <HomeSalgado
              key={index}
              salgadoResponseDto={item}
              handlePopUpEdicaoVisibilidade={() => {}}
              ehCelular={larguraAtual <= 500}
            />
          ))}
        </div>
      )}
    </div>
  );
}
