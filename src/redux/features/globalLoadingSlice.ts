import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SliceState = { globalLoading: boolean };

const initialState: SliceState = { globalLoading: false };

export const globalLoadingSlice = createSlice({
  name: "globalLoading",
  initialState,
  reducers: {
    setGlobalLoading: (state, action: PayloadAction<boolean>) => {
      state.globalLoading = action.payload;
    },
  },
});

export const { setGlobalLoading } = globalLoadingSlice.actions;

export default globalLoadingSlice.reducer;
