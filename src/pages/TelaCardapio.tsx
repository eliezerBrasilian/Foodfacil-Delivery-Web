import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Salgado } from "../components/Salgado";
import { useBottomBarContext } from "../context/BottomBarContext";
import { useSalgadosContext } from "../context/SalgadosContext";
import { LocalStorageKeys } from "../enums/LocalStorageKeys";
import { Rotas } from "../enums/Rotas";
import cs from "../modules/Cardapio.module.css";
import { useLarguraAtual } from "./../custom_hooks/useLarguraAtual";

export function TelaCardapio() {
  const { combos, carregado, getAllSalgados } = useSalgadosContext();
  const { handleCardapioBottomBar, activateVisibility } = useBottomBarContext();

  const nav = useNavigate();
  const larguraTotal = useLarguraAtual();

  useEffect(() => {
    activateVisibility();
    handleCardapioBottomBar();
  }, []);

  useEffect(() => {
    if (!carregado) {
      getAllSalgados((msg) => {
        alert(msg);
      });
    }
  }, []);

  useEffect(() => {
    var token = localStorage.getItem(LocalStorageKeys.TOKEN);
    if (token == null) {
      nav(Rotas.LOGIN);
    }
  }, []);

  return (
    <div className={cs.container}>
      <AppTitulo text="Cardápio" />

      <div style={{ padding: 15 }}>
        <h3>COMBOS</h3>
        {combos.length == 0 ? (
          <p style={{ fontSize: 18 }}>
            Não temos combos no momento, mas fique ligado(a)
          </p>
        ) : (
          <div style={{ marginTop: 25, marginBottom: 50 }}>
            {combos?.map((item, index) => (
              <Salgado
                key={index}
                onClick={() => {
                  nav(`${Rotas.TELA_ITEM_SELECIONADO}/${item.id}`);
                }}
                salgadoResponseDto={item}
                ehCelular={larguraTotal <= 500}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export interface AppTituloProps {
  text: string;
}

export function AppTitulo({ text }: AppTituloProps) {
  return (
    <div
      style={{
        backgroundColor: "#f1f1f1",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: 100,
      }}
    >
      <p style={{ color: "#FF0303" }}>{text}</p>
    </div>
  );
}
