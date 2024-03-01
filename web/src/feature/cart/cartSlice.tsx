import { createSlice } from "@reduxjs/toolkit";

interface Item {
  id: string;
  details: string;
  image: string;
  price: number;
  quantity: number;
}
type CartState = {
  items: Item[];
};
const initialState: CartState = {
  items: [], // Array of cart items
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: { payload: Item }) {
      const { id } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart(state, action: { payload: { id: string } }) {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      if (index !== -1) {
        state.items.splice(index, 1); // Remove item from array
      }
    },
    reduceCartItem(state, action: { payload: { id: string } }) {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        existingItem.quantity--;
      }
    },
    increaseCartItem(state, action: { payload: { id: string } }) {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        existingItem.quantity++;
      }
    },
  },
});

export const { addToCart, removeFromCart, reduceCartItem, increaseCartItem } =
  cartSlice.actions;
export default cartSlice.reducer;
