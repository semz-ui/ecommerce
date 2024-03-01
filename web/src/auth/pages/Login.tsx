import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import MaxWidthWrapper from "../../components/ui/MaxWidthWrapper";
import { Button } from "../../components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "../../components/ui/input";
import { AppDispatch, RootState } from "@/app/store";
import { useToast } from "../../components/ui/use-toast";
import { login, reset } from "@/feature/auth/authSlice";
import { Skeleton } from "../../components/ui/skeleton";

const formSchema = z.object({
  email: z
    .string({
      required_error: "Please select an email to display.",
    })
    .email(),
  password: z.string().min(8, {
    message: "name must be at least 8 characters.",
  }),
});

function Login() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state: RootState) => state.auth
  );
  useEffect(() => {
    if (isError) {
      toast({
        variant: "destructive",
        title: message,
      });
    }

    if (isSuccess) {
      toast({
        variant: "default",
        title: "Success",
        description: "Registeration successfull",
      });
      navigate("/verify-email");
    }
    if (user) {
      navigate("/verify-email");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, dispatch, navigate]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  if (isLoading) {
    return (
      <div className="flex items-center justify-center space-x-4 h-screen">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    );
  }

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    {
      const userData = {
        email: values.email,
        password: values.password,
      };
      dispatch(login(userData));
      console.log(userData, "lk");
    }
  }

  console.log(message, "message");
  return (
    <MaxWidthWrapper className="flex h-screen flex-col items-center">
      <div className="w-full lg:w-1/3 flex flex-col my-20">
        <h1 className="text-center text-5xl mb-10 font-semibold">Sign In</h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="email" {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="........" {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </Form>
      </div>
      <Link to="/register">
        <p>Don't have an account? Sign up</p>
      </Link>
      {message && <p>{message} mess</p>}
    </MaxWidthWrapper>
  );
}

export default Login;
