import { configureStore } from "@reduxjs/toolkit";
import { coinApi } from "./api/coinApi";
import investmentReducer from "./features/investmentSlice";

export const store = configureStore({
  reducer: {
    [coinApi.reducerPath]: coinApi.reducer,
    investments: investmentReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(coinApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
