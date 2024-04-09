"use client";

import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { ToastContainer } from "react-toastify";

const defaultTheme = createTheme();

const MainThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        pauseOnHover
        theme="dark"
      />
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default MainThemeProvider;
