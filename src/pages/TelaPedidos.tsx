import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppTitulo } from "../components/AppTitulo";
import { CustomBtn } from "../components/CustomBtn";
import { CustomLoading } from "../components/CustomLoading";
import { Imagem } from "../components/Imagem";
import { PedidoItem } from "../components/PedidoItem";
import { useBottomBarContext } from "../context/BottomBarContext";
import { usePedidoContext } from "../context/PedidoContext";
import { Rotas } from "../enums/Rotas";
import s from "../modules/TelaPedido.module.css";
import { PedidoDoUsuarioResponseDto } from "../types/PedidoDoUsuarioResponseDto";

export function TelaPedidos() {
  const [carregando, _setCarregando] = useState(false);
  const { getAllPedidos, pedidos } = usePedidoContext();

  const { handlePedidosBottomBar, activateVisibility } = useBottomBarContext();

  useEffect(() => {
    activateVisibility();
    handlePedidosBottomBar();
  }, []);

  useEffect(() => {
    getAllPedidos();

    // Set interval to fetch data every 2 seconds
    const intervalId = setInterval(getAllPedidos, 3000);

    // Cleanup function to clear the interval
    return () => clearInterval(intervalId);
  }, []);

  const nav = useNavigate();

  return (
    <div className={s.container}>
      <AppTitulo text="Meus Pedidos" />

      <div style={{ padding: 15 }}>
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
          <PedidoMainContent
            pedidos={pedidos}
            verCardapioClick={() => {
              nav(Rotas.TELA_CARDAPIO);
            }}
          />
        )}
      </div>
    </div>
  );
}

interface PedidoMainContentprops {
  pedidos: PedidoDoUsuarioResponseDto[];
  verCardapioClick: () => void;
}

export function PedidoMainContent({
  pedidos,
  verCardapioClick,
}: PedidoMainContentprops) {
  if (pedidos.length == 0)
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          rowGap: 10,
          marginTop: 120,
        }}
      >
        <Imagem height={160} width={160} imagePath="/sem_pedidos_image.png" />
        <h3>Você ainda não realizou um pedido!</h3>
        <p style={{ textAlign: "center" }}>
          Bora Pedir? Acesse o cardápio para ver as opções disponíveis
        </p>
        <CustomBtn text="Ver cardápio" width="90%" onClick={verCardapioClick} />
      </div>
    );
  return (
    <div style={{ marginBottom: 60 }}>
      <h3 style={{ marginBottom: 10 }}>Histórico</h3>
      {pedidos.map((v, i) => (
        <PedidoItem pedido={v} key={i} />
      ))}
    </div>
  );
}
