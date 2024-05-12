import { ChangeEvent } from "react";
import { PedidoStatus } from "../enums/PedidoStatus";
import pedidoStyles from "../modules/Pedido.module.css";
import { PedidoRequestEditDto } from "../types/PedidoRequestEditDto";
import { PedidoResponseDto } from "../types/PedidoResponseDto";
import { AppUtils } from "../utils/AppUtils";
import { Imagem } from "./Imagem";

interface PedidoProps {
  pedidoResponseDto: PedidoResponseDto;
  pedidoStatusSelect: string | PedidoStatus;
  editaStatus: (p: PedidoResponseDto) => void;
  handlePedidoStatusChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  modoEdicaoAtivo: boolean;
  salvar: (pedido: PedidoRequestEditDto) => void;
}

export function Pedido({
  pedidoResponseDto,
  pedidoStatusSelect,
  handlePedidoStatusChange,
  editaStatus,
  modoEdicaoAtivo,
  salvar,
}: PedidoProps) {
  const pedidoRequestEditDto: PedidoRequestEditDto = {
    id: pedidoResponseDto.id,
    pedidoStatus: pedidoStatusSelect,
    dispositivoToken: pedidoResponseDto.dispositivoToken,
  };

  return (
    <div className={pedidoStyles.container}>
      <div className={pedidoStyles.cima}>
        <h2>id: {pedidoResponseDto.id}</h2>
        <p>id do comprador: {pedidoResponseDto.usuario.id}</p>
        <h4>nome do comprador: {pedidoResponseDto.usuario.nome}</h4>
        <h4>
          valor total: {AppUtils.toMoedaBrasileira(pedidoResponseDto.total)}
        </h4>
        <p>status do pagamento: {pedidoResponseDto.pagamentoStatus}</p>
        <hr />
      </div>

      <div className={pedidoStyles.meio_a_esquerda_container}>
        <div>
          <p>---------Salgados------------</p>
          {pedidoResponseDto.salgados.map((s, index) => (
            <div key={index}>
              <h5>nome do salgado: {s.nome}</h5>
              <Imagem height={120} width={120} imagePath={s.imagem} />
              <p>quantidade: {s.quantidade}</p>
              <p>
                observação:{" "}
                {s.observacao == "" ? "sem observações" : s.observacao}
              </p>
              <div>
                <h4>---Sabores escolhidos---</h4>
                {s.sabores.map((sabor, i) => (
                  <ul key={i}>
                    <li style={{ marginLeft: 30 }}>sabor: {sabor}</li>
                  </ul>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div>
          <p>--------Endereço--------</p>
          <p>rua:{pedidoResponseDto.endereco.rua}</p>
          <p>numero:{pedidoResponseDto.endereco.numero}</p>
          <p>bairro:{pedidoResponseDto.endereco.bairro}</p>

          <p>
            complemento:
            {pedidoResponseDto.endereco.complemento == ""
              ? "Não informado"
              : pedidoResponseDto.endereco.complemento}
          </p>
        </div>

        <div>
          <p>---------Acompanhamentos------------</p>

          {pedidoResponseDto.acompanhamentos.length == 0 ? (
            <h5>Este pedido não possui acompanhamentos</h5>
          ) : (
            <div>
              {pedidoResponseDto.acompanhamentos.map((a, index) => (
                <div key={index}>
                  <h5>nome do salgado: {a.nome}</h5>
                  <p>quantidade: {a.quantidade}</p>
                  <p>descrição: {a.descricao}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className={pedidoStyles.baixo}>
        <hr />

        {modoEdicaoAtivo == true && (
          <div>
            <p>Alterar Status do pedido para: </p>

            <div className={pedidoStyles.edicao_container}>
              <select
                value={pedidoStatusSelect}
                onChange={handlePedidoStatusChange}
              >
                <option value={PedidoStatus[PedidoStatus.AGUARDANDO_PREPARO]}>
                  {PedidoStatus[PedidoStatus.AGUARDANDO_PREPARO]}
                </option>
                <option value={PedidoStatus[PedidoStatus.EM_PREPARO]}>
                  {PedidoStatus[PedidoStatus.EM_PREPARO]}
                </option>
                <option value={PedidoStatus[PedidoStatus.SAIU_PARA_ENTREGA]}>
                  {PedidoStatus[PedidoStatus.SAIU_PARA_ENTREGA]}
                </option>
                <option value={PedidoStatus[PedidoStatus.CHEGOU_NO_ENDERECO]}>
                  {PedidoStatus[PedidoStatus.CHEGOU_NO_ENDERECO]}
                </option>
              </select>
            </div>
          </div>
        )}

        <div className={pedidoStyles.edicao_container}>
          <p>status do pedido: {pedidoResponseDto.status}</p>

          <div className={pedidoStyles.bts}>
            <div onClick={() => editaStatus(pedidoResponseDto)}>
              <Imagem
                imagePath="../../public/edit.png"
                height={40}
                width={40}
              />
            </div>
            <div onClick={() => salvar(pedidoRequestEditDto)}>
              <Imagem
                imagePath="../../public/salvar.png"
                height={40}
                width={40}
              />
            </div>
          </div>
        </div>

        <p>Plataforma: {pedidoResponseDto.plataforma}</p>
        <p>data de criação: {pedidoResponseDto.createdAt}</p>
        <p>token do celular: {pedidoResponseDto.dispositivoToken}</p>
      </div>
    </div>
  );
}
