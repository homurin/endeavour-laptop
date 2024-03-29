import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SliceState = { appId: string; requiredApps: string[] };

const initialState: SliceState = { appId: "", requiredApps: [] };

export const userSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    setRequiredApps: (state, action: PayloadAction<SliceState>) => {
      state.requiredApps = action.payload.requiredApps;
    },
    removeRequiredApps: (state, action: PayloadAction<SliceState>) => {
      const { appId } = action.payload;
      state.requiredApps.filter((e) => e !== appId);
    },
    addRequiredApps: (state, action: PayloadAction<SliceState>) => {
      state.requiredApps.push(action.payload.appId);
    },
  },
});

export const { setRequiredApps, addRequiredApps, removeRequiredApps } = userSlice.actions;

export default userSlice.reducer;
