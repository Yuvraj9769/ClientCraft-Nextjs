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

export interface projectInterface {
  _id: string;
  clientName: string;
  projectName: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  budget: string;
}

export interface clientsSearchedDataInterface {
  _id: string;
  name: string;
  email: string;
  dateJoined: Date;
  status: boolean;
  country: string;
  phone: string;
}

export interface todosInterface {
  _id: string;
  title: string;
  description: string;
  isDone: boolean;
  createdAt: string;
}

export interface CRMDataState {
  isLoggedIn: boolean;
  user: User;
  darkMode: boolean;
  profile: boolean;
  todos: todosInterface[];
  projects: projectInterface[];
  searchedData: projectInterface[];
  clientsData: clientsSearchedDataInterface[];
  searchedClientsData: clientsSearchedDataInterface[];
  searchedTodos: todosInterface[];
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
  projects: [],
  searchedData: [],
  clientsData: [],
  searchedClientsData: [],
  searchedTodos: [],
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
    setTodos: (state, action: PayloadAction<todosInterface[]>) => {
      state.todos = action.payload;
    },
    setProjects: (state, action: PayloadAction<projectInterface[]>) => {
      state.projects = action.payload;
    },
    setSearchedData: (state, action: PayloadAction<projectInterface[]>) => {
      state.searchedData = action.payload;
    },
    setClientsData: (
      state,
      action: PayloadAction<clientsSearchedDataInterface[]>
    ) => {
      state.clientsData = action.payload;
    },
    setSearchedClientsData: (
      state,
      action: PayloadAction<clientsSearchedDataInterface[]>
    ) => {
      state.searchedClientsData = action.payload;
    },
    setSearchedTodos: (state, action: PayloadAction<todosInterface[]>) => {
      state.searchedTodos = action.payload;
    },
  },
});

export const {
  setLoggedIn,
  setUser,
  setTodos,
  setDarkMode,
  setProfile,
  setProjects,
  setSearchedData,
  setClientsData,
  setSearchedClientsData,
  setSearchedTodos,
} = CRMSlice.actions;

export default CRMSlice.reducer;
