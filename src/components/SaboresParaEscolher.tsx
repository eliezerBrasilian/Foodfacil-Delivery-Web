import { SaborResponseDto } from "../types/SaborResponseDto";
import { SaborComponent } from "./SaborComponent";

interface SaboresParaEscolherProps {
  lista: SaborResponseDto[];
  saboresEscolhidos: string[];
  onClick: (nome: string) => void;
}
export function SaboresParaEscolher({
  lista,
  saboresEscolhidos,
  onClick,
}: // handleIsChecked,

SaboresParaEscolherProps) {
  return (
    <div style={{ padding: 15 }}>
      {lista.map((sab) => (
        <SaborComponent
          nome={sab.nome}
          key={sab.id}
          onClick={onClick}
          isChecked={saboresEscolhidos.includes(sab.nome)}
        />
      ))}
    </div>
  );
}
