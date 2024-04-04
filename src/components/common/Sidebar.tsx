import React from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { themeModes, ThemeModes } from "@/configs/theme.config";
import { setThemeMode } from "@/redux/features/themeModeSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { usePathname } from "next/navigation";
import uiConfigs from "@/configs/ui.config";
import Logo from "./Logo";
import menuConfigs from "@/configs/menu.config";

const Sidebar = ({
  open,
  toggleSidebar,
}: {
  open: boolean;
  toggleSidebar: { (toggle: boolean): void };
}) => {
  const useAppSelector = useSelector.withTypes<RootState>();
  const useAppDispatch = useDispatch.withTypes<AppDispatch>();
  const dispatch = useAppDispatch();
  const currentPage = usePathname();
  const { appState } = useAppSelector((state) => state.appState);
  const { themeMode } = useAppSelector((state) => state.themeMode);

  const sidebarWidth = uiConfigs.size.sideBarWith;

  const onSwitchTheme = () => {
    const theme = themeMode === themeModes.dark ? themeModes.light : themeModes.dark;
    dispatch(setThemeMode(theme));
  };

  const drawer = (
    <>
      <Toolbar sx={{ paddingY: "20px", color: "text.primary" }}>
        <Stack width="100%" direction="row" justifyContent="center">
          <Logo />
        </Stack>
      </Toolbar>
      <List sx={{ paddingX: "30px" }}>
        <Typography variant="h6" marginBottom="20px">
          MENU
        </Typography>
        {menuConfigs.main.map((item, index) => {
          return (
            <ListItemButton
              key={index}
              sx={{
                borderRadius: "10px",
                marginY: 1,
                backgroundColor: currentPage === item.path ? "primary.main" : "unset",
              }}
              component={Link}
              href={item.path}
              onClick={() => toggleSidebar(false)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText
                disableTypography
                primary={<Typography textTransform="uppercase">{item.display}</Typography>}
              />
            </ListItemButton>
          );
        })}

        <Typography variant="h6" marginBottom="20px">
          THEME
        </Typography>
        <ListItemButton onClick={onSwitchTheme}>
          <ListItemIcon>
            {themeMode === themeModes.dark && <DarkModeOutlinedIcon />}
            {themeMode === themeModes.light && <WbSunnyOutlinedIcon />}
          </ListItemIcon>
          <ListItemText
            disableTypography
            primary={
              <Typography textTransform="uppercase">
                {themeMode === themeModes.dark ? "dark mode" : "light mode"}
              </Typography>
            }
          />
        </ListItemButton>
      </List>
    </>
  );

  return (
    <Drawer
      open={open}
      onClose={() => toggleSidebar(false)}
      sx={{
        "& .MuiDrawer-Paper": {
          boxSizing: "border-box",
          width: sidebarWidth,
          borderRight: 0,
        },
      }}
    >
      {drawer}
    </Drawer>
  );
};

export default Sidebar;
