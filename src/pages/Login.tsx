import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthBtn } from "../components/AuthBtn.js";
import { GoogleSignInBtn } from "../components/GoogleSignInBtn.js";
import { Imagem } from "../components/Imagem.js";
import { useAuthContext } from "../context/AuthContext.jsx";
import { useCabecalhoContext } from "../context/CabecalhoContext.js";
import { LocalStorageKeys } from "../enums/LocalStorageKeys";
import { Rotas } from "../enums/Rotas.js";
import ls from "../modules/Login.module.css";
import { AuthRequestDto } from "./../types/AuthRequestDto";

export function Login() {
  const [email, setEmail] = useState("testenilson@foodfacil.site");
  const [senha, setSenha] = useState("12345");

  const [loginAtivo, setLoginAtivo] = useState(false);
  const nav = useNavigate();

  const { removeVisibility } = useCabecalhoContext();

  const { login, cadastro } = useAuthContext();

  useEffect(() => {
    removeVisibility();
  }, []);

  useEffect(() => {
    var token = localStorage.getItem(LocalStorageKeys.TOKEN);
    if (token != null) nav(Rotas.HOME);
  }, []);

  const onSuccess = (token: string) => {
    localStorage.setItem(LocalStorageKeys.TOKEN, token);
    nav(Rotas.HOME);
  };

  return (
    <div className={ls.container}>
      <div className={ls.a_esquerda}>
        <h3>{loginAtivo ? "Entrar" : "Cadastrar"} </h3>
        <p>
          {loginAtivo
            ? "Acesse já sua conta no Foodfacil - delivery"
            : "Faça seu cadastro no Foodfacil - delivery"}
        </p>
        <form>
          {!loginAtivo && (
            <div>
              <p>Nome</p>
              <input
                type="text"
                id="fname"
                name="fname"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          )}

          <div>
            <p>Email</p>
            <input
              type="text"
              id="fname"
              name="fname"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <p>{loginAtivo ? "Digite sua senha" : "Crie sua senha"}</p>
            <input
              type="text"
              id="lname"
              name="lname"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>

          <div className={ls.btns}>
            <AuthBtn
              text={loginAtivo ? "Acessar minha conta" : "Criar minha conta"}
              onClick={() => {
                const body: AuthRequestDto = {
                  email: email,
                  name: "testenilso",
                  password: senha,
                  profilePicture: "",
                  role: "USER",
                };

                if (loginAtivo) {
                  login(email, senha, onSuccess);
                } else {
                  cadastro(body, onSuccess, (_msg) => {
                    alert(_msg);
                  });
                }
              }}
            />
            <GoogleSignInBtn
              text={loginAtivo ? "Entrar com Google" : "Cadastrar com Google"}
              onClick={() => {}}
            />
          </div>

          {loginAtivo ? (
            <p
              className={ls.ja_possui_login}
              onClick={() => setLoginAtivo(!loginAtivo)}
            >
              Não possui login? <strong>Cadastrar</strong>
            </p>
          ) : (
            <p
              className={ls.ja_possui_login}
              onClick={() => setLoginAtivo(!loginAtivo)}
            >
              Já possui login? <strong>Entrar</strong>
            </p>
          )}

          {/* <input type="submit" value="Acessar" /> */}
        </form>
      </div>

      <div className={ls.a_direita}>
        <Imagem imagePath="foodfacillogo_splash.png" />
      </div>
    </div>
  );
}
