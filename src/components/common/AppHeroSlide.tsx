"use client";

import React from "react";
import LaptopChromebookOutlinedIcon from "@mui/icons-material/LaptopChromebookOutlined";
import { Box, Button, Stack, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { toast } from "react-toastify";
import { setGlobalLoading } from "@/redux/features/globalLoadingSlice";
import uiConfigs from "@/configs/ui.config";
import { AppDispatch } from "@/redux/store";
import { getRandomApps } from "@/api/modules/app.api";
import { Apps } from "@/types/application";

const AppHeroSlide = () => {
  const theme = useTheme();
  const useAppDispatch = useDispatch.withTypes<AppDispatch>();
  const dispatch = useAppDispatch();

  const [apps, setApps] = useState([] as Array<Apps>);

  useEffect(() => {
    const getData = async () => {
      const { apps, message } = await getRandomApps();
      if (apps) setApps(apps);
      if (message !== "success") toast.error(message);
      dispatch(setGlobalLoading(false));
    };
    dispatch(setGlobalLoading(true));
    getData();
  }, [dispatch]);
  return (
    <Box
      sx={{
        position: "relative",
        color: "primary.contrastText",
        "&::before": {
          content: '""',
          width: "100%",
          height: "30%",
          position: "absolute",
          bottom: 0,
          left: 0,
          zIndex: 2,
          pointerEvents: "none",
          ...uiConfigs.style.gradientBgImage[theme.palette.mode],
        },
      }}
    >
      <Swiper
        grabCursor={true}
        loop={true}
        modules={[Autoplay]}
        autoplay={{ delay: 10000, disableOnInteraction: false }}
        style={{ width: "100%", height: "max-content" }}
      >
        {apps.map((app, index) => {
          return (
            <SwiperSlide key={index}>
              <Box
                sx={{
                  paddingTop: {
                    xs: "130%",
                    sm: "80%",
                    md: "60%",
                    lg: "45%",
                  },
                  backgroundColor: "#000000",
                  backgroundPosition: "top",
                  backgroundSize: "cover",
                  backgroundImage: `url(${app.screenshots || ""})`,
                }}
              />
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  ...uiConfigs.style.horizontalGradientBgImage[theme.palette.mode],
                }}
              />

              <Box
                sx={{
                  width: "100%",
                  heigth: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  paddingX: {
                    sm: "10px",
                    md: "5rem",
                    lg: "10rem",
                  },
                }}
              >
                <Box
                  sx={{
                    heigth: "100%",
                    display: "flex",
                    alignItems: "center",
                    paddingX: "30px",
                    color: "text.primary",
                    width: { sm: "unset", md: "30%", lg: "40%" },
                  }}
                >
                  <Stack
                    sx={{
                      mt: "30%",
                    }}
                    spacing={4}
                    direction="column"
                  >
                    <Typography
                      variant="h4"
                      fontSize={{ xs: "2rem", md: "2rem", lg: "4rem" }}
                      fontWeight="700"
                      sx={{ ...uiConfigs.style.typoLines(2, "left") }}
                    >
                      {app.name}
                    </Typography>
                    <Typography variant="body1" sx={{ ...uiConfigs.style.typoLines(3) }}>
                      {app.description}
                    </Typography>
                    <Button
                      variant="contained"
                      size="large"
                      startIcon={<LaptopChromebookOutlinedIcon />}
                      component={Link}
                      href={`/applications/${app.id}`}
                      sx={{ width: "max-content" }}
                    >
                      Get Laptop
                    </Button>
                  </Stack>
                </Box>
              </Box>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Box>
  );
};

export default AppHeroSlide;
