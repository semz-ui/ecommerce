import { useLocation } from "react-router-dom";
import MaxWidthWrapper from "../../components/ui/MaxWidthWrapper";
import { cn } from "@/components/lib/utils";
import { Button } from "@/components/ui/button";
import { allProductsData } from "@/utils/allProductsData";
import { useDispatch } from "react-redux";
import { addToCart } from "@/feature/cart/cartSlice";

function AllProducts() {
  interface Item {
    id: string;
    details: string;
    image: string;
    price: number;
  }
  const dispatch = useDispatch();
  const handleAddToCart = (data: Item) => {
    dispatch(
      addToCart({
        id: data.id,
        details: data.details,
        price: data.price,
        image: data.image,
        quantity: 1,
      })
    );
  };
  const location = useLocation();
  const { state } = location;
  const category = state.data;
  console.log(category);
  return (
    <MaxWidthWrapper className="max-md:w-full">
      <h1 className={cn("text-4xl font-base text-center mb-10")}>
        All products in {category}
      </h1>
      <div className="flex flex-col gap-4 pb-10">
        {allProductsData.map((data) => (
          <div
            className={cn(
              "border rounded-r-sm flex max-md:flex-col items-center max-md:py-4 max-md:rounded-sm"
            )}
            key={data.id}
          >
            <div className={cn("bg-gray-300 mr-5 max-md:ml-5")}>
              <img
                src={data.image}
                className={cn(
                  "h-[200px] w-[400px] mix-blend-color-burn object-contain"
                )}
              />
            </div>
            <div className={cn("flex flex-col w-2/3 justify-around py-4")}>
              <div>
                <h1 className={"text-xl max-md:text-md"}>{data.details}</h1>
              </div>
              <div>
                <p>rating {data.rating}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground my-4">
                  ${data.price}
                </p>
              </div>
              <div>
                <Button onClick={() => handleAddToCart(data)}>
                  Add to cart
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </MaxWidthWrapper>
  );
}

export default AllProducts;
