import { api } from "../api/client/client";
import { AuthRequestDto } from "../types/AuthRequestDto";

export class AuthRepository {
  async cadastro(
    body: AuthRequestDto,
    onSuccess: (msg: string) => void,
    onError: (msg: string) => void
  ) {
    try {
      const resp = await api.post("/auth/sign-up", body);
      console.log(resp);

      var token = resp.data.token;
      onSuccess(token);
    } catch (e: any) {
      var message = e.response.data.message;

      onError(message);
    }
  }

  async login(
    email: string,
    senha: string,
    onSuccess: (token: string) => void
  ) {
    var body = { email: email, password: senha };

    try {
      const resp = await api.post("/auth/login", body);
      console.log(resp);

      var token = resp.data.token;
      onSuccess(token);
    } catch (e: any) {
      var message = e.response.data.message;

      window.alert(message);
    }
  }
}
