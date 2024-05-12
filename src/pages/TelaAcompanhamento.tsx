import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAcompanhamentoContext } from "../context/AcompanhamentoContext";
import { LocalStorageKeys } from "../enums/LocalStorageKeys";
import { Rotas } from "../enums/Rotas";
import hs from "../modules/Home.module.css";

function TelaAcompanhamento() {
  const {
    getAllAcompanhamentos,

    carregado,
  } = useAcompanhamentoContext();

  const nav = useNavigate();

  useEffect(() => {
    if (!carregado) {
      getAllAcompanhamentos();
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
      <div>
        <p>Cadastrar acompanhamento:</p>
      </div>

      <h1 style={{ marginTop: 20 }}>Acompanhamentos</h1>
    </div>
  );
}

export { TelaAcompanhamento };
