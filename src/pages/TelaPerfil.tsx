import { useNavigate } from "react-router-dom";
import { Rotas } from "../enums/Rotas";

import { useEffect } from "react";
import { useBottomBarContext } from "../context/BottomBarContext";
import { LocalStorageKeys } from "../enums/LocalStorageKeys";
import s from "../modules/TelaPerfil.module.css";

export function TelaPerfil() {
  const { handlePerfilBottomBar, activateVisibility } = useBottomBarContext();

  const nav = useNavigate();

  useEffect(() => {
    activateVisibility();
    handlePerfilBottomBar();
  }, []);

  var imagemPerfil = localStorage.getItem(LocalStorageKeys.FOTO);
  var nome = localStorage.getItem(LocalStorageKeys.NOME);
  return (
    <div className={s.container}>
      <div className={s.cima}>
        <img
          className={s.foto_perfil}
          src={imagemPerfil == undefined ? "" : imagemPerfil}
        />
        <p className={s.nome}>{nome}</p>
      </div>
      <div
        className={s.item}
        onClick={() => {
          nav(Rotas.TELA_DADOS_DA_CONTA);
        }}
      >
        <img src={"/user_perfil.png"} />
        <p>Dados da conta</p>
      </div>
      <div
        className={s.item}
        onClick={() => {
          nav(Rotas.TELA_MEU_ENDERECO);
        }}
      >
        <img src={"/location.png"} />
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
