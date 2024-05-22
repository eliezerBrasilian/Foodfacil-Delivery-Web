import { AuthRequestDto } from "./AuthRequestDto";
import { UserAuthRequestDto } from "./UserAuthRequestDto";
import { UserAuthResponseDto } from "./UserAuthResponseDto";

export interface AuthContextInterface {
  login: (
    email: string,
    senha: string,
    onSuccess: (data: UserAuthResponseDto) => void
  ) => void;
  cadastro: (
    body: AuthRequestDto,
    onSuccess: (data: UserAuthResponseDto) => void,
    onError: (msg: string) => void
  ) => void;

  googleSignIn: (
    userAuthRequestDto: UserAuthRequestDto,
    onSuccess: (data: UserAuthResponseDto) => void,
    onError: (msg: string) => void
  ) => void;
}
