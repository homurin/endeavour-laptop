"use client";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
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
    display: "multi rekomendasi",
    path: "/recommendation",
    icon: <PageviewOutlinedIcon />,
  },
  {
    display: "laptop",
    path: "/laptops",
    icon: <LaptopOutlinedIcon />,
  },
  {
    display: "aplikasi",
    path: "/applications",
    icon: <SportsEsportsOutlinedIcon />,
  },
];

const menuConfigs = { main };

export default menuConfigs;
