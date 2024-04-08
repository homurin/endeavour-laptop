"use client";

import { Box, Toolbar } from "@mui/material";
import Navbar from "../dashboard/Navbar";
import Copyright from "../dashboard/Copyright";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box sx={{ display: "flex" }}>
      <Navbar />
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar />
        {children}
      </Box>
      <Copyright year={2024} />
    </Box>
  );
};

export default DashboardLayout;
