import ReactLoading from "react-loading";
import { cores } from "../assets/cores";

export function CustomLoading() {
  return (
    <ReactLoading
      type={"spin"}
      color={cores.font_ativa}
      height={70}
      width={70}
    />
  );
}
