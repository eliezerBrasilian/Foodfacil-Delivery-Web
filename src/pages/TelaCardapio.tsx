import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppTitulo } from "../components/AppTitulo";
import { CustomLoading } from "../components/CustomLoading";
import { Salgado } from "../components/Salgado";
import { VerCarrinhoBtn } from "../components/VerCarrinhoBtn";
import { useBottomBarContext } from "../context/BottomBarContext";
import { useSaborContext } from "../context/SaborContext";
import { useLarguraAtual } from "../customHooks/useLarguraAtual";
import { useCarrinhoContext } from "../defaultContexts/CarrinhoContextDefault";
import { useSalgadosContext } from "../defaultContexts/SalgadoContextDefault";
import { LocalStorageKeys } from "../enums/LocalStorageKeys";
import { Rotas } from "../enums/Rotas";
import cs from "../modules/Cardapio.module.css";
import { SalgadoDto } from "../types/SalgadoDto";

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
      getAllSalgados();
    }
  }, []);

  useEffect(() => {
    var token = localStorage.getItem(LocalStorageKeys.TOKEN);
    if (token == null) {
      nav(Rotas.LOGIN);
    }
  }, []);

  const { salgadosList } = useCarrinhoContext();

  return (
    <div className={cs.container} style={{}}>
      <AppTitulo text="Cardápio" />

      <div
        style={{
          padding: 15,
          paddingBottom: salgadosList.length > 0 ? 70 : 0,
        }}
      >
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

export interface TelaCardapioMainContentProps {
  combos: Array<SalgadoDto>;
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
      <div style={{ marginTop: 25, paddingBottom: 100 }}>
        {combos?.map((item, index) => (
          <Salgado
            key={index}
            onClick={() => {
              nav(`${Rotas.TELA_ITEM_SELECIONADO}/${item.id}`);
            }}
            salgadoDto={item}
            ehCelular={larguraTotal <= 500}
          />
        ))}

        <VerCarrinhoBtn />
      </div>
    );
}
