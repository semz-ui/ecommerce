import { useLocation } from "react-router-dom";
import MaxWidthWrapper from "../../components/ui/MaxWidthWrapper";
import { cn } from "@/components/lib/utils";
import { Button } from "@/components/ui/button";
import { allProductsData } from "@/utils/allProductsData";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/feature/cart/cartSlice";
import { AppDispatch, RootState } from "@/app/store";
import { useEffect } from "react";
import {
  getFilteredItemsItems,
  reset,
} from "@/feature/buyer/products/productSlice";

interface Item {
  _id: string;
  itemTitle: string;
  itemImage: string;
  itemPrice: number;
}
function AllProducts() {
  const dispatch = useDispatch<AppDispatch>();
  const { items } = useSelector((state: RootState) => state.product);
  const handleAddToCart = (data: Item) => {
    dispatch(
      addToCart({
        id: data._id,
        details: data.itemTitle,
        price: data.itemPrice,
        image: data.itemImage,
        quantity: 1,
      })
    );
  };
  const location = useLocation();
  const { state } = location;
  const category = state.data;
  const cat = category.toLowerCase();
  console.log(cat, "cat");
  useEffect(() => {
    dispatch(getFilteredItemsItems(cat));
    return () => {
      dispatch(reset());
    };
  }, []);
  console.log(items, "product");
  return (
    <MaxWidthWrapper className="max-md:w-full">
      <h1 className={cn("text-4xl font-base text-center mb-10")}>
        All products in {category}
      </h1>
      {items.length > 0 ? (
        <div className="flex flex-col gap-4 pb-10">
          {items.map((data: any) => (
            <div
              className={cn(
                "border rounded-r-sm flex max-md:flex-col items-center max-md:py-4 max-md:rounded-sm"
              )}
              key={data._id}
            >
              <div className={cn("bg-gray-300 mr-5 max-md:ml-5")}>
                <img
                  src={data.itemImage}
                  className={cn(
                    "h-[200px] w-[400px] mix-blend-color-burn object-cover"
                  )}
                />
              </div>
              <div className={cn("flex flex-col w-2/3 justify-around py-4")}>
                <div>
                  <h1 className={"text-xl max-md:text-md"}>{data.itemTitle}</h1>
                </div>
                <div>
                  <p>rating {data.itemRating}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground my-4">
                    ${data.itemPrice}
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
      ) : (
        <div className="text-center text-2xl">No products in this category</div>
      )}
    </MaxWidthWrapper>
  );
}

export default AllProducts;
