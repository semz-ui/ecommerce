import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "./authService";

const user = JSON.parse(localStorage.getItem("user") || 'null');

const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

export const register = createAsyncThunk(
    "auth/register",
    async (userData: any, thunkAPI) => {
        try {
            return await authService.register(userData)
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
)

export const login = createAsyncThunk(
    "auth/login",
    async (userData: any, thunkAPI) => {
        try {
            return await authService.login(userData)
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
)

export const sendMail = createAsyncThunk(
    "auth/send-token",
    async (_, thunkAPI: any) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await authService.sendMail(_, token)
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
export const verifyUser = createAsyncThunk(
    "auth/verify-user",
    async (token: any, thunkAPI: any) => {
        try {
            const tok = thunkAPI.getState().auth.user.token;
            console.log(tok, "tok")
            return await authService.verifyUser(tok, token)
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

export const editProfile = createAsyncThunk(
    "auth/edit-profile",
    async (userData: any, thunkAPI: any) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await authService.editProfile(userData, token)
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

export const logout = createAsyncThunk(
    "auth/logout",
    async () => {
        authService.logout()
    }
)

export const authSlice = createSlice({
    name: "auth",
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
            .addCase(register.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = JSON.stringify(action.payload);
                state.user = null;
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(login.rejected, (state, action: any) => {
                state.isLoading = false;
                state.isError = true;
                state.message = JSON.stringify(action.payload);
                state.user = null;
            })
            .addCase(sendMail.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(sendMail.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload;
            })
            .addCase(sendMail.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = JSON.stringify(action.payload);
                state.user = null;
            })
            .addCase(verifyUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(verifyUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload;
                console.log(action, "action.payload")
            })
            .addCase(verifyUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = JSON.stringify(action.payload);
                state.user = null;
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
            })
            .addCase(editProfile.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(editProfile.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(editProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = JSON.stringify(action.payload);
                state.user = null;
            })
    },
})

export const { reset } = authSlice.actions;
export default authSlice.reducer;