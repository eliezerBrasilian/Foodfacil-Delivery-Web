import ReactLoading from "react-loading";
import { cores } from "../assets/cores";

interface CustomLoadingProps {
  tam?: number;
  cor?: string;
}

export function CustomLoading({
  tam = 70,
  cor = cores.font_ativa,
}: CustomLoadingProps) {
  return <ReactLoading type={"spin"} color={cor} height={tam} width={tam} />;
}
