import { signInWithPopup } from "firebase/auth";
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
import { auth, provider } from "../firebase/config.js";
import ls from "../modules/Login.module.css";
import { AuthResponseDto } from "../types/AuthResponseDto.js";
import { AuthRequestDto } from "./../types/AuthRequestDto";

export function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  const [loginAtivo, setLoginAtivo] = useState(false);
  const nav = useNavigate();

  const { removeVisibility } = useCabecalhoContext();

  const { login, cadastro, googleSignIn } = useAuthContext();

  const larguraTotal = useLarguraAtual();

  useEffect(() => {
    removeVisibility();
  }, []);

  useEffect(() => {
    var token = localStorage.getItem(LocalStorageKeys.TOKEN);
    if (token != null) nav(Rotas.HOME);
  }, []);

  const onSuccess = (data: AuthResponseDto) => {
    localStorage.setItem(LocalStorageKeys.TOKEN, data.token);
    localStorage.setItem(LocalStorageKeys.NOME, data.name);
    localStorage.setItem(LocalStorageKeys.FOTO, data.profilePicture);
    localStorage.setItem(LocalStorageKeys.USER_ID, data.userId);
    localStorage.setItem(LocalStorageKeys.EMAIL, data.email);
    localStorage.setItem(LocalStorageKeys.CREATED_AT, data.createdAt);
    setLoading(false);
    nav(Rotas.HOME);
  };

  const loginComGoogle = () => {
    setLoading(true);
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;

        if (
          user.email != null &&
          user.displayName != null &&
          user.photoURL != null
        ) {
          const authUser: AuthRequestDto = {
            email: user.email,
            name: user.displayName,
            password: "12345",
            profilePicture: user.photoURL,
            role: "USER",
          };
          googleSignIn(authUser, onSuccess, (msg: string) => {
            alert(msg);
          });
        }
      })
      .catch((e) => alert(e));
  };

  if (larguraTotal <= 500) {
    return (
      <div className={ls.container}>
        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <Imagem imagePath="/top_logo.png" height={150} width={150} />
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
                placeholder="Digite seu nome"
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
              placeholder="Digite seu email"
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
              placeholder={loginAtivo ? "DIgite sua senha" : "Crie uma senha"}
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
              onClick={loginComGoogle}
              loading={loading}
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
              style={{
                width: "100%",
                textAlign: "center",
              }}
            >
              Já possui login? <strong>Entrar</strong>
            </p>
          )}
        </form>
      </div>
    );
  } else
    return (
      <div className={ls.container}>
        <div className={ls.quadrado}>
          <div className={ls.a_esquerda}>
            <h3 className={ls.titulo}>
              {loginAtivo ? "Entrar" : "Cadastrar"}{" "}
            </h3>
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
                    placeholder="Digite seu nome"
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
                  placeholder="Digite seu email"
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
                  placeholder={
                    loginAtivo ? "DIgite sua senha" : "Crie uma senha"
                  }
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
                  text={
                    loginAtivo ? "Acessar minha conta" : "Criar minha conta"
                  }
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
                  text={
                    loginAtivo ? "Entrar com Google" : "Cadastrar com Google"
                  }
                  onClick={loginComGoogle}
                  loading={loading}
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

          <div className={ls.a_direita}>
            <Imagem imagePath="foodfacillogo_splash.png" />
          </div>
        </div>
      </div>
    );
}
