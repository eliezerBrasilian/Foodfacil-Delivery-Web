import { api } from "../api/client/client";
import { AuthRequestDto } from "../types/AuthRequestDto";
import { UserAuthRequestDto } from "./../types/UserAuthRequestDto";
import { UserAuthResponseDto } from "./../types/UserAuthResponseDto";

export class AuthRepository {
  async googleSignIn(
    userAuthRequestDto: UserAuthRequestDto,
    onSuccess: (data: UserAuthResponseDto) => void
  ) {
    try {
      const response = await api.post("/auth/google-login", userAuthRequestDto);
      console.log("-----------login com google feito");
      console.log(response);
      onSuccess(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async cadastro(
    body: AuthRequestDto,
    onSuccess: (data: UserAuthResponseDto) => void,
    onError: (msg: string) => void
  ) {
    try {
      const resp = await api.post("/auth/sign-up", body);
      const data: UserAuthResponseDto = resp.data;

      onSuccess(data);
    } catch (e: any) {
      var message = e.response.data.message;

      onError(message);
    }
  }

  async login(
    email: string,
    senha: string,
    onSuccess: (data: UserAuthResponseDto) => void
  ) {
    var body = { email: email, password: senha };

    try {
      const resp = await api.post("/auth/login", body);
      const data: UserAuthResponseDto = resp.data;

      onSuccess(data);
    } catch (e: any) {
      var message = e.response.data.message;

      window.alert(message);
    }
  }
}
