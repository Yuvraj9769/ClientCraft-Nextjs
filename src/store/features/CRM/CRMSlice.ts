import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CounterState {
  isLoggedIn: boolean;
}

const initialState: CounterState = {
  isLoggedIn: false,
};

export const CRMSlice = createSlice({
  name: "CRMData",
  initialState,
  reducers: {
    setLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
  },
});

export const { setLoggedIn } = CRMSlice.actions;

export default CRMSlice.reducer;
