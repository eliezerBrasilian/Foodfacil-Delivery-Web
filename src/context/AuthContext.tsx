import { ReactNode, createContext, useContext } from "react";
import { AuthContextInterface } from "../types/AuthContextInterface.js";
import { UserAuthRequestDto } from "../types/UserAuthRequestDto.js";
import { UserAuthResponseDto } from "../types/UserAuthResponseDto.js";
import { AuthRepository } from "./../repositories/AuthRepository";
import { AuthRequestDto } from "./../types/AuthRequestDto";

const defaultContext: AuthContextInterface = {
  login: (
    _e: string,
    _s: string,
    _onSuccess: (data: UserAuthResponseDto) => void
  ) => {},
  cadastro: (
    _body: AuthRequestDto,
    _onSuccess: (data: UserAuthResponseDto) => void,
    _onError: (msg: string) => void
  ) => {},
  googleSignIn: (
    _userAuthRequestDto: UserAuthRequestDto,
    _onSuccess: (data: UserAuthResponseDto) => void,
    _onError: (msg: string) => void
  ) => {},
};

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
    onSuccess: (data: UserAuthResponseDto) => void
  ) {
    await authRepository.login(email, senha, onSuccess);
  }

  async function cadastro(
    body: AuthRequestDto,
    onSuccess: (data: UserAuthResponseDto) => void,
    onError: (msg: string) => void
  ) {
    await authRepository.cadastro(body, onSuccess, onError);
  }

  async function googleSignIn(
    userAuthRequestDto: UserAuthRequestDto,
    onSuccess: (data: UserAuthResponseDto) => void
  ) {
    await authRepository.googleSignIn(userAuthRequestDto, onSuccess);
  }

  return (
    <AuthContext.Provider
      value={{
        login,
        cadastro,
        googleSignIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
