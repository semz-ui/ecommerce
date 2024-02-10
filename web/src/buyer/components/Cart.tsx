import { RootState } from "@/app/store";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { removeFromCart } from "@/feature/cart/cartSlice";
import { ShoppingCart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

function Cart() {
  const dispatch = useDispatch();
  const handleAddToCart = (data: any) => {
    dispatch(
      removeFromCart({
        id: data.id,
      })
    );
  };
  const cart = useSelector((state: RootState) => state.cart);
  console.log(cart.items, "caret");
  return (
    <Sheet>
      <SheetTrigger>
        <ShoppingCart color="white" />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Cart</SheetTitle>
          {cart.items.length === 0 ? (
            <SheetDescription>Your cart is empty</SheetDescription>
          ) : (
            <SheetDescription>
              You have {cart.items.length} items in your cart
              {cart.items.map((item) => (
                <div key={item.id}>
                  <p>{item.details}</p>
                  <p>{item.price}</p>
                  <Button onClick={() => handleAddToCart(item)}>Remove</Button>
                </div>
              ))}
            </SheetDescription>
          )}
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}

export default Cart;
