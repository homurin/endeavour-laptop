import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SliceState = { themeMode: string };

const initialState: SliceState = { themeMode: "dark" };

export const themeModeSlice = createSlice({
  name: "ThemeMode",
  initialState,
  reducers: {
    setThemeMode: (state, action: PayloadAction<string>) => {
      state.themeMode = action.payload;
    },
  },
});

export const { setThemeMode } = themeModeSlice.actions;

export default themeModeSlice.reducer;
