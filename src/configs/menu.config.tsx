"use client";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import LaptopOutlinedIcon from "@mui/icons-material/LaptopOutlined";
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined";
import PageviewOutlinedIcon from "@mui/icons-material/PageviewOutlined";

const main = [
  {
    display: "home",
    path: "/",
    icon: <HomeOutlinedIcon />,
  },
  {
    display: "get recommendations",
    path: "/recommendation",
    icon: <PageviewOutlinedIcon />,
  },
  {
    display: "laptops",
    path: "/laptops",
    icon: <LaptopOutlinedIcon />,
  },
  {
    display: "applications",
    path: "/applications",
    icon: <SportsEsportsOutlinedIcon />,
  },
];

const user = [
  {
    display: "required apps",
    path: "required-apps",
    icon: <FavoriteBorderOutlinedIcon />,
    state: "required.apps",
  },
];

const menuConfigs = { main, user };

export default menuConfigs;
