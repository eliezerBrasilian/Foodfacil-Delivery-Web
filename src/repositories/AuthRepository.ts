import { api } from "../api/client/client";
import { AuthRequestDto } from "../types/AuthRequestDto";
import { AuthResponseDto } from "../types/AuthResponseDto";
import { UserAuthRequestDto } from "./../types/UserAuthRequestDto";

export class AuthRepository {
  async googleSignIn(
    userAuthRequestDto: UserAuthRequestDto,
    onSuccess: (data: AuthResponseDto) => void
  ) {
    try {
      const response: any = await api.post(
        "/auth/google-login",
        userAuthRequestDto
      );
      console.log("-----------login com google feito");
      console.log(response);

      onSuccess(response.data as AuthResponseDto);
    } catch (error) {
      console.log(error);
    }
  }

  async cadastro(
    body: AuthRequestDto,
    onSuccess: (data: AuthResponseDto) => void,
    onError: (msg: string) => void
  ) {
    try {
      const resp = await api.post("/auth/sign-up", body);
      const data: AuthResponseDto = resp.data;

      onSuccess(data);
    } catch (e: any) {
      var message = e.response.data.message;

      onError(message);
    }
  }

  async login(
    email: string,
    senha: string,
    onSuccess: (data: AuthResponseDto) => void
  ) {
    var body = { email: email, password: senha };

    try {
      const resp = await api.post("/auth/login", body);
      const data: AuthResponseDto = resp.data;

      onSuccess(data);
    } catch (e: any) {
      var message = e.response.data.message;

      window.alert(message);
    }
  }
}
