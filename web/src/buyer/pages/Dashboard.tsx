import Slide from "../components/Slide";
import MaxWidthWrapper from "../../components/ui/MaxWidthWrapper";
import Product from "../components/Product";
import { datas } from "@/utils/data";

function Dashboard() {
  return (
    <MaxWidthWrapper>
      <Slide />
      <div className="flex gap-10 max-md:flex-wrap">
        {datas.slice(0, 2).map((item: any) => (
          <Product key={item.id} data={item} />
        ))}
      </div>
      <div className="flex gap-10 my-10 max-md:flex-wrap">
        {datas.slice(2, 5).map((item: any) => (
          <Product key={item.id} data={item} />
        ))}
      </div>
      <div className="flex gap-10 items-center justify-center max-md:flex-wrap">
        {datas.slice(5).map((item: any) => (
          <Product key={item.id} data={item} />
        ))}
      </div>
    </MaxWidthWrapper>
  );
}

export default Dashboard;
