"use client";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
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
    path: "/laptop",
    icon: <LaptopOutlinedIcon />,
  },
  {
    display: "applications",
    path: "/application",
    icon: <SportsEsportsOutlinedIcon />,
  },
  {
    display: "search",
    path: "/search",
    icon: <SearchOutlinedIcon />,
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
