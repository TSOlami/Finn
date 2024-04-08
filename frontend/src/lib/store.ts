"use client";

import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./features/user/userSlice";

export const makeStore= () => configureStore({
    reducer: {
        user: userReducer,
    }
})

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>

// Infer the type of the root state and dispatch of the store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
