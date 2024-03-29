"use client";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SlideshowOutlineIcon from "@mui/icons-material/SlideshowOutlined";
import LiveTvOutlinedIcon from "@mui/icons-material/LiveTvOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOffOutlined";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import LockResetOutlinedIcon from "@mui/icons-material/LockResetOutlined";

const main = [
  {
    display: "home",
    path: "/",
    icon: <HomeOutlinedIcon />,
  },
  {
    display: "laptop",
    path: "/laptop",
    icon: <SlideshowOutlineIcon />,
  },
  {
    display: "application",
    path: "/application",
    icon: <LiveTvOutlinedIcon />,
  },
  {
    display: "search",
    path: "/search",
    icon: <HomeOutlinedIcon />,
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
