import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { login, reset, sendMail, verifyUser } from "@/feature/auth/authSlice";
import { Skeleton } from "../../components/ui/skeleton";

const formSchema = z.object({
  token: z.string().min(6, {
    message: "name must be at least 6 characters.",
  }),
});

function VerifyEmail() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state: RootState) => state.auth
  );
  const [timeLeft, setTimeLeft] = useState(10); // Initial time in seconds
  const [count, setCount] = useState(false);
  const [count1, setCount1] = useState(false);

  const getCode = () => {
    dispatch(sendMail());
  };

  const handleStart = () => {
    console.log("start");
    getCode();
    if (!count) {
      setCount(true);
      setCount1(true);
      // Set up interval to decrement timeLeft every second
      const intervalId = setInterval(() => {
        setTimeLeft((prevTimeLeft) =>
          prevTimeLeft > 0 ? prevTimeLeft - 1 : 0
        );
      }, 1000);

      setTimeout(() => {
        setCount(false);
      }, 10000);
      return () => {
        clearInterval(intervalId);
      };
    } else {
      setCount(false);
    }
  };
  const handleRestart = () => {
    console.log("restart");
    getCode();
    setTimeLeft(10); // Reset time
    setCount(false); // Stop current interval
  };

  // Timer display component
  const TimerDisplay = ({ timeLeft }: any) => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return (
      <div>
        {minutes}:{seconds.toString().padStart(2, "0")}
      </div>
    );
  };
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
      navigate("/");
    }
    if (user?.verified == true) {
      navigate("/");
    }
    if (!user) {
      navigate("/login");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, dispatch, navigate]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      token: "",
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
        token: values.token,
      };
      dispatch(verifyUser(userData));
    }
  }

  return (
    <MaxWidthWrapper className="flex h-screen flex-col items-center">
      <div className="w-full lg:w-1/3 flex flex-col my-36">
        <h1 className="text-center text-5xl mb-10 font-semibold">
          Verify your Email
        </h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="token"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enter code sent to your email</FormLabel>
                  <FormControl>
                    <Input placeholder="******" {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Verify
            </Button>
          </form>
        </Form>
      </div>
      {count1 === false && (
        <Button onClick={() => handleStart()}>Send token to mail</Button>
      )}
      {timeLeft == 0 && count === false && (
        <Button onClick={() => handleRestart()}>Send token to mail</Button>
      )}
      {timeLeft < 9 && <TimerDisplay timeLeft={timeLeft} />}
      {count === true && <p>Check your mail please!</p>}
    </MaxWidthWrapper>
  );
}

export default VerifyEmail;
