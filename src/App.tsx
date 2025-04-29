import React from "react";
import { BrowserRouter } from "react-router-dom";
import styled from "styled-components";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AppRoutes from "./routes";
import GlobalStyle from "./styles/GlobalStyle";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
`;

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <AppContainer>
        <Header />
        <MainContent>
          <AppRoutes />
        </MainContent>
        <Footer />
      </AppContainer>
    </BrowserRouter>
  );
}

export default App;
