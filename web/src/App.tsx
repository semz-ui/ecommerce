import { ThemeProvider } from "./components/ThemeProvider";
import Router from "./routes/Router";

function App() {
  return (
    <ThemeProvider defaultTheme="system">
      <Router />
    </ThemeProvider>
  );
}

export default App;
