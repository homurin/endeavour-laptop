"use client";

import React from "react";
import { Box } from "@mui/material";
import { SwiperSlide, Swiper } from "swiper/react";
import LaptopMediaItem from "./LaptopMediaItem";
import "swiper/css";

const LaptopMediaSlide = ({ data }: { data: Array<any> }) => {
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
        {data.map((laptop, index) => {
          return (
            <SwiperSlide key={index}>
              <LaptopMediaItem media={laptop} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Box>
  );
};
export default LaptopMediaSlide;
