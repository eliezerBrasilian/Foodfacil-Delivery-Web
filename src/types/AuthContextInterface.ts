import { AuthRequestDto } from "./AuthRequestDto";
import { AuthResponseDto } from "./AuthResponseDto";

export interface AuthContextInterface {
  login: (
    email: string,
    senha: string,
    onSuccess: (data: AuthResponseDto) => void
  ) => void;
  cadastro: (
    body: AuthRequestDto,
    onSuccess: (data: AuthResponseDto) => void,
    onError: (msg: string) => void
  ) => void;

  googleSignIn: (
    userAuthRequestDto: AuthRequestDto,
    onSuccess: (data: AuthResponseDto) => void,
    onError: (msg: string) => void
  ) => void;
}
