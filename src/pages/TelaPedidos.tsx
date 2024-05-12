import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pedido } from "../components/Pedido";
import { VazioComponente } from "../components/VazioComponente";
import { usePedidoContext } from "../context/PedidoContext";
import { LocalStorageKeys } from "../enums/LocalStorageKeys";
import { PedidoStatus } from "../enums/PedidoStatus";
import { Rotas } from "../enums/Rotas";
import hs from "../modules/Home.module.css";
import { PedidoRequestEditDto } from "../types/PedidoRequestEditDto";
import { PedidoResponseDto } from "../types/PedidoResponseDto";

export function TelaPedidos() {
  const { getAllPedidos, pedidos, editarPedido } = usePedidoContext();

  const [modoEdicaoAtivo, setModoEdicaoAtivo] = useState(false);
  const [pedidoStatusSelect, setPedidoStatus] = useState<PedidoStatus | string>(
    PedidoStatus[PedidoStatus.AGUARDANDO_PREPARO]
  );

  const nav = useNavigate();

  useEffect(() => {
    var token = localStorage.getItem(LocalStorageKeys.TOKEN);

    if (token == null) {
      nav(Rotas.LOGIN);
    } else {
      getAllPedidos(token, onError);
    }
  }, []);

  const onError = (message: string) => {
    if (message == "Access Denied") {
      localStorage.clear();
      nav(Rotas.LOGIN);
    }
  };

  const handlePedidoStatusChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setPedidoStatus(selectedValue);
  };

  const handleSalvarEdicao = (pedido: PedidoRequestEditDto) => {
    var token = localStorage.getItem(LocalStorageKeys.TOKEN);

    if (token != null) {
      editarPedido(pedido, token, () => {
        window.alert("editado com sucesso");
        setModoEdicaoAtivo(false);
      });
    } else {
      localStorage.clear();
      nav(Rotas.LOGIN);
    }
  };

  return (
    <div className={hs.container}>
      <h1 style={{ marginTop: 20 }}>Todos pedidos</h1>

      {pedidos.length == 0 ? (
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
              salvar={handleSalvarEdicao}
            />
          ))}
        </div>
      )}
    </div>
  );
}
