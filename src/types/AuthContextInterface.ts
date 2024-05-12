import { AuthRequestDto } from "./AuthRequestDto";

export interface AuthContextInterface {
  login: (
    email: string,
    senha: string,
    onSuccess: (msg: string) => void
  ) => void;
  cadastro: (
    body: AuthRequestDto,
    onSuccess: (msg: string) => void,
    onError: (msg: string) => void
  ) => void;
}
