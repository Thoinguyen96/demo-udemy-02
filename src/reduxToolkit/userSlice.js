import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllDataQuiz } from "../services/apiServices";
export const fetchAllQuiz = createAsyncThunk("user/fetchAllQuiz", async () => {
    const response = await getAllDataQuiz();
    console.log(response.DT);

    return response.DT;
});
export const doLogin = createAsyncThunk("user/doLogin", (data) => {
    return {
        payload: data,
    };
});
export const doLogOut = createAsyncThunk("user/doLogOut", (data) => {
    return {
        payload: data,
    };
});
const initialState = {
    listQuiz: [],
    isLoading: false,
    isError: false,
    account: {
        access_token: "",
        refresh_token: "",
        username: "",
        image: "",
        role: "",
        email: "",
    },
    isAuthenticalted: false,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllQuiz.pending, (state, action) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(fetchAllQuiz.fulfilled, (state, action) => {
                state.listQuiz = action.payload;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(fetchAllQuiz.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
            })
            .addCase(doLogin.fulfilled, (state, action) => {
                state.access_token = action?.payload?.DT?.access_token;
                state.refresh_token = action?.payload?.DT?.refresh_token;
                state.username = action?.payload?.DT?.username;
                state.image = action?.payload?.DT?.image;
                state.role = action?.payload?.DT?.role;
                state.email = action?.payload?.DT?.email;
                state.isAuthenticalted = true;
            })
            .addCase(doLogOut.fulfilled, (state, action) => {
                console.log(action);
                state.isLoading = false;
                state.isError = false;
                state.access_token = "";
                state.refresh_token = "";
                state.username = "";
                state.image = "";
                state.role = "";
                state.email = "";
                state.isAuthenticalted = false;
            });
    },
});

export default userSlice.reducer;
