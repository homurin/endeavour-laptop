"use client";

import React from "react";
import { Typography, Link, Paper } from "@mui/material";
import NextLink from "next/link";

const ItemOverviewBox = ({
  title,
  count,
  href,
}: {
  title: string;
  count: number;
  href: string;
}) => {
  return (
    <>
      <Paper sx={{ p: 2, display: "flex", flexDirection: "column", height: 240 }}>
        <Typography component="h2" variant="h6" color="primary" gutterBottom>
          {title}
        </Typography>
        <Typography component="p" variant="h4">
          {count}
        </Typography>
        <div>
          <Link color="primary" component={NextLink} href={href}>
            Lebih Lanjut
          </Link>
        </div>
      </Paper>
    </>
  );
};

export default ItemOverviewBox;
