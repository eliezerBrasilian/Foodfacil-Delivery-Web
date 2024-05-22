import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthBtn } from "../components/AuthBtn.js";
import { GoogleSignInBtn } from "../components/GoogleSignInBtn.js";
import { Imagem } from "../components/Imagem.js";
import { useAuthContext } from "../context/AuthContext.jsx";
import { useCabecalhoContext } from "../context/CabecalhoContext.js";
import { useLarguraAtual } from "../customHooks/useLarguraAtual.js";
import { LocalStorageKeys } from "../enums/LocalStorageKeys";
import { Rotas } from "../enums/Rotas.js";
import ls from "../modules/Login.module.css";
import { UserAuthResponseDto } from "../types/UserAuthResponseDto.js";
import { AuthRequestDto } from "./../types/AuthRequestDto";

export function Login() {
  const [email, setEmail] = useState("testenilson@foodfacil.site");
  const [senha, setSenha] = useState("12345");

  const [loginAtivo, setLoginAtivo] = useState(false);
  const nav = useNavigate();

  const { removeVisibility } = useCabecalhoContext();

  const { login, cadastro } = useAuthContext();

  const larguraTotal = useLarguraAtual();

  useEffect(() => {
    removeVisibility();
  }, []);

  useEffect(() => {
    var token = localStorage.getItem(LocalStorageKeys.TOKEN);
    if (token != null) nav(Rotas.HOME);
  }, []);

  const onSuccess = (data: UserAuthResponseDto) => {
    localStorage.setItem(LocalStorageKeys.TOKEN, data.token);
    localStorage.setItem(LocalStorageKeys.USER_ID, data.userId);

    nav(Rotas.HOME);
  };
  if (larguraTotal <= 500) {
    return (
      <div className={ls.container}>
        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <Imagem imagePath="/top_logo.png" />
        </div>

        <h3 className={ls.titulo}>{loginAtivo ? "Entrar" : "Cadastrar"} </h3>
        <p className={ls.subtitulo}>
          {loginAtivo
            ? "Acesse já sua conta no Foodfacil - delivery"
            : "Faça seu cadastro no Foodfacil - delivery"}
        </p>
        <form>
          {!loginAtivo && (
            <div className={ls.inputContainer}>
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

          <div className={ls.inputContainer}>
            <p>Email</p>
            <input
              type="text"
              id="fname"
              name="fname"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className={ls.inputContainer}>
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
              style={
                larguraTotal <= 500
                  ? {
                      width: "100%",
                      textAlign: "center",
                    }
                  : {}
              }
            >
              Não possui login? <strong>Cadastrar</strong>
            </p>
          ) : (
            <p
              className={ls.ja_possui_login}
              onClick={() => setLoginAtivo(!loginAtivo)}
              style={
                larguraTotal <= 500
                  ? {
                      width: "100%",
                      textAlign: "center",
                    }
                  : {}
              }
            >
              Já possui login? <strong>Entrar</strong>
            </p>
          )}
        </form>
      </div>
    );
  } else
    return (
      <div
        className={ls.container}
        style={{
          padding: larguraTotal <= 500 ? 15 : 0,
          paddingLeft: larguraTotal > 500 ? 80 : 0,
        }}
      >
        <div className={ls.a_esquerda}>
          <h3>{loginAtivo ? "Entrar" : "Cadastrar"} </h3>
          <p>
            {loginAtivo
              ? "Acesse já sua conta no Foodfacil - delivery"
              : "Faça seu cadastro no Foodfacil - delivery"}
          </p>
          <form
            style={
              larguraTotal <= 500
                ? {
                    display: "flex",
                    alignItems: "center",
                  }
                : {}
            }
          >
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

            <div
              className={ls.btns}
              style={
                larguraTotal <= 500
                  ? {
                      display: "flex",
                      width: "100%",
                      justifyContent: "center",
                      alignItems: "center",
                    }
                  : {}
              }
            >
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
                style={
                  larguraTotal <= 500
                    ? {
                        width: "100%",
                        textAlign: "center",
                      }
                    : {}
                }
              >
                Não possui login? <strong>Cadastrar</strong>
              </p>
            ) : (
              <p
                className={ls.ja_possui_login}
                onClick={() => setLoginAtivo(!loginAtivo)}
                style={
                  larguraTotal <= 500
                    ? {
                        width: "100%",
                        textAlign: "center",
                      }
                    : {}
                }
              >
                Já possui login? <strong>Entrar</strong>
              </p>
            )}
          </form>
        </div>

        {larguraTotal > 500 && (
          <div className={ls.a_direita}>
            <Imagem imagePath="foodfacillogo_splash.png" />
          </div>
        )}
      </div>
    );
}
