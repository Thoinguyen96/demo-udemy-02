import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../reduxToolkit/userSlice";
import authReducer from "../reduxToolkit/userAuth";

export const store = configureStore({
    reducer: {
        user: counterReducer,
        auth: authReducer,
    },
});
