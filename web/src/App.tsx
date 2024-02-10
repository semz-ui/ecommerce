import { ThemeProvider } from "./components/ThemeProvider";
import BuyerRouter from "./BuyerRouter";
import Router from "./Router";

function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <Router />
    </ThemeProvider>
  );
}

export default App;
