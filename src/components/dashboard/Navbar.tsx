"use client";

import React, { useState } from "react";
import {
  Drawer as MuiDrawer,
  Toolbar,
  Typography,
  Divider,
  IconButton,
  styled,
  List,
  Badge,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import NavItem from "@/components/dashboard/NavItem";
import Logo from "../common/Logo";
import ConfirmAlert from "./ConfirmAlert";
import { useRouter } from "next/navigation";

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "!open",
})<AppBarProps>(({ theme, open }) => ({
  backgroundColor: "rgb(8 51 68)",
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: { width: theme.spacing(9) },
    }),
  },
}));

const Navbar = () => {
  const [open, setOpen] = useState<boolean>(true);
  const [openLogout, setOpenLogout] = useState<boolean>(false);

  const router = useRouter();

  const toggleDrawer = () => {
    setOpen(!open);
  };
  const handleLogout = () => {
    setOpenLogout(false);
    localStorage.removeItem("authtoken");
    router.push("/admin/login");
  };
  return (
    <>
      <ConfirmAlert
        title="Logout"
        message="Are you sure?"
        open={openLogout}
        onClose={() => {
          setOpenLogout(false);
        }}
        onConfirm={handleLogout}
      />
      <AppBar position="absolute" open={open}>
        <Toolbar sx={{ pr: "24px" }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            Dashboard
          </Typography>
          <IconButton
            color="inherit"
            onClick={() => {
              setOpenLogout(true);
            }}
          >
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <Toolbar
          sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end", px: [1] }}
        >
          <Logo />
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List component="nav">
          <NavItem />
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;
