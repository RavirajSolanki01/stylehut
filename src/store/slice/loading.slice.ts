import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LoadingState {
  [key: string]: boolean;
}

const initialState: LoadingState = {};

interface SetLoadingPayload {
  key: string;
  value: boolean;
}

const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<SetLoadingPayload>) => {
      const { key, value } = action.payload;
      state[key] = value;
    },
  },
});

export const { setLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
