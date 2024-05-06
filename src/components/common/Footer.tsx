"use client";

import React from "react";
import { Paper, Stack, Button, Box } from "@mui/material";
import Container from "./Container";
import Logo from "./Logo";
import menuConfigs from "@/configs/menu.config";
import Link from "next/link";

const Footer = () => {
  return (
    <Container>
      <Paper square={true} sx={{ backgroundImage: "unset", padding: "2rem" }}>
        <Stack
          alignItems="center"
          justifyContent="space-between"
          direction={{ xs: "column", md: "row" }}
          sx={{ height: "max-content" }}
        >
          <Logo />
          <Box>
            {menuConfigs.main.map((item, index) => {
              return (
                <Button key={index} sx={{ color: "inherit" }} component={Link} href={item.path}>
                  {item.display}
                </Button>
              );
            })}
          </Box>
        </Stack>
      </Paper>
    </Container>
  );
};

export default Footer;
