import { useEffect, useState } from "react";

export function useLarguraAtual() {
  const [larguraAtual, setLarguraAtual] = useState(window.innerWidth);

  useEffect(() => {
    const atualizarLargura = () => {
      setLarguraAtual(window.innerWidth);
    };

    window.addEventListener("resize", atualizarLargura);

    return () => {
      window.removeEventListener("resize", atualizarLargura);
    };
  }, []); // Executa apenas uma vez no início

  return larguraAtual;
}
