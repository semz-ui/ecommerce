import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";

function Product({ data }: any) {
  const navigate = useNavigate();
  const onNav = (data: String) => {
    navigate("/products", {
      state: {
        data: data,
      },
    });
  };
  return (
    // <div className=" w-full flex">
    <Card className="rounded-sm w-full flex flex-col items-center justify-between">
      <CardHeader>
        <CardTitle>
          <p className="text-center">{data.title}</p>
        </CardTitle>
        <CardDescription>
          <img src={data.image} className="w-[200px] " />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>{data.title}</p>
      </CardContent>
      <CardFooter>
        <div onClick={() => onNav(data.title)}>
          <p className="cursor-pointer hover:bg-slate-200 p-2 rounded-sm">
            Check It Out
          </p>
        </div>
      </CardFooter>
    </Card>
    // </div>
  );
}

export default Product;
