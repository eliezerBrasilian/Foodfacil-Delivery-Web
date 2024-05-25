import { useEffect, useState } from "react";
import { AppTitulo } from "../components/AppTitulo";
import { CustomLoading } from "../components/CustomLoading";
import { PedidoItem } from "../components/PedidoItem";
import { useBottomBarContext } from "../context/BottomBarContext";
import { usePedidoContext } from "../context/PedidoContext";
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

  return (
    <div className={s.container}>
      <AppTitulo text="Meus Pedidos" />

      <div style={{ padding: 15 }}>
        <h3>Histórico</h3>

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
          <PedidoMainContent pedidos={pedidos} />
        )}
      </div>
    </div>
  );
}

interface PedidoMainContentprops {
  pedidos: PedidoDoUsuarioResponseDto[];
}

export function PedidoMainContent({ pedidos }: PedidoMainContentprops) {
  if (pedidos.length == 0) return <p>Sem pedidos no momento</p>;
  return (
    <div style={{ marginBottom: 70, marginTop: 10 }}>
      {pedidos.map((v, i) => (
        <PedidoItem pedido={v} key={i} />
      ))}
    </div>
  );
}
