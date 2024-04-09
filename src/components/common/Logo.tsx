"use client";

import { Typography, useTheme } from "@mui/material";

export default function Logo() {
  const theme = useTheme();
  return (
    <div className="flex items-center">
      <img className="w-5 h-5 inline mr-1" src="/images/logo.png" alt="logo" />
      <Typography className="inline" fontWeight="700" fontSize="1.7rem">
        <span style={{ color: "#ff0000" }}>End</span>eavour
      </Typography>
    </div>
  );
}
