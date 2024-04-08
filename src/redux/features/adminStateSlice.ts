import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Admin } from "@/types/admin";

type SliceState = { user: Admin | null };

const initialState: SliceState = { user: null };

export const adminSlice = createSlice({
  name: "Admin",
  initialState,
  reducers: {
    setAdmin: (state, action: PayloadAction<Admin | null>) => {
      state.user = action.payload;
    },
  },
});

export const { setAdmin } = adminSlice.actions;

export default adminSlice.reducer;
