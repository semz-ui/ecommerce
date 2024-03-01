import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productService from "./productService";

const initialState = {
    items: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

export const getFilteredItemsItems = createAsyncThunk(
    "product/getFilteredItemsItems",
    async (category: any, thunkAPI) => {
        try {
            return await productService.getFilteredItemsItems(category)
        } catch (error: any) {
            const message = (error.response &&
                error.response.data &&
                error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
)

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isSuccess = false;
            state.isError = false;
            state.message = "";
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getFilteredItemsItems.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getFilteredItemsItems.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.items = action.payload;
            })
            .addCase(getFilteredItemsItems.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = JSON.stringify(action.payload);
            })
    }
})

export const { reset } = productSlice.actions;
export default productSlice.reducer;