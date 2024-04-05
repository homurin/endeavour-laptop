"use client";

import { Box, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { SwiperSlide } from "swiper/react";
import Container from "@/components/common/Container";
import ImageHeader from "@/components/common/ImageHeader";
import uiConfigs from "@/configs/ui.config";
import { getLaptopDetail, getSimilarLaptops } from "@/api/modules/laptop.api";
import { setGlobalLoading } from "@/redux/features/globalLoadingSlice";
import NavigationSwiper from "@/components/common/NavigationSwiper";
import LaptopMediaSlide from "@/components/common/LaptopMediaSlide";
import type { AppDispatch } from "@/redux/store";
import { Laptop } from "@/types/laptop";

export default function Page({ params }: { params: { slug: string } }) {
  const useAppDispatch = useDispatch.withTypes<AppDispatch>();
  const dispatch = useAppDispatch();

  const [laptop, setLaptop] = useState<Laptop>();
  const [similarLaptops, setSimilarLaptops] = useState<Array<Laptop>>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const getData = async () => {
      dispatch(setGlobalLoading(true));
      const { message: laptopMsg, laptop } = await getLaptopDetail(params.slug);
      const { message: laptopsMsg, laptops } = await getSimilarLaptops(params.slug);
      dispatch(setGlobalLoading(false));

      if (laptopMsg !== "success") toast.error(laptopMsg);
      if (laptopsMsg !== "success") toast.error(laptopsMsg);
      if (laptop) setLaptop(laptop);
      if (laptops) setSimilarLaptops(laptops);
    };
    getData();
  }, [dispatch]);

  return laptop ? (
    <>
      <ImageHeader imgPath={laptop.galleries?.[0].image || ""} />
      <Box sx={{ color: "primary.contrastText", ...uiConfigs.style.mainContent }}>
        <Box sx={{ marginTop: { xs: "-10rem", md: "-15rem", lg: "-20rem" } }}>
          <Box sx={{ display: "flex", flexDirection: { md: "row", xs: "column" } }}>
            <Box
              sx={{
                width: { xs: "70%", sm: "50%", md: "40%" },
                margin: { xs: "0 auto 2rem", md: "0 2rem 0 0" },
              }}
            >
              <img
                style={{
                  width: "40vw",
                  height: "max-content",
                  objectFit: "cover",
                }}
                src={laptop.thumb}
                alt={`${laptop.name}-thumb`}
              />
            </Box>

            <Box sx={{ width: { xs: "100%", md: "60%" }, color: "text.primary" }}>
              <Stack spacing={5}>
                <Typography
                  variant="h4"
                  fontSize={{ xs: "2rem", md: "2rem", lg: "4rem" }}
                  fontWeight="700"
                  sx={{ ...uiConfigs.style.typoLines(2, "left") }}
                >
                  {laptop.name}
                </Typography>
                <Container header="overview">
                  <Typography variant="body1" sx={{ ...uiConfigs.style.typoLines(20) }}>
                    <strong>CPU : </strong>
                    {laptop.cpu?.name}@{laptop.cpu?.baseSpeed.toFixed(2)}~
                    {laptop.cpu?.maxSpeed.toFixed(2)} GHz
                    <br />
                    <strong>GPU : </strong>
                    {laptop.gpu?.name} (
                    {laptop.gpu?.memory > 0 ? `${laptop.gpu?.memory} GB` : "Shared Memory"} )
                    <br />
                    <strong>RAM : </strong>
                    {laptop.ram} GB
                    <br />
                    <strong>SSD Storage : </strong>
                    {laptop.ssdStorage} GB
                    <br />
                    <strong>HDD Storage : </strong>
                    {laptop.hddStorage} GB
                    <br />
                    <strong>OS Version : </strong>
                    {`${laptop.windowsVersion?.name} ${laptop.osEdition}`}
                    <br />
                    <strong>Brand Name : </strong>
                    {laptop.brand?.name}
                    <br />
                    <strong>Post Date : </strong>
                    {new Date(laptop.createdAt).getDate()}/{new Date(laptop.createdAt).getDay()}/
                    {new Date(laptop.createdAt).getFullYear()}
                    <br />
                  </Typography>
                </Container>
              </Stack>
            </Box>
          </Box>
          <Container header="specification detail">
            <Typography variant="body1" sx={{ ...uiConfigs.style.typoLines(20) }}>
              <strong>CPU Name : </strong>
              {laptop.cpu?.name}
              <br />
              <strong>CPU Speed: </strong>
              {laptop.cpu?.baseSpeed.toFixed(2)}~{laptop.cpu?.maxSpeed.toFixed(2)} GHz
              <br />
              <strong>CPU Cores: </strong>
              {laptop.cpu?.cores} Core
              <br />
              <strong>GPU Name : </strong>
              {laptop.gpu?.name}
              <br />
              <strong>GPU Speed: </strong>
              {laptop.gpu?.baseSpeed} - {laptop.gpu?.maxSpeed} MHz
              <br />
              <strong>GPU Memory: </strong>
              {laptop.gpu?.memory > 0 ? `${laptop.gpu?.memory} GB` : "Shared Memory"}
              <br />
              <strong>DirectX Version : </strong>
              {laptop.gpu?.directX}
              <br />
              <strong>OpenGL Version : </strong>
              {laptop.gpu?.openGl}
              <br />
              <strong>RAM : </strong>
              {laptop.ram} GB
              <br />
              <strong>SSD Storage : </strong>
              {laptop.ssdStorage} GB
              <br />
              <strong>HDD Storage : </strong>
              {laptop.hddStorage} GB
              <br />
              <strong>OS Version : </strong>
              {laptop.windowsVersion?.name}
              <br />
              <strong>OS Edition : </strong>${laptop.osEdition}
              <br />
              <strong>Brand Name : </strong>
              {laptop.brand?.name}
              <br />
              <strong>Display Name : </strong>
              {laptop.displayName}
              <br />
              <strong>Display Size : </strong>
              {laptop.displaySize} Inch
              <br />
              <strong>Panel Code : </strong>
              {laptop.panelCode}
              <br />
              <strong>Panel Type : </strong>
              {laptop.panelType}
              <br />
              <strong>Weight : </strong>
              {laptop.weight} Kg
              <br />
              <strong>Post Date : </strong>
              {new Date(laptop.createdAt).getDate()}/{new Date(laptop.createdAt).getDay()}/
              {new Date(laptop.createdAt).getFullYear()}
              <br />
            </Typography>
          </Container>
          {laptop.videos && (
            <Container header="videos">
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  paddingTop: "2rem",
                  height: "max-content",
                }}
              >
                <iframe
                  allowFullScreen={true}
                  src={laptop.videos}
                  title={laptop.id}
                  style={{ border: 0, width: "90vw", height: "100vh", display: "block" }}
                ></iframe>
              </Box>
            </Container>
          )}
          {laptop.galleries?.length > 0 && (
            <Container header="backdrops">
              <NavigationSwiper>
                {laptop.galleries.map((gallery, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <img
                        style={{
                          width: "100%",
                          height: "100vh",
                          objectFit: "contain",
                        }}
                        src={gallery.image}
                        alt={`${laptop.name}-img-${index}`}
                      />
                    </SwiperSlide>
                  );
                })}
              </NavigationSwiper>
            </Container>
          )}
          <Container header="similar laptop">
            <LaptopMediaSlide data={similarLaptops} />
          </Container>
        </Box>
      </Box>
    </>
  ) : (
    <></>
  );
}
