import { Sun, Moon } from "lucide-react";
import { useTheme } from "../../components/ThemeProvider";
import { Link } from "react-router-dom";

function SideNav() {
  const theme = localStorage.getItem("vite-ui-theme");
  console.log(theme);
  const { setTheme } = useTheme();
  return (
    <div className="w-[250px] min-h-screen bg-teal-800 flex flex-col items-center gap-20 pt-10">
      <Link to="/">
        <h1 className="text-2xl font-semibold">Home</h1>
      </Link>
      <Link to="/products">
        <h1 className="text-2xl font-semibold">Products</h1>
      </Link>
      {theme == "light" ? (
        <Moon onClick={() => setTheme("dark")} />
      ) : (
        <Sun onClick={() => setTheme("light")} />
      )}
    </div>
  );
}

export default SideNav;
