import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CustomLoading } from "../components/CustomLoading";
import { Salgado } from "../components/Salgado";
import { useBottomBarContext } from "../context/BottomBarContext";
import { useSaborContext } from "../context/SaborContext";
import { useSalgadosContext } from "../context/SalgadosContext";
import { LocalStorageKeys } from "../enums/LocalStorageKeys";
import { Rotas } from "../enums/Rotas";
import cs from "../modules/Cardapio.module.css";
import { SalgadoResponseDto } from "../types/SalgadoResponseDto";
import { useLarguraAtual } from "./../custom_hooks/useLarguraAtual";

export function TelaCardapio() {
  const { combos, carregado, carregando, getAllSalgados } =
    useSalgadosContext();
  const { handleCardapioBottomBar, activateVisibility } = useBottomBarContext();

  const { getAll, carregado: saborFoiCarregado } = useSaborContext();

  const nav = useNavigate();

  useEffect(() => {
    activateVisibility();
    handleCardapioBottomBar();
  }, []);

  useEffect(() => {
    if (!saborFoiCarregado) {
      getAll();
    }
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

        {carregando ? (
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <CustomLoading />
          </div>
        ) : (
          <TelaCardapioMainContent combos={combos} />
        )}
      </div>
    </div>
  );
}

export interface AppTituloProps {
  text: string;
}

export interface TelaCardapioMainContentProps {
  combos: Array<SalgadoResponseDto>;
}

export function TelaCardapioMainContent({
  combos,
}: TelaCardapioMainContentProps) {
  const nav = useNavigate();
  const larguraTotal = useLarguraAtual();

  if (combos.length == 0)
    return (
      <p style={{ fontSize: 18 }}>
        Não temos combos no momento, mas fique ligado(a)
      </p>
    );
  else
    return (
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
    );
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
