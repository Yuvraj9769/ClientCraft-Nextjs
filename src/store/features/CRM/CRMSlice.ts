import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface User {
  _id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  companyName: string;
  phoneNumber: string;
  department: string;
  Clients?: [];
  role: string;
  isActive?: boolean;
}

export interface CRMDataState {
  isLoggedIn: boolean;
  user: User;
  darkMode: boolean;
  profile: boolean;
  todos: object[];
}

const initialState: CRMDataState = {
  isLoggedIn: false,
  user: {
    _id: "",
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    companyName: "",
    phoneNumber: "",
    department: "",
    Clients: [],
    role: "",
    isActive: false,
  },
  darkMode: false,
  profile: false,
  todos: [],
};

export const CRMSlice = createSlice({
  name: "CRMData",
  initialState,
  reducers: {
    setLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.darkMode = action.payload;
    },
    setProfile: (state, action: PayloadAction<boolean>) => {
      state.profile = action.payload;
    },
    setTodos: (state, action: PayloadAction<object[]>) => {
      state.todos = action.payload;
    },
  },
});

export const { setLoggedIn, setUser, setDarkMode, setProfile } =
  CRMSlice.actions;

export default CRMSlice.reducer;
