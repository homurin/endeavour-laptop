"use client";

import React, { cloneElement, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import MenuIcon from "@mui/icons-material/Menu";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import { AppBar, Box, Button, IconButton, Stack, Toolbar, useScrollTrigger } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AppDispatch, type RootState } from "@/redux/store";
import menuConfigs from "@/configs/menu.config";
import { themeModes } from "@/configs/theme.config";
import { setThemeMode } from "@/redux/features/themeModeSlice";
import Logo from "./Logo";
import Sidebar from "./Sidebar";

const ScrollAppBar = ({ children, window }: { children: React.ReactElement; window?: any }) => {
  const useThemeModeSelector = useSelector.withTypes<RootState>();
  const { themeMode } = useThemeModeSelector((state) => state.themeMode);
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 50,
    target: window ? window() : undefined,
  });

  return cloneElement(children, {
    sx: {
      color: trigger
        ? "text.primary"
        : themeMode === themeModes.dark
        ? "primary.contrastText"
        : "text.primary",
      backgroundColor: trigger
        ? "background.paper"
        : themeMode === themeModes.dark
        ? "transparent"
        : "background.paper",
    },
  });
};

const Topbar = () => {
  const useAppSelector = useSelector.withTypes<RootState>();
  const { themeMode } = useAppSelector((state) => state.themeMode);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const currentPage = usePathname();
  const useAppDispatch = useDispatch.withTypes<AppDispatch>();
  const dispatch = useAppDispatch();

  const onSwitchTheme = () => {
    const theme = themeMode === themeModes.dark ? themeModes.light : themeModes.dark;
    dispatch(setThemeMode(theme));
  };

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <>
      <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />
      <ScrollAppBar>
        <AppBar elevation={0} sx={{ zIndex: 9999 }}>
          <Toolbar sx={{ alignItems: "center", justifyContent: "space-between" }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <IconButton
                color="inherit"
                sx={{ mr: 2, display: { md: "none" } }}
                onClick={toggleSidebar}
              >
                <MenuIcon />
              </IconButton>
              <Box sx={{ display: { xs: "inline-block", md: "none" } }}>
                <Logo />
              </Box>
            </Stack>
            <Box flexGrow={1} alignItems="center" display={{ xs: "none", md: "flex" }}>
              <Box sx={{ marginRight: "30px" }}>
                <Logo />
              </Box>
              {menuConfigs.main.map((item, index) => {
                return (
                  <Button
                    key={index}
                    sx={{
                      color: currentPage === item.path ? "primary.contrastText" : "inherit",
                      mr: 2,
                    }}
                    component={Link}
                    href={item.path}
                    variant={currentPage === item.path ? "contained" : "text"}
                  >
                    {item.display}
                  </Button>
                );
              })}
              <IconButton sx={{ color: "inherit" }} onClick={onSwitchTheme}>
                {themeMode === themeModes.dark && <DarkModeOutlinedIcon />}
                {themeMode === themeModes.light && <WbSunnyOutlinedIcon />}
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
      </ScrollAppBar>
    </>
  );
};

export default Topbar;
