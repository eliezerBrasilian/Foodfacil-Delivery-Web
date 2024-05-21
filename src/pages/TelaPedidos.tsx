import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LocalStorageKeys } from "../enums/LocalStorageKeys";
import { Rotas } from "../enums/Rotas";
import hs from "../modules/Home.module.css";

export function TelaPedidos() {
  const nav = useNavigate();

  useEffect(() => {
    var token = localStorage.getItem(LocalStorageKeys.TOKEN);

    if (token == null) {
      nav(Rotas.LOGIN);
    } else {
      // getAllPedidos(token);
    }
  }, []);

  return (
    <div className={hs.container}>
      <h1 style={{ marginTop: 20 }}>Todos pedidos</h1>

      {/* {pedidos.length == 0 ? (
        <VazioComponente titulo="Pedido" />
      ) : (
        <div style={{ marginTop: 10 }}>
          {pedidos.map((item, index) => (
            <Pedido
              key={index}
              pedidoResponseDto={item}
              pedidoStatusSelect={pedidoStatusSelect}
              handlePedidoStatusChange={handlePedidoStatusChange}
              modoEdicaoAtivo={modoEdicaoAtivo}
              editaStatus={(_item: PedidoResponseDto) => {
                setModoEdicaoAtivo(true);
              }}
             
            />
          ))}
        </div>
      )} */}
    </div>
  );
}
