import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllUser } from "../services/apiServices";

export const fetchAllUser = createAsyncThunk("user/fetchAllUser", async () => {
    const response = await getAllUser();
    console.log(response);
    return response;
});

const initialState = {
    listUser: [],
    isLoading: false,
    isError: false,
};

export const counterSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllUser.pending, (state, action) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(fetchAllUser.fulfilled, (state, action) => {
                state.listUser = action.payload;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(fetchAllUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
            });
    },
});

// export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer;
