import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HomeCarrousel } from "../components/HomeCarrousel";
import { HomeHeader } from "../components/HomeHeader";
import { HomeSalgado } from "../components/HomeSalgado";
import { VazioComponente } from "../components/VazioComponente";
import { useSalgadosContext } from "../context/SalgadosContext";
import { LocalStorageKeys } from "../enums/LocalStorageKeys";
import { Rotas } from "../enums/Rotas";
import hs from "../modules/Home.module.css";
import { AppUtils } from "../utils/AppUtils";
import { useLarguraAtual } from "./../custom_hooks/useLarguraAtual";

export function Home() {
  const { getAllSalgados, salgados, carregado } = useSalgadosContext();

  const nav = useNavigate();
  const larguraAtual = useLarguraAtual();

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
      <p style={{ fontSize: 18 }}>
        Não temos promções no momento, mas fique ligado(a)
      </p>
      {salgados.length == 0 ? (
        <VazioComponente titulo="Salgado" />
      ) : (
        <div style={{ marginTop: 25, marginBottom: 50 }}>
          {salgados?.map((item, index) => (
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
