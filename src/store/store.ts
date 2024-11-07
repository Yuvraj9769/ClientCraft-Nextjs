import { configureStore } from "@reduxjs/toolkit";
import CRMSliceReducers from "@/store/features/CRM/CRMSlice";

export const makeStore = () => {
  return configureStore({
    reducer: CRMSliceReducers,
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
