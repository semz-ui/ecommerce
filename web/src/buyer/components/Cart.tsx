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
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  addToCart,
  reduceCartItem,
  removeFromCart,
} from "@/feature/cart/cartSlice";
import { ShoppingCart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

function Cart() {
  const dispatch = useDispatch();
  const handleAddToCart = (data: any) => {
    dispatch(
      addToCart({
        id: data.id,
        details: data.details,
        image: data.image,
        quantity: data.quantity,
        price: data.price,
      })
    );
  };
  const removeCart = (data: any) => {
    console.log(data, "data");
    dispatch(
      removeFromCart({
        id: data,
      })
    );
  };

  const reduceCart = (data: any) => {
    dispatch(
      reduceCartItem({
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
      <SheetContent className="min-w-full">
        <SheetHeader>
          <SheetTitle>Cart</SheetTitle>
          {cart.items.length === 0 ? (
            <SheetDescription className="min-w-max min-h-max flex items-center justify-center">
              Your cart is empty
            </SheetDescription>
          ) : (
            <SheetDescription>
              You have {cart.items.length} items in your cart
              <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Description</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Remove</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cart.items.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium flex gap-2 items-center">
                        <img
                          src={invoice.image}
                          alt="product"
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        {invoice.details}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-4">
                          <Button
                            variant="outline"
                            onClick={() => handleAddToCart(invoice)}
                            className="w-10 h-10"
                          >
                            +
                          </Button>
                          <p>{invoice.quantity}</p>
                          {invoice.quantity == 1 ? (
                            <Button
                              variant="outline"
                              onClick={() => removeCart(invoice.id)}
                            >
                              x
                            </Button>
                          ) : (
                            <Button
                              variant="outline"
                              onClick={() => reduceCart(invoice)}
                            >
                              -
                            </Button>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          onClick={() => removeCart(invoice.id)}
                        >
                          x
                        </Button>
                      </TableCell>
                      <TableCell className="text-right">
                        ${invoice.price * invoice.quantity}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={3}>Total</TableCell>
                    <TableCell className="text-right">
                      $
                      {cart.items.reduce(
                        (acc, item) => acc + item.price * item.quantity,
                        0
                      )}
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </SheetDescription>
          )}
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}

export default Cart;
