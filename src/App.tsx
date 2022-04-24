import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp/SignUp";
import SignIn from "./pages/SignIn/SignIn";
import Homepage from "./pages/Homepage/Homepage";
import { ThemeProvider } from '@mui/material/styles';
import ContainerFullPage from "./Components/ContainerFullPage/ContainerFullPage";
import Header from "./Components/Header/Header";
import { darkTheme, lightTheme } from "./Style/themes";
import { AuthProvider } from "./Contexts/authContexts";
import { useState } from "react";
import Redirect from "./pages/Redirect/Redirect";

function App() {

  const [themeMode, setThemeMode] = useState(true)

  return (
    <AuthProvider>
      <ThemeProvider
        theme={
          themeMode
            ? darkTheme
            : lightTheme
        }>
        <BrowserRouter>
          <ContainerFullPage>
            <>
              <Header state={themeMode} setState={setThemeMode} />
              <Routes>
                <Route path="/" element={<SignIn />} />
                <Route path="/signUp" element={<SignUp />} />
                <Route path="/repository" element={<Homepage />} />
                <Route path="/signin/oauth2/github" element={<Redirect />} />
              </Routes>
            </>
          </ContainerFullPage>
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
