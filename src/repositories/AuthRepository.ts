import { api } from "../api/client/client";
import { AuthRequestDto } from "../types/AuthRequestDto";
import { UserAuthResponseDto } from "./../types/UserAuthResponseDto";

export class AuthRepository {
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
