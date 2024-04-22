"use client";

import { Box, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { notFound } from "next/navigation";
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
import { dateFormatFromIsoString } from "@/utils/parseDate";

export default function Page({ params }: { params: { slug: string } }) {
  const useAppDispatch = useDispatch.withTypes<AppDispatch>();
  const dispatch = useAppDispatch();

  const [laptop, setLaptop] = useState<Laptop>();
  const [similarLaptops, setSimilarLaptops] = useState<Array<Laptop>>([]);
  const [onRequest, setOnRequest] = useState<boolean>(true);

  useEffect(() => {
    dispatch(setGlobalLoading(true));
    setOnRequest(true);

    window.scrollTo(0, 0);
    const getData = async () => {
      const { laptop } = await getLaptopDetail(params.slug);
      const { laptops } = await getSimilarLaptops(params.slug);

      if (laptop) setLaptop(laptop);
      if (laptops) setSimilarLaptops(laptops);
      dispatch(setGlobalLoading(false));
      setOnRequest(false);
    };
    getData();
  }, [dispatch]);

  if (!laptop && !onRequest) {
    notFound();
  }

  return laptop ? (
    <>
      <ImageHeader imgPath={laptop.galleries?.[0]?.image || ""} />
      <Box
        sx={{
          color: "primary.contrastText",
          ...uiConfigs.style.mainContent,
          paddingX: { xs: "0.7rem", md: "3rem" },
        }}
      >
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
                <Container header="spesifikasi ringkas">
                  <Typography variant="body1" sx={{ ...uiConfigs.style.typoLines(20) }}>
                    <strong>CPU : </strong>
                    {laptop.cpu?.name}@{laptop.cpu?.baseSpeed.toFixed(2)}~
                    {laptop.cpu?.maxSpeed.toFixed(2)} GHz
                    <br />
                    <strong>GPU : </strong>
                    {laptop.gpu?.name} (
                    {laptop.gpu?.memory > 0 ? `${laptop.gpu?.memory} GB` : "Shared Memory"} )
                    <br />
                    <strong>Kapasitas RAM : </strong>
                    {laptop.ram} GB
                    <br />
                    <strong>Kapasitas SSD : </strong>
                    {laptop.ssdStorage} GB
                    <br />
                    <strong>Kapasitas HDD : </strong>
                    {laptop.hddStorage} GB
                    <br />
                    <strong>OS Version : </strong>
                    {`${laptop.windowsVersion?.name} ${laptop.osEdition}`}
                    <br />
                    <strong>Nama Brand : </strong>
                    {laptop.brand?.name}
                    <br />
                    <strong>Tanggal Diunggah : </strong>
                    {dateFormatFromIsoString(laptop.createdAt)}
                    <br />
                  </Typography>
                </Container>
              </Stack>
            </Box>
          </Box>
          <Container header="detail spesifikasi">
            <Typography variant="body1" sx={{ ...uiConfigs.style.typoLines(30) }}>
              <strong>Nama CPU: </strong>
              {laptop.cpu?.name}
              <br />
              <strong>Kecepatan CPU : </strong>
              {laptop.cpu?.baseSpeed.toFixed(2)} Ghz hingga {laptop.cpu?.maxSpeed.toFixed(2)} GHz
              <br />
              <strong>Jumlah Core CPU: </strong>
              {laptop.cpu?.cores} Core
              <br />
              <strong>Nama GPU : </strong>
              {laptop.gpu?.name}
              <br />
              <strong>Kecepatan GPU: </strong>
              {laptop.gpu?.baseSpeed} Mhz hingga {laptop.gpu?.maxSpeed} MHz
              <br />
              <strong>Kapasitas Memory GPU: </strong>
              {laptop.gpu?.memory > 0 ? `${laptop.gpu?.memory} GB` : "Shared Memory"}
              <br />
              <strong>Versi DirectX : </strong>
              {laptop.gpu?.directX}
              <br />
              <strong>Versi OpenGL : </strong>
              {laptop.gpu?.openGl}
              <br />
              <strong>Kapasitas RAM : </strong>
              {laptop.ram} GB
              <br />
              <strong>Kapasitas SSD : </strong>
              {laptop.ssdStorage} GB
              <br />
              <strong>Kapasitas HDD : </strong>
              {laptop.hddStorage} GB
              <br />
              <strong>Versi Windows : </strong>
              {laptop.windowsVersion?.name}
              <br />
              <strong>Edisi Windows : </strong>
              {laptop.osEdition}
              <br />
              <strong>Nama Brand : </strong>
              {laptop.brand?.name}
              <br />
              <strong>Nama Tampilan Display : </strong>
              {laptop.displayName}
              <br />
              <strong>Resolusi Tampilan Display : </strong>
              {laptop.displayResolution}
              <br />
              <strong>Ukuran Tampilan Display : </strong>
              {laptop.displaySize} Inchi
              <br />
              <strong>Refresh Rate : </strong>
              {laptop.displaySize} Hz
              <br />
              <strong>Kode Panel : </strong>
              {laptop.panelCode}
              <br />
              <strong>Tipe Panel : </strong>
              {laptop.panelType}
              <br />
              <strong>Berat : </strong>
              {laptop.weight} Kg
              <br />
              <strong>Tanggal Diunggah : </strong>
              {dateFormatFromIsoString(laptop.createdAt)}
              <br />
            </Typography>
          </Container>
          {laptop.videos && (
            <Container header="video">
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
            <Container header="galeri foto">
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
          <Container header="laptop terkait">
            <LaptopMediaSlide data={similarLaptops} />
          </Container>
        </Box>
      </Box>
    </>
  ) : (
    <></>
  );
}
