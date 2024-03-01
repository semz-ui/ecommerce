import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../feature/auth/authSlice.ts"
import productReducer from "../feature/buyer/products/productSlice.ts"
import sellerProductReducer from "../feature/seller/products/productsSlice.ts"
import cartReducer from "../feature/cart/cartSlice.tsx"


export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    sellerProduct: sellerProductReducer,
    cart: cartReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;