"use client";

import React from "react";
import { Box, useTheme } from "@mui/material";
import { SwiperSlide, Swiper } from "swiper/react";
import { Navigation } from "swiper/modules";
import LaptopMediaItem from "./LaptopMediaItem";
import { Laptop } from "@/types/laptop";

const LaptopMediaSlide = ({ data }: { data: Array<Laptop> }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        "& .swiper-slide": {
          width: {
            xs: "50%",
            sm: "35%",
            md: "25%",
            lg: "25%",
          },
          height: "50%",
        },
        "& .swiper-button-next, & .swiper-button-prev": {
          color: theme.palette.primary.main,
          "&::after": {
            fontSize: { xs: "2.5rem" },
            fontWeight: 700,
          },
        },
        "& .swiper": {
          paddingX: { xs: "2rem" },
        },
      }}
    >
      <Swiper
        loop={true}
        slidesPerView="auto"
        grabCursor={true}
        style={{ width: "100%", height: "max-content" }}
        navigation={true}
        modules={[Navigation]}
        className="px-10"
        color="#000000"
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
