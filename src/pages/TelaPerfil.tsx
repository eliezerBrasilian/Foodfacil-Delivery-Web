import { useNavigate } from "react-router-dom";
import { Rotas } from "../enums/Rotas";

import { LocalStorageKeys } from "../enums/LocalStorageKeys";
import s from "../modules/TelaPerfil.module.css";

export function TelaPerfil() {
  const nav = useNavigate();

  var imagemPerfil = localStorage.getItem(LocalStorageKeys.FOTO);
  var nome = localStorage.getItem(LocalStorageKeys.NOME);
  return (
    <div className={s.container}>
      <div className={s.cima}>
        <img
          className={s.foto_perfil}
          src={imagemPerfil == undefined ? "" : imagemPerfil}
        />
        <p>{nome}</p>
      </div>
      <div className={s.item}>
        <img src={"/bin.png"} />
        <p>Dados da conta</p>
      </div>
      <div className={s.item}>
        <img src={"/bin.png"} />
        <p>Meu endereço</p>
      </div>
      <button
        style={{ marginTop: 40 }}
        onClick={() => {
          localStorage.clear();
          nav(Rotas.LOGIN);
        }}
      >
        <p>Sair</p>
      </button>
    </div>
  );
}
