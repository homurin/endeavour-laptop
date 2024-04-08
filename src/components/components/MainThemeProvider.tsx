"use client";

import { createTheme, ThemeProvider } from "@mui/material";

const defaultTheme = createTheme();

const page = ({ children }: { children: React.ReactNode }) => {
  return <ThemeProvider theme={defaultTheme}>{children}</ThemeProvider>;
};

export default page;
