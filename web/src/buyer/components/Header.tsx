import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useSelector } from "react-redux";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../../components/ui/button";
import { Sun, Moon, MapPin, Search } from "lucide-react";
import { useTheme } from "../../components/ThemeProvider";
import { RootState } from "@/app/store";
import { Input } from "../../components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import Cart from "./Cart";
import MobileHeader from "./MobileHeader";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});
function Header() {
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  console.log(user, "locker");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  const theme = localStorage.getItem("vite-ui-theme");
  const { setTheme } = useTheme();
  useEffect(() => {
    if (user?.verified == false) {
      navigate("/verify-email");
    }
  }, [user]);

  return (
    <div className="w-full max-sm:justify-between px-2 flex items-center py-2 gap-4 bg-teal-800 sticky top-0 z-50">
      <Link to="/">
        <h1 className="font-bold text-2xl">M</h1>
      </Link>
      <div className="max-sm:hidden flex items-center mx-3 gap-x-1">
        <MapPin size={20} color="white" />
        <div className="text-white">
          <p className="text-xs text-gray-400">Deliver to</p>
          <p className="text-base font-semibold">Nigeria</p>
        </div>
      </div>
      <div className="w-5/6 max-sm:hidden flex items-center">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="h-10 flex items-center rounded-none"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel />
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="rounded-none rounded-l h-8 py-3 text-black bg-gray-200">
                        <SelectValue placeholder="All" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="wears">Wears</SelectItem>
                      <SelectItem value="electronics">Electronics</SelectItem>
                      <SelectItem value="books">Books</SelectItem>
                      <SelectItem value="beauty">Beauty</SelectItem>
                      <SelectItem value="sports">Sports</SelectItem>
                      <SelectItem value="workout">Workout</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <Input className="outline-none border-none rounded-none h-3/4 w-full" />
        <Button className="rounded-none rounded-r h-8">
          <Search size={15} />
        </Button>
      </div>
      <div className="max-sm:hidden flex justify-between w-1/6 items-center">
        {user ? (
          <Link to="/profile" className="text-white">
            <p className="text-xs">Hello, {user?.firstName}</p>
            <p className="text-sm font-semibold">Account & Lists</p>
          </Link>
        ) : (
          <Link to="/login" className="text-white">
            <p className="text-xs">Hello, sign in</p>
            <p className="text-sm font-semibold">Account & Lists</p>
          </Link>
        )}
        <div className="flex flex-col items-center justify-center">
          {/* <span className="m-0 text-white text-sm">0</span> */}
          <Cart />
        </div>
        {theme == "light" ? (
          <Moon onClick={() => setTheme("dark")} color="white" />
        ) : (
          <Sun onClick={() => setTheme("light")} />
        )}
      </div>
      <div className="hidden max-sm:flex">
        <MobileHeader />
      </div>
    </div>
  );
}

export default Header;
