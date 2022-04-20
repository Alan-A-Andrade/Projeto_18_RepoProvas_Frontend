import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage/homepage";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from "./Components/Header/Header";

const lightTheme = createTheme({
  palette: {
    primary: {
      main: '#fff',
    },
    secondary: {
      main: '#3F61D7',
    },
  },
})

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
