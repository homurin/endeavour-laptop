"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { ThemeProvider } from "@mui/material/styles";
import themeConfigs, { ThemeModes } from "@/configs/theme.config";
import { ToastContainer } from "react-toastify";
import { CssBaseline } from "@mui/material";

const MainThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const useThemeSelector = useSelector.withTypes<RootState>();
  const { themeMode } = useThemeSelector((state) => {
    return state.themeMode;
  });
  return (
    <ThemeProvider theme={themeConfigs.custom({ mode: themeMode as ThemeModes })}>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        pauseOnHover
        theme={themeMode}
      />
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default MainThemeProvider;
