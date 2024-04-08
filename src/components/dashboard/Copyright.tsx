"use client";

import { SxProps, Theme, Typography } from "@mui/material";
import Link from "@mui/material/Link";

export default function Copyright({ year, sx }: { year: number; sx?: SxProps<Theme> }) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" sx={sx}>
      {"Copyright © "}{" "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {year + " ."}
    </Typography>
  );
}
