"use client";

import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";

const defaultTheme = createTheme();

const MainThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default MainThemeProvider;
