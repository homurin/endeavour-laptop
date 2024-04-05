"use client";

import { Box, TextField, Grid, Stack, Typography, Button } from "@mui/material";
import Link from "next/link";
import { LoadingButton } from "@mui/lab";
import { MdLibraryAdd } from "react-icons/md";
import { toast } from "react-toastify";
import uiConfigs from "@/configs/ui.config";
import Container from "@/components/common/Container";
import { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import SelectedAppMediaItem from "@/components/common/SelectedAppMediaItem";
import * as selectedApp from "@utils/selectedAppsUtils";
import type { SelectedAppsProps } from "@/utils/selectedAppsUtils";
import { Laptop } from "@/types/laptop";
import { getLaptopRecommendation } from "@/api/modules/laptop.api";
import LaptopMediaSlide from "@/components/common/LaptopMediaSlide";
import { MinimumAppsRequirements } from "@/types/application";
import { AppDispatch } from "@/redux/store";
import { setGlobalLoading } from "@/redux/features/globalLoadingSlice";

let timer: NodeJS.Timeout;
const timeout = 500;

export default function Page() {
  const useAppDispatch = useDispatch.withTypes<AppDispatch>();
  const dispatch = useAppDispatch();

  const [apps, setApps] = useState<SelectedAppsProps[]>([]);
  const [appsReq, setAppsReq] = useState<SelectedAppsProps[]>([]);
  const [query, setQuery] = useState<string>("");
  const [laptops, setLaptops] = useState<Array<Laptop>>([]);
  const [specReq, setSpecReq] = useState<MinimumAppsRequirements>();
  const [onClearAll, setOnClearAll] = useState<boolean>(false);

  const getLaptops = useCallback(async () => {
    if (appsReq.length > 0) {
      const appIds = apps.map((e) => e.id).filter((e) => typeof e === "string");
      const { message, laptops, specReq } = await getLaptopRecommendation(appIds as string[]);
      if (message !== "success") toast.error(message);
      if (laptops) setLaptops(laptops);
      if (specReq) setSpecReq(specReq);
    }
  }, [appsReq]);

  const getApps = useCallback(async () => {
    const apps = await selectedApp.get();
    setApps(apps);
    setAppsReq(apps);
    dispatch(setGlobalLoading(false));
  }, []);

  const searchByName = useCallback(async () => {
    const apps = await selectedApp.getByName(query);
    setApps(apps);
  }, [query]);

  useEffect(() => {
    if (appsReq.length === 0) {
      dispatch(setGlobalLoading(true));
    }
    if (query.length > 0) {
      searchByName();
      return;
    }
    getApps();
    getLaptops();
  }, [dispatch, query]);

  useEffect(() => {
    if (appsReq.length > 0) {
      getLaptops();
    }
  }, [appsReq]);

  const onQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    clearTimeout(timer);
    timer = setTimeout(() => {
      setQuery(newQuery);
    }, timeout);
  };

  const onRemoved = async (id: string) => {
    const filteredApps = apps?.filter((e) => e.id !== id);
    setApps(filteredApps);
    setAppsReq(filteredApps);
  };

  const onClickClear = async () => {
    if (onClearAll) return;
    if (apps && apps?.length < 1) {
      toast.error("application empty");
      return;
    }
    try {
      setOnClearAll(true);
      await selectedApp.removeAll();
      setApps([]);
      setAppsReq([]);
      setOnClearAll(false);
      toast.success("clear all applications success");
    } catch (err) {
      toast.error("clear all application failed");
    }
  };
  return appsReq && appsReq.length > 0 ? (
    <Box sx={{ color: "primary.contrastText", ...uiConfigs.style.mainContent }}>
      <Container header={`your selected applications`}>
        <Box sx={{ ...uiConfigs.style.mainContent }}>
          <Stack spacing={2}>
            <TextField
              sx={{ width: "100%", marginBottom: "1rem" }}
              placeholder="search your selected apps"
              color="success"
              onChange={onQueryChange}
              autoFocus
            />
            <LoadingButton variant="contained" loading={onClearAll} onClick={onClickClear}>
              <span>Clear All</span>
            </LoadingButton>
            {apps && apps.length > 0 ? (
              <Grid container spacing={1} sx={{ marginRight: "-8x!important" }}>
                {apps &&
                  apps.map((app, index) => {
                    return (
                      <Grid item xs={6} sm={4} md={3} key={index}>
                        <SelectedAppMediaItem media={app} onRemoved={onRemoved} />
                      </Grid>
                    );
                  })}
              </Grid>
            ) : (
              <Typography variant="body1" textAlign="center">
                Applications not found
              </Typography>
            )}
          </Stack>
        </Box>
      </Container>
      <Container header="minimum laptop requirements to run applications">
        <Box>
          <Typography variant="body1" component="div">
            <strong>Processor : </strong>
            {specReq?.cpuMaxSpeed.toFixed(2)} GHz Speed ({specReq?.cpuCores} Core)
          </Typography>
          <Typography variant="body1" component="div">
            <strong>Memory : </strong>
            {Math.floor(specReq?.ram || 0)} GB RAM
          </Typography>
          <Typography variant="body1" component="div">
            <strong>Graphics : </strong>
            {specReq?.gpuMaxSpeed.toFixed(2)} MHz Speed ({specReq?.gpuMemory} GB)
          </Typography>
          <Typography variant="body1" component="div">
            <strong>DirectX : </strong>
            Version {specReq?.directX}
          </Typography>
          <Typography variant="body1" component="div">
            <strong>OpenGL : </strong>
            Version {specReq?.openGl}
          </Typography>
          <Typography variant="body1" component="div">
            <strong>Storage : </strong>
            {Math.floor(specReq?.totalStorage || 0)} GB
          </Typography>
          <Typography variant="body1" component="div">
            <strong>OS : </strong>
            {specReq?.windowsName}
          </Typography>
        </Box>
      </Container>
      <Container header="laptop recommendation">
        {laptops && <LaptopMediaSlide data={laptops} />}
      </Container>
    </Box>
  ) : (
    <Container header="selected applications is empty">
      <Box sx={{ ...uiConfigs.style.mainContent }}>
        <Typography variant="h5" sx={{ fontWeight: 700, ...uiConfigs.style.typoLines(1, "left") }}>
          How to get laptop recommendation?
        </Typography>
        <Typography>
          1. Go to{"  "}
          <Button size="small" variant="contained" LinkComponent={Link} href="/applications">
            Applications
          </Button>
        </Typography>
        <Typography>
          2. Add Application To List <MdLibraryAdd style={{ display: "inline" }} />{" "}
        </Typography>
        <Typography>3. Go Back Here</Typography>
      </Box>
    </Container>
  );
}
