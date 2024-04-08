import { configureStore } from "@reduxjs/toolkit";
import themeModeSlice from "./features/themeModeSlice";
import globalLoadingSlice from "./features/globalLoadingSlice";
import appStateSlice from "./features/appStateSlice";
import adminStateSlice from "./features/adminStateSlice";

const store = configureStore({
  reducer: {
    themeMode: themeModeSlice,
    globalLoading: globalLoadingSlice,
    appState: appStateSlice,
    adminState: adminStateSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
