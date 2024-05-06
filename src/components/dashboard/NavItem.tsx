"use client";

import React from "react";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LaptopIcon from "@mui/icons-material/Laptop";
import VideogameAssetIcon from "@mui/icons-material/VideogameAsset";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import Link from "next/link";

const NavItem = () => {
  return (
    <>
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <Link href="/admin/dashboard/">
          <ListItemText primary="Dashboard" />
        </Link>
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <LaptopIcon />
        </ListItemIcon>
        <Link href="/admin/dashboard/laptops">
          <ListItemText primary="Laptop" />
        </Link>
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <VideogameAssetIcon />
        </ListItemIcon>
        <Link href="/admin/dashboard/applications">
          <ListItemText primary="Application" />
        </Link>
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <ManageAccountsIcon />
        </ListItemIcon>
        <Link href="/admin/dashboard/account">
          <ListItemText primary="Account" />
        </Link>
      </ListItemButton>
    </>
  );
};

export default NavItem;
