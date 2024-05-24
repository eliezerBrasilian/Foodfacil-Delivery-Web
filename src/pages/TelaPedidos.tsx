import { useEffect, useState } from "react";
import { AppTitulo } from "../components/AppTitulo";
import { CustomLoading } from "../components/CustomLoading";
import { PedidoItem } from "../components/PedidoItem";
import { useBottomBarContext } from "../context/BottomBarContext";
import { usePedidoContext } from "../context/PedidoContext";
import s from "../modules/TelaPedido.module.css";
import { PedidoDoUsuarioResponseDto } from "../types/PedidoDoUsuarioResponseDto";
import { PedidoStatus } from "../types/PedidoStatus";

export function TelaPedidos() {
  const [carregando, _setCarregando] = useState(false);
  const { getAllPedidos, pedidos } = usePedidoContext();

  const { handlePedidosBottomBar, activateVisibility } = useBottomBarContext();

  // useEffect(() => localStorage.clear());

  useEffect(() => {
    activateVisibility();
    handlePedidosBottomBar();
  }, []);

  useEffect(() => {
    getAllPedidos();
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

interface PedidoStatusResultProps {
  text: string;
  icone: string;
}

export function getPedidoStatusResult(
  pedidoStatus: PedidoStatus
): PedidoStatusResultProps {
  if (pedidoStatus == PedidoStatus.FINALIZADO) {
    return {
      text: "Seu já está pronto :)",
      icone: "/pedido_finalizado.png",
    };
  } else if (pedidoStatus == PedidoStatus.SAIU_PARA_ENTREGA) {
    return {
      text: "Seu pedido saiu pra entrega",
      icone: "/pedido_rotaentrega.png",
    };
  } else if (pedidoStatus == PedidoStatus.CHEGOU_NO_ENDERECO) {
    return {
      text: "Seu pedido chegou no seu endereço",
      icone: "/pagamento_naoconfirmado.png",
    };
  } else if (pedidoStatus == PedidoStatus.AGUARDANDO_PREPARO) {
    return {
      text: "Já vamos preparar seu pedido, aguarde...",
      icone: "/esperando.png",
    };
  } else {
    return {
      text: "Seu pedido está sendo prepararado",
      icone: "/cooking.png",
    };
  }
}

/*
  FINALIZADO = "FINALIZADO",
    SAIU_PARA_ENTREGA = "SAIU_PARA_ENTREGA",
     CHEGOU_NO_ENDERECO = "CHEGOU_NO_ENDERECO",
  AGUARDANDO_PREPARO = "AGUARDANDO_PREPARO",
  EM_PREPARO = "EM_PREPARO",


 
  */
