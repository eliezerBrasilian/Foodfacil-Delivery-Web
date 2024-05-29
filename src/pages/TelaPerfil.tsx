import { useNavigate } from "react-router-dom";
import { Rotas } from "../enums/Rotas";

import { useEffect, useState } from "react";
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

  const [imagemPerfil, setImagemPerifil] = useState("/user.png");
  var nome = localStorage.getItem(LocalStorageKeys.NOME);

  useEffect(() => {
    var _imagemPerfil = localStorage.getItem(LocalStorageKeys.FOTO);

    setImagemPerifil(_imagemPerfil == null ? "/user.png" : _imagemPerfil);
  }, []);

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

      <div
        style={{
          marginTop: 40,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <button
          style={{
            backgroundColor: "#E71D36",
            border: "none",
            width: 100,
            height: 25,
            borderRadius: 11,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => {
            localStorage.clear();
            nav(Rotas.LOGIN);
          }}
        >
          <p style={{ color: "#fff", fontWeight: "bold", fontSize: 12 }}>
            Sair
          </p>
        </button>
      </div>
    </div>
  );
}
