import { ReactNode, createContext, useContext } from "react";
import { AuthContextInterface } from "../types/AuthContextInterface.js";
import { AuthRepository } from "./../repositories/AuthRepository";
import { AuthRequestDto } from "./../types/AuthRequestDto";

const defaultContext = {
  login: (_e: string, _s: string, _onSuccess: (t: string) => void) => {},
  cadastro: (
    _body: AuthRequestDto,
    _onSuccess: (msg: string) => void,
    _onError: (msg: string) => void
  ) => {},
} as AuthContextInterface;

const AuthContext = createContext(defaultContext);

export function useAuthContext() {
  return useContext(AuthContext);
}

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthContextProvider({ children }: AuthProviderProps) {
  const authRepository = new AuthRepository();

  async function login(
    email: string,
    senha: string,
    onSuccess: (token: string) => void
  ) {
    await authRepository.login(email, senha, onSuccess);
  }

  async function cadastro(
    body: AuthRequestDto,
    onSuccess: (msg: string) => void,
    onError: (msg: string) => void
  ) {
    await authRepository.cadastro(body, onSuccess, onError);
  }

  return (
    <AuthContext.Provider
      value={{
        login,
        cadastro,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
