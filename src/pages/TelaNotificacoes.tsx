import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Imagem } from "../components/Imagem";
import { NotificacaoItem } from "../components/NotificacaoItem";
import { VazioComponente } from "../components/VazioComponente";
import { useNotificacaoContext } from "../context/NotificacaoContext";
import { useLarguraAtual } from "../customHooks/useLarguraAtual";
import { LocalStorageKeys } from "../enums/LocalStorageKeys";
import { Rotas } from "../enums/Rotas";
import ts from "../modules/TelaNotificacao.module.css";
import { UploadImageService } from "../services/UploadImageService";
import { ImagemType } from "../types/ImagemType";
import { NotificacaoRequestDTO } from "../types/NotificacaoRequestDTO";

export function TelaNotificacoes() {
  const {
    enviaNotificacao,
    listaTokensDeCelulares,
    listTokensDeCelulares,
    excluir,
  } = useNotificacaoContext();

  const [titulo, setTitulo] = useState("");
  const [corpo, setCorpo] = useState("");
  const [imagem, setImagem] = useState<ImagemType>(null);

  const nav = useNavigate();
  const larguraTotal = useLarguraAtual();

  useEffect(() => {
    var token = localStorage.getItem(LocalStorageKeys.TOKEN);
    if (token == null) {
      nav(Rotas.LOGIN);
    } else {
      listaTokensDeCelulares(
        token,
        (_msgSucesso) => {},
        (msgErro) => {
          window.alert(msgErro);
        }
      );
    }
  }, []);

  const onChangeImagem = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const imagem = event.target.files[0];
      setImagem(imagem);
    }
  };

  const onChangeTitulo = (text: string) => {
    setTitulo(text);
  };
  const onChangeCorpo = (text: string) => {
    setCorpo(text);
  };

  const onErrorOnEnviaNotificacao = (message: string) => {
    if (message == "Access Denied") {
      localStorage.clear();
      nav(Rotas.LOGIN);
    } else {
      window.alert("erro ao enviar notificação: " + message);
    }
  };

  const onClick = async () => {
    var uis = new UploadImageService();

    const imageUrl = await uis.uploadToFirebaseStorage(imagem);

    const notifObj: NotificacaoRequestDTO = {
      titulo: titulo,
      corpo: corpo,
      imagem: imageUrl,
      dados: {},
    };

    var userToken = localStorage.getItem(LocalStorageKeys.TOKEN);

    if (userToken != null) {
      enviaNotificacao(
        notifObj,
        (_msg: string) => {
          window.alert("notificação enviada como sucesso");
        },
        onErrorOnEnviaNotificacao,
        userToken
      );
    }
  };

  return (
    <div className={ts.container}>
      <div>
        <p>Enviar notificação em massa</p>
        <NotificacaoItem
          corpo={corpo}
          imagem={imagem}
          titulo={"Promoção"}
          tituloText={titulo}
          onChangeImagem={onChangeImagem}
          onChangeTituloText={onChangeTitulo}
          onChangeCorpo={onChangeCorpo}
          onClick={onClick}
        />
        {listTokensDeCelulares.length == 0 ? (
          <VazioComponente titulo="Tokens de celulares salvos" />
        ) : (
          <div
            style={{
              marginTop: 40,
            }}
          >
            {listTokensDeCelulares.map((v, index) => (
              <div>
                <Imagem
                  imagePath="bin.png"
                  height={50}
                  width={50}
                  onClick={() =>
                    excluir(
                      v.id,
                      v.token,
                      (_msg) => {
                        alert("excluido com sucesso");
                      },
                      (msg) => {
                        alert(msg);
                      }
                    )
                  }
                />
                <div key={index}>
                  <h4>id: {v.id}</h4>
                  <p
                    style={{
                      fontStyle: "italic",
                      width: larguraTotal <= 500 ? 300 : "auto",
                      overflow: larguraTotal <= 500 ? "scroll" : "auto",
                    }}
                  >
                    token: {v.token}
                  </p>
                  <p>userId: {v.userId}</p>
                  <hr />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
