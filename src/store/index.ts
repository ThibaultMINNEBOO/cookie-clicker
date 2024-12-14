import { configureStore } from "@reduxjs/toolkit";
import cookieReducer from "./cookie";

export const store = configureStore({
  reducer: {
    cookies: cookieReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
