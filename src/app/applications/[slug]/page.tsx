"use client";

import { Box, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import Container from "@/components/common/Container";
import ImageHeader from "@/components/common/ImageHeader";
import uiConfigs from "@/configs/ui.config";
import { getRandomApps, getOneApp } from "@/api/modules/app.api";
import { getLaptopRecommendation } from "@/api/modules/laptop.api";
import { setGlobalLoading } from "@/redux/features/globalLoadingSlice";
import LaptopMediaSlide from "@/components/common/LaptopMediaSlide";

import type { AppDispatch, RootState } from "@/redux/store";
import { Apps } from "@/types/application";
import { Laptop } from "@/types/laptop";
import AppMediaSlide from "@/components/common/AppMediaSlide";
import { dateFormatFromIsoString } from "@utils/parseDate";

export default function Page({ params }: { params: { slug: string } }) {
  const useAppSelector = useSelector.withTypes<RootState>();
  const useAppDispatch = useDispatch.withTypes<AppDispatch>();
  const dispatch = useAppDispatch();

  const [app, setApp] = useState<Apps>();
  const [laptops, setLaptops] = useState<Array<Laptop>>([]);
  const [randomApps, setRandomApps] = useState<Array<Apps>>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const getData = async () => {
      dispatch(setGlobalLoading(true));
      const { message: appMsg, app } = await getOneApp(params.slug);
      const { message: appsMsg, apps } = await getRandomApps();

      if (appMsg !== "success") toast.error(appMsg);
      if (appsMsg !== "success") toast.error(appsMsg);
      if (app) setApp(app);
      if (apps) setRandomApps(apps);

      const { message: laptopsMsg, laptops } = await getLaptopRecommendation([app.id]);

      if (laptopsMsg !== "success") toast.error(laptopsMsg);
      if (laptops) setLaptops(laptops);

      dispatch(setGlobalLoading(false));
    };

    getData();
  }, [dispatch]);

  return app ? (
    <>
      <ImageHeader imgPath={app.screenshots || ""} />
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
                <Container header="Basic Information">
                  <Typography variant="body1" sx={{ ...uiConfigs.style.typoLines(20) }}>
                    <strong>Release Date : </strong>
                    {dateFormatFromIsoString(app.releaseDate)}
                    <br />
                    <strong>Developer : </strong>
                    {app.developers}
                    <br />
                    <strong>Publisher : </strong>
                    {app.publishers}
                    <br />
                    <strong>Website : </strong>
                    <a href={app.website}>{app.website}</a>
                    <br />
                    <strong>Link : </strong>
                    <a href={app.link}>{app.link}</a>
                    <br />
                  </Typography>
                </Container>
              </Stack>
            </Box>
          </Box>

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
                allow="autoplay"
                src={app.movies}
                title={app.id}
                style={{ border: 0, width: "90vw", height: "100vh", display: "block" }}
              ></iframe>
            </Box>
          </Container>
          <Container header="About This Application">
            <p style={{ textAlign: "justify", textIndent: "2rem" }}>{app.description}</p>
          </Container>
          <Container header="backdrops">
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
          <Container header="Minimum System Requirements">
            <Typography variant="body1" sx={{ ...uiConfigs.style.typoLines(10) }}>
              <strong>Processor : </strong>
              {app.minCpuSpeed.toFixed(2)} GHz Speed ({app.minCores} Core)
              <br />
              <strong>Memory : </strong>
              {app.minRam} GB RAM
              <br />
              <strong>Graphics : </strong>
              {app.minGpuBoostClock.toFixed(2)} MHz Speed ({app.minGpuMemory} GB)
              <br />
              <strong>DirectX : </strong>
              Version {app.minDirectX}
              <br />
              <strong>OpenGL : </strong>
              Version {app.minOpenGl}
              <br />
              <strong>Storage : </strong>
              {app.minStorage} GB
              <br />
              <strong>OS : </strong>
              Version {app.minOs.name}
              <br />
            </Typography>
          </Container>
          <Container header="laptops recommendation">
            <LaptopMediaSlide data={laptops} />
          </Container>
          <Container header="get more applications">
            <AppMediaSlide data={randomApps} />
          </Container>
        </Box>
      </Box>
    </>
  ) : (
    <></>
  );
}
