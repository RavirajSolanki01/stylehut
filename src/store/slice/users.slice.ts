import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type FormData = {
  full_name: string;
  email: string;
  mobile: string;
  birth_date: string;
  gender_id: number;
};

const initialState = {
  user: {
    email: "",
    isAuthenticated: false,
  },
  userData: {
    full_name: "",
    email: "",
    mobile: "",
    gender_id: 0,
  },
};

const loggedInUserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addLoggedInUser: (
      state,
      action: PayloadAction<{
        email: string;
      }>
    ) => {
      const payload = { ...action.payload, isAuthenticated: true };
      state.user = payload;
    },
    addUserProfileData: (state, action: PayloadAction<FormData>) => {
      const payload = { ...action.payload };
      state.userData = payload;
    },
    removeLoggedInUser: (state) => {
      state.user = {
        isAuthenticated: false,
        email: "",
      };
    },
  },
});

export const { addLoggedInUser, removeLoggedInUser, addUserProfileData } =
  loggedInUserSlice.actions;

export default loggedInUserSlice.reducer;
