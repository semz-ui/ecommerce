import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store";
import { createProduct } from "@/feature/seller/products/productsSlice";

function CreateProduct() {
  const dispatch = useDispatch<AppDispatch>();
  const formSchema = z.object({
    itemTitle: z.string().min(2, {
      message: "title must be at least 2 characters.",
    }),
    itemDescription: z.string().min(2, {
      message: "description must be at least 2 characters.",
    }),
    itemImage: z.custom<File>((v) => v instanceof File, {
      message: "Image is required",
    }),
    itemPrice: z.string(),
    category: z.string().min(2, {
      message: "category must be at least 2 characters.",
    }),
    subCategory: z.string().min(2, {
      message: "sub category must be at least 2 characters.",
    }),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      itemTitle: "",
      itemDescription: "",
      itemImage: new File([""], "filename"),
      itemPrice: "",
      category: "",
      subCategory: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formData: FormData = new FormData();
    formData.append("image", values.itemImage);
    formData.append("itemTitle", values.itemTitle);
    formData.append("itemDescription", values.itemDescription);
    formData.append("itemPrice", values.itemPrice);
    formData.append("category", values.category);
    formData.append("subCategory", values.subCategory);
    dispatch(createProduct(formData));

    console.log(values, "lk", formData);
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button>Create a new product</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">
            Create a new product
          </DialogTitle>
          <DialogDescription>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="itemTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Item Title</FormLabel>
                      <FormControl>
                        <Input placeholder="item title" {...field} />
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="itemDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Item Description</FormLabel>
                      <FormControl>
                        <Input placeholder="item description" {...field} />
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="itemImage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="item image"
                          {...field}
                          value={undefined}
                          onChange={(event) => {
                            if (
                              event.target.files &&
                              event.target.files.length > 0
                            ) {
                              // When the user selects a file, update the form value.
                              form.setValue("itemImage", event.target.files[0]);
                            }
                          }}
                          type="file"
                        />
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="itemPrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Item price</FormLabel>
                      <FormControl>
                        <Input placeholder="price" {...field} type="number" />
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>category</FormLabel>
                      <FormControl>
                        <Input placeholder="category" {...field} />
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="subCategory"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sub category</FormLabel>
                      <FormControl>
                        <Input placeholder="sub category" {...field} />
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
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default CreateProduct;
