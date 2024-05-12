import "./App.css";
import { AcompanhamentoContextProvider } from "./context/AcompanhamentoContext";
import { AuthContextProvider } from "./context/AuthContext";
import { BottomBarContextProvider } from "./context/BottomBarContext";
import { CabecalhoContextProvider } from "./context/CabecalhoContext";
import { NotificacaoContextProvider } from "./context/NotificacaoContext";
import { PedidoContextProvider } from "./context/PedidoContext";
import { SalgadosContextProvider } from "./context/SalgadosContext";
import { RoutesApp } from "./routes/Routes";
function App() {
  return (
    <AuthContextProvider>
      <CabecalhoContextProvider>
        <BottomBarContextProvider>
          <SalgadosContextProvider>
            <AcompanhamentoContextProvider>
              <PedidoContextProvider>
                <NotificacaoContextProvider>
                  <RoutesApp />
                </NotificacaoContextProvider>
              </PedidoContextProvider>
            </AcompanhamentoContextProvider>
          </SalgadosContextProvider>
        </BottomBarContextProvider>
      </CabecalhoContextProvider>
    </AuthContextProvider>
  );
}

export default App;
