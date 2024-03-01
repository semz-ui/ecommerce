import { Button } from "@/components/ui/button";
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
import CreateProduct from "./CreateProduct";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import { useEffect } from "react";
import { getSellersProducts } from "@/feature/seller/products/productsSlice";

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];

export default function Product() {
  const dispatch = useDispatch<AppDispatch>();
  const { products, isLoading }: any = useSelector<RootState>(
    (state) => state.sellerProduct
  );
  useEffect(() => {
    dispatch(getSellersProducts());
  }, []);
  console.log(products, "pros");
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="px-10 pt-10">
      <div className="flex justify-between">
        <div>All products</div>
        <div>
          <CreateProduct />
        </div>
      </div>
      <Table className="mt-4">
        <TableCaption>A list of your products.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Item Title</TableHead>
            <TableHead>Item Description</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product: any) => (
            <TableRow key={product._id} className="cursor-pointer">
              <TableCell className="flex gap-2 items-center">
                <img
                  src={product.itemImage}
                  alt="product"
                  className="w-10 h-10 rounded-full object-cover"
                />
                {product.itemTitle}
              </TableCell>
              <TableCell>{product.itemDescription}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell className="text-right">${product.itemPrice}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        {/* <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter> */}
      </Table>
    </div>
  );
}
