
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productsService from "./productsService";

const initialState: any = {
    products: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

export const createProduct = createAsyncThunk(
    "/product/create",
    async (productData: any, thunkAPI: any) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await productsService.createProduct(productData, token);
        } catch (error: any) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const getSellersProducts = createAsyncThunk(
    "/products/get-sellers-items",
    async (_, thunkAPI: any) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await productsService.getSellersProducts(token);
        } catch (error: any) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const productSlice = createSlice({
    name: "products",
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
            .addCase(createProduct.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.products.push(action.payload)
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true
                state.message = JSON.stringify(action.payload)
            })
            .addCase(getSellersProducts.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getSellersProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.products = action.payload
            })
            .addCase(getSellersProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true
                state.message = JSON.stringify(action.payload)
            })
    }
})

export const { reset } = productSlice.actions;
export default productSlice.reducer;