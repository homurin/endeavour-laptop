"use client";

import React from "react";
import { Box } from "@mui/material";
import { SwiperSlide, Swiper } from "swiper/react";
import AppMediaItem from "./AppMediaItem";
import "swiper/css";
import { Apps } from "@/types/application";

const AppMediaSlide = ({ data }: { data: Array<Apps> }) => {
  return (
    <Box
      sx={{
        "& .swiper-slide": {
          width: {
            xs: "50%",
            sm: "35%",
            md: "25%",
            lg: "20.5%",
          },
          height: "50%",
        },
      }}
    >
      <Swiper
        loop={true}
        slidesPerView="auto"
        grabCursor={true}
        style={{ width: "100%", height: "max-content" }}
      >
        {data.map((app, index) => {
          return (
            <SwiperSlide key={index}>
              <AppMediaItem media={app} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Box>
  );
};
export default AppMediaSlide;
