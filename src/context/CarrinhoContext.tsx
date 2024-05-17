import { ReactNode, useState } from "react";
import { CarrinhoContext } from "../defaultContexts/CarrinhoContextDefault";
import { AcompanhamentoDto } from "../types/AcompanhamentoDto";
import { SalgadoDto } from "../types/SalgadoDto";

interface CarrinhoContextProps {
  children: ReactNode;
}

export function CarrinhoContextProvider({ children }: CarrinhoContextProps) {
  const [salgadosList, setsalgadosList] = useState<SalgadoDto[]>([]);
  const [acompanhamentoList, setAcompanhamentoList] = useState<
    AcompanhamentoDto[]
  >([]);

  function incrementar(id: string) {
    const index = salgadosList.findIndex((a) => a.id == id);

    if (index != -1) {
      const oldQuantidade = salgadosList[index].quantidade;

      setsalgadosList((oldStateList) => {
        var aux: SalgadoDto[] = oldStateList.map((v) => v);
        aux[index].quantidade = oldQuantidade + 1;

        return aux;
      });
    }
  }
  function decrementar(id: string) {
    const index = salgadosList.findIndex((a) => a.id == id);

    if (index != -1) {
      const oldQuantidade = salgadosList[index].quantidade;

      if (oldQuantidade == 1) {
        setsalgadosList((oldStateList) => {
          var aux = oldStateList.filter((v) => v.id != id);

          return aux;
        });
        //
      } else {
        setsalgadosList((oldStateList) => {
          var aux: SalgadoDto[] = oldStateList.map((v) => v);
          aux[index].quantidade = oldQuantidade - 1;

          return aux;
        });
      }
    }
  }

  function addSalgado(salgado: SalgadoDto) {
    const index = salgadosList.findIndex((s) => s.id == salgado.id);

    if (index == -1) {
      setsalgadosList((oldStateList) => {
        var aux: SalgadoDto[] = oldStateList.map((v) => v);
        salgado.quantidade = 1;
        aux.push(salgado);

        return aux;
      });
    } else {
      setsalgadosList((oldStateList) => {
        var aux: SalgadoDto[] = oldStateList.map((v) => v);
        aux[index] = salgado;

        return aux;
      });
    }
  }
  function addAcompanhamento(acomp: AcompanhamentoDto) {
    const index = salgadosList.findIndex((s) => s.id == acomp.id);

    if (index == -1) {
      setAcompanhamentoList((oldStateList) => {
        var aux: AcompanhamentoDto[] = oldStateList.map((v) => v);
        acomp.quantidade = 1;
        aux.push(acomp);

        return aux;
      });
    } else {
      setAcompanhamentoList((oldStateList) => {
        var aux: AcompanhamentoDto[] = oldStateList.map((v) => v);
        aux[index] = acomp;

        return aux;
      });
    }
  }

  function incrementarAcompanhamento(id: string) {
    const index = acompanhamentoList.findIndex((a) => a.id == id);

    if (index != -1) {
      const oldQuantidade = acompanhamentoList[index].quantidade;

      setAcompanhamentoList((oldStateList) => {
        var aux: AcompanhamentoDto[] = oldStateList.map((v) => v);
        aux[index].quantidade = oldQuantidade + 1;

        return aux;
      });
    }
  }
  function decrementarAcompanhamento(id: string) {
    const index = acompanhamentoList.findIndex((a) => a.id == id);

    if (index != -1) {
      const oldQuantidade = acompanhamentoList[index].quantidade;

      if (oldQuantidade == 1) {
        setAcompanhamentoList((oldStateList) => {
          var aux: AcompanhamentoDto[] = oldStateList.filter((v) => v.id != id);

          return aux;
        });
        //
      } else {
        setAcompanhamentoList((oldStateList) => {
          var aux: AcompanhamentoDto[] = oldStateList.map((v) => v);
          aux[index].quantidade = oldQuantidade - 1;

          return aux;
        });
      }
    }
  }

  console.log("------- salgadosList no carrinho---------");
  console.log(salgadosList);
  console.log("------- acompanhamentoList no carrinho---------");
  console.log(acompanhamentoList);
  return (
    <CarrinhoContext.Provider
      value={{
        salgadosList,
        acompanhamentoList,
        incrementar,
        decrementar,
        addSalgado,
        addAcompanhamento,
        incrementarAcompanhamento,
        decrementarAcompanhamento,
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
}
