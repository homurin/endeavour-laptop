"use client";

import { Typography, useTheme } from "@mui/material";

export default function Logo() {
  const theme = useTheme();
  return (
    <Typography fontWeight="700" fontSize="1.7rem">
      Endeavour<span style={{ color: theme.palette.primary.main }}>Laptop</span>
    </Typography>
  );
}
