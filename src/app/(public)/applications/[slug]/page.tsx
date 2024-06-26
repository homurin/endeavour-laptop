"use client";

import { MdLibraryAdd, MdLibraryAddCheck } from "react-icons/md";
import { LoadingButton } from "@mui/lab";
import { Box, Stack, Typography } from "@mui/material";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { FaWindows, FaApple, FaLinux } from "react-icons/fa";
import Container from "@/components/common/Container";
import ImageHeader from "@/components/common/ImageHeader";
import uiConfigs from "@/configs/ui.config";
import { getRandomApps, getOneApp } from "@/api/modules/app.api";
import { getLaptopRecommendation } from "@/api/modules/laptop.api";
import { setGlobalLoading } from "@/redux/features/globalLoadingSlice";
import LaptopMediaSlide from "@/components/common/LaptopMediaSlide";
import type { AppDispatch } from "@/redux/store";
import { Apps } from "@/types/application";
import { Laptop } from "@/types/laptop";
import AppMediaSlide from "@/components/common/AppMediaSlide";
import { dateFormatFromIsoString } from "@utils/parseDate";
import * as selectedApps from "@utils/selectedAppsUtils";

export default function Page({ params }: { params: { slug: string } }) {
  const useAppDispatch = useDispatch.withTypes<AppDispatch>();
  const dispatch = useAppDispatch();

  const [app, setApp] = useState<Apps>();
  const [laptops, setLaptops] = useState<Array<Laptop>>([]);
  const [randomApps, setRandomApps] = useState<Array<Apps>>([]);
  const [isSelectedApp, setIsSelectedApp] = useState<boolean>(false);
  const [onRequest, setOnRequest] = useState<boolean>(true);

  useEffect(() => {
    dispatch(setGlobalLoading(true));
    setOnRequest(true);
    window.scrollTo(0, 0);
    const getData = async () => {
      const { app } = await getOneApp(params.slug);
      const { message: appsMsg, apps } = await getRandomApps();

      if (!apps) {
        return toast.error(appsMsg);
      }

      if (app) {
        setApp(app);
        const { message: laptopsMsg, laptops } = await getLaptopRecommendation([app.id]);
        if (!laptops) {
          return toast.error(laptopsMsg);
        }
        if (laptops) setLaptops(laptops);
      }

      if (apps) setRandomApps(apps);
      const isSelectedAppExist = await selectedApps.isExists(params.slug);
      if (isSelectedAppExist) setIsSelectedApp(true);

      dispatch(setGlobalLoading(false));
      setOnRequest(false);
    };

    getData();
  }, [dispatch]);

  if (!app && !onRequest) {
    notFound();
  }

  const onAddClick = async () => {
    try {
      if (isSelectedApp) {
        onRemoveSelectedApps();
        return;
      }

      setOnRequest(true);

      const payload = {
        id: app?.id,
        name: app?.name,
        headerImage: app?.headerImage || "",
      };

      await selectedApps.add(payload);
      setIsSelectedApp(true);
      setOnRequest(false);
      toast.success("Berhasil menambahkan aplikasi ke multi rekomendasi");
    } catch (err) {
      toast.error("Gagal menambahkan aplikasi ke multi rekomendasi");
    }
  };

  const onRemoveSelectedApps = async () => {
    try {
      if (onRequest) return;
      setOnRequest(true);
      await selectedApps.remove(params.slug);
      setOnRequest(false);
      setIsSelectedApp(false);
      toast.success("Berhasil menghapus aplikasi dari multi rekomendasi");
    } catch (err) {
      toast.error("Gagal menghapus aplikasi dari multi rekomendasi");
    }
  };

  return (
    app && (
      <>
        <ImageHeader imgPath={app?.screenshots || ""} />
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
                  src={app.headerImage}
                  alt={`${app.name}-thumb`}
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
                    {app.name}
                  </Typography>
                  <Stack direction="row" spacing={1}>
                    <LoadingButton
                      variant="contained"
                      sx={{
                        width: "max-content",
                        "& .MuiButton-startIcon": { marginRight: "0" },
                      }}
                      size="large"
                      loadingPosition="start"
                      loading={onRequest}
                      onClick={onAddClick}
                      startIcon={isSelectedApp ? <MdLibraryAddCheck /> : <MdLibraryAdd />}
                    >
                      <span>{isSelectedApp ? "Added" : "Add To List"}</span>
                    </LoadingButton>
                  </Stack>
                  <Container header="Informasi Dasar">
                    <Typography variant="body1" sx={{ ...uiConfigs.style.typoLines(20) }}>
                      <strong>Price : </strong>
                      {app.price && app?.price <= 0
                        ? "Gratis"
                        : new Intl.NumberFormat("id-ID", {
                            style: "currency",
                            currency: "IDR",
                          }).format(app.price || 0)}
                      <br />
                      <strong>Tanggal Rilis : </strong>
                      {dateFormatFromIsoString(app.releaseDate)}
                      <br />
                      <strong>Pengembang : </strong>
                      {app.developers}
                      <br />
                      <strong>Penerbit : </strong>
                      {app.publishers}
                      <br />
                      <strong>Sistem Operasi Yang Didukung :</strong>
                      <br />
                      {app.windows && <FaWindows size={30} style={{ display: "inline" }} />}
                      {app.mac && <FaApple size={30} style={{ display: "inline" }} />}
                      {app.linux && <FaLinux size={30} style={{ display: "inline" }} />}
                    </Typography>
                  </Container>
                </Stack>
              </Box>
            </Box>
            {app.movies && (
              <Container header="Trailer Aplikasi">
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
                    src={app.movies}
                    title={app.id}
                    style={{ border: 0, width: "90vw", height: "100vh", display: "block" }}
                  ></iframe>
                </Box>
              </Container>
            )}
            <Container header="Tentang Aplikasi">
              <p style={{ textAlign: "justify", textIndent: "2rem" }}>{app.description}</p>
            </Container>
            <Container header="galeri aplikasi">
              <img
                style={{
                  width: "100%",
                  height: "100vh",
                  objectFit: "contain",
                }}
                src={app.screenshots}
                alt={`${app.name}-screenshots`}
              />
            </Container>
            <Container header="Kebutuhan Sistem Minimum ">
              <Typography variant="body1" sx={{ ...uiConfigs.style.typoLines(10) }}>
                <strong>Prosesor : </strong>
                Kecepatan {app.minCpuSpeed.toFixed(2)} GHz ({app.minCores} Core)
                <br />
                <strong>Memory : </strong>
                {app.minRam} GB RAM
                <br />
                <strong>Kartu Grafis : </strong>
                Kecepatan {app.minGpuBoostClock.toFixed(2)} MHz ({app.minGpuMemory} GB)
                <br />
                <strong>DirectX : </strong>
                Versi {app.minDirectX}
                <br />
                <strong>OpenGL : </strong>
                Versi {app.minOpenGl}
                <br />
                <strong>Penyimpanan Tersedia: </strong>
                {app.minStorage} GB
                <br />
                <strong>Versi Windows : </strong>
                {app.minOs.name}
                <br />
              </Typography>
            </Container>
            <Container header="rekomendasi laptop">
              <LaptopMediaSlide data={laptops} />
            </Container>
            <Container header="lebih banyak aplikasi">
              <AppMediaSlide data={randomApps} />
            </Container>
          </Box>
        </Box>
      </>
    )
  );
}
