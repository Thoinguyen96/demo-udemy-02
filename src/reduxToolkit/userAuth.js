import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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

export const authSlice = createSlice({
    name: "LogIn",
    initialState,
    reducers: {
        LogInRequest: (state) => {
            state.isLoading = true;
            state.isError = false;
        },
        LogInSuccess: (state, action) => {
            state.account.access_token = action?.payload?.DT?.access_token;
            state.account.refresh_token = action?.payload?.DT?.refresh_token;
            state.account.username = action?.payload?.DT?.username;
            state.account.image = action?.payload?.DT?.image;
            state.account.role = action?.payload?.DT?.role;
            state.account.email = action?.payload?.DT?.email;

            state.isAuthenticalted = true;
            state.isLoading = false;
            state.isError = false;
        },
        LogInError: (state) => {
            state.isLoading = false;
            state.isError = true;
        },
    },
});

export const { LogInRequest, LogInSuccess, LogInError } = authSlice.actions;

export default authSlice.reducer;
