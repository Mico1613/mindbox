import "./App.scss";
import { MainPage } from "../Pages";
import { createTheme, ThemeProvider } from "@mui/material";

function App() {
  const theme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#ef619387",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <MainPage />
    </ThemeProvider>
  );
}

export default App;
