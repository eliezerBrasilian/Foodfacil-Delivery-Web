import "./App.css";
import { AcompanhamentoContextProvider } from "./context/AcompanhamentoContext";
import { AuthContextProvider } from "./context/AuthContext";
import { BottomBarContextProvider } from "./context/BottomBarContext";
import { CabecalhoContextProvider } from "./context/CabecalhoContext";
import { CarrinhoContextProvider } from "./context/CarrinhoContext";
import { MetodoPagamentoContextProvider } from "./context/MetodoPagamentoContext";
import { NotificacaoContextProvider } from "./context/NotificacaoContext";
import { PedidoContextProvider } from "./context/PedidoContext";
import { SaborContextProvider } from "./context/SaborContext";
import { SalgadosContextProvider } from "./context/SalgadosContext";
import { TaxaContextProvider } from "./context/TaxaContext";
import { RoutesApp } from "./routes/Routes";
function App() {
  return (
    <AuthContextProvider>
      <CabecalhoContextProvider>
        <BottomBarContextProvider>
          <TaxaContextProvider>
            <SalgadosContextProvider>
              <CarrinhoContextProvider>
                <SaborContextProvider>
                  <AcompanhamentoContextProvider>
                    <PedidoContextProvider>
                      <NotificacaoContextProvider>
                        <MetodoPagamentoContextProvider>
                          <RoutesApp />
                        </MetodoPagamentoContextProvider>
                      </NotificacaoContextProvider>
                    </PedidoContextProvider>
                  </AcompanhamentoContextProvider>
                </SaborContextProvider>
              </CarrinhoContextProvider>
            </SalgadosContextProvider>
          </TaxaContextProvider>
        </BottomBarContextProvider>
      </CabecalhoContextProvider>
    </AuthContextProvider>
  );
}

export default App;
