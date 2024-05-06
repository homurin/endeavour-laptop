"use client";

import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Grid,
  FormLabel,
} from "@mui/material";
import { styled } from "@mui/system";
import { useRouter } from "next/navigation";
import Select from "@mui/material/Select";
import { getManyWindows } from "@/api/modules/windows.api";
import React, { FormEvent, useEffect, useState } from "react";
import { Windows } from "@/types/windows";
import { toast } from "react-toastify";
import { createOneApp, updateOneApp } from "@/api/modules/app.api";
import { ApplicationForm, Apps } from "@/types/application";
import { LoadingButton } from "@mui/lab";
import { getNumberValue } from "@/utils/textFieldValidation";
import { dateFormatFromIsoString } from "@/utils/parseDate";
import { ImageInput, VideosInput } from "./FileUpload";

const FormGrid = styled(Grid)(() => ({ display: "flex", flexDirection: "column" }));

const AppForm = ({ data }: { data?: Apps }) => {
  const [windowsList, setWindowsList] = useState<Windows[]>([]);
  const [onRequest, setOnRequest] = useState<boolean>(false);
  const [winId, setWinId] = useState<string>(data?.winId || "");
  const [name, setName] = useState<string>(data?.name || "");
  const [price, setPrice] = useState<number>(data?.price || 0);
  const [date, setDate] = useState<string>(
    dateFormatFromIsoString(data?.releaseDate || new Date())
  );
  const [isoDate, setIsoDate] = useState<Date>(new Date());
  const [description, setDescription] = useState<string>(data?.description || "");
  const [minCpuSpeed, setMinCpuSpeed] = useState<number>(data?.minCpuSpeed || 0);
  const [minCpuCores, setMinCpuCores] = useState<number>(data?.minCores || 0);
  const [minGpuBoostClock, setMinGpuBoostClock] = useState<number>(data?.minGpuBoostClock || 0);
  const [minGpuMemory, setMinGpuMemory] = useState<number>(data?.minGpuMemory || 0);
  const [minDirectX, setMinDirectX] = useState<number>(data?.minDirectX || 12);
  const [minOpenGl, setMinOpenGl] = useState<number>(data?.minOpenGl || 4.6);
  const [minRam, setMinRam] = useState<number>(data?.minRam || 0);
  const [minStorage, setMinStorage] = useState<number>(data?.minStorage || 0);
  const [developers, setDevelopers] = useState<string>(data?.developers || "");
  const [publishers, setPublishers] = useState<string>(data?.publishers || "");
  const [windows, setWindows] = useState<boolean>(data?.windows || true);
  const [linux, setLinux] = useState<boolean>(data?.linux || false);
  const [mac, setMac] = useState<boolean>(data?.mac || false);
  const [headerImage, setHeaderImage] = useState<string>(data?.headerImage || "");
  const [screenshots, setScreenshots] = useState<string>(data?.screenshots || "");
  const [movies, setMovies] = useState<string>(data?.movies || "");
  const [removeHeaderImageId, setRemoveHeaderImageIdId] = useState<string>("");
  const [removeScreenshotsId, setRemoveScreenshotsIdId] = useState<string>("");
  const [removeMoviesId, setRemoveMoviesIdId] = useState<string>("");

  const router = useRouter();

  const getWindows = async () => {
    const { windows, message } = await getManyWindows();
    if (windows) {
      setWindowsList(windows);
      return;
    }
    toast.error(message);
  };

  useEffect(() => {
    getWindows();
  }, []);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setOnRequest(true);
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const token = localStorage.getItem("authtoken");
    const appData = formData as ApplicationForm;
    appData.append("releaseDate", isoDate.toISOString());

    if (removeHeaderImageId) {
      appData.append("removeHeaderImageId", removeHeaderImageId);
    }
    if (removeScreenshotsId) {
      appData.append("removeScreenshotsId", removeScreenshotsId);
    }
    if (removeMoviesId) {
      appData.append("removeMoviesId", removeMoviesId);
    }

    if (token) {
      if (data?.id) {
        const { message, app } = await updateOneApp(data.id, appData, token);
        if (app) {
          setOnRequest(false);
          return toast.success(message);
        }
        toast.error(message);
      } else {
        const { message, app } = await createOneApp(appData, token);
        if (app) {
          toast.success(message);
          return router.push("/admin/dashboard/applications");
        }
        toast.error(message);
      }
    }
    setOnRequest(false);
  };

  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      sx={{
        backgroundColor: "white",
        padding: 2,
        margin: 2,
        display: "flex",
        flexDirection: "column",
      }}
      noValidate
      autoComplete="off"
    >
      <Grid container spacing={3}>
        <FormGrid item xs={12}>
          <FormLabel htmlFor="name">Nama</FormLabel>
          <TextField
            id="name"
            name="name"
            value={name}
            required
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </FormGrid>
        <FormGrid item xs={6} md={4}>
          <FormLabel htmlFor="price">Harga</FormLabel>
          <TextField
            name="price"
            type="text"
            required
            value={price}
            onChange={(e) => {
              getNumberValue(e.target.value, setPrice);
            }}
          />
        </FormGrid>
        <FormGrid item xs={6} md={4}>
          <FormLabel htmlFor="releaseDate">Tanggal Rilis</FormLabel>
          <TextField
            type="date"
            required
            value={date}
            onChange={(e) => {
              setIsoDate(new Date(e.target.value));
              setDate(e.target.value);
            }}
          />
        </FormGrid>
        <FormGrid item xs={12}>
          <FormLabel htmlFor="description">Deskripsi</FormLabel>
          <TextField
            name="description"
            multiline
            rows={4}
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </FormGrid>
        <FormGrid item xs={6} md={3}>
          <FormLabel htmlFor="min-cpu-speed">Kecepatan Minimum CPU (GHz)</FormLabel>
          <TextField
            name="minCpuSpeed"
            type="text"
            required
            value={minCpuSpeed}
            onChange={(e) => {
              getNumberValue(e.target.value, setMinCpuSpeed);
            }}
          />
        </FormGrid>
        <FormGrid item xs={6} md={3}>
          <FormLabel htmlFor="min-cpu-cores">Jumlah Minimum Core</FormLabel>
          <TextField
            name="minCores"
            type="text"
            required
            value={minCpuCores}
            onChange={(e) => {
              getNumberValue(e.target.value, setMinCpuCores);
            }}
          />
        </FormGrid>
        <FormGrid item xs={6} md={3}>
          <FormLabel htmlFor="min-gpu-boost-clock">GPU Boost Clock (MHz)</FormLabel>
          <TextField
            name="minGpuBoostClock"
            type="text"
            required
            value={minGpuBoostClock}
            onChange={(e) => {
              getNumberValue(e.target.value, setMinGpuBoostClock);
            }}
          />
        </FormGrid>
        <FormGrid item xs={6} md={3}>
          <FormLabel htmlFor="min-gpu-memory">Minimum VRAM (GB)</FormLabel>
          <TextField
            name="minGpuMemory"
            type="text"
            required
            value={minGpuMemory}
            onChange={(e) => {
              getNumberValue(e.target.value, setMinGpuMemory);
            }}
          />
        </FormGrid>
        <FormGrid item xs={6} md={3}>
          <FormLabel htmlFor="min-direct-x-version">Versi Minimum DirectX</FormLabel>
          <TextField
            name="minDirectX"
            type="text"
            required
            value={minDirectX}
            onChange={(e) => {
              getNumberValue(e.target.value, setMinDirectX);
            }}
          />
        </FormGrid>
        <FormGrid item xs={6} md={3}>
          <FormLabel htmlFor="min-open-gl-version">Versi Minimum OpenGL</FormLabel>
          <TextField
            name="minOpenGl"
            type="text"
            required
            value={minOpenGl}
            onChange={(e) => {
              getNumberValue(e.target.value, setMinOpenGl);
            }}
          />
        </FormGrid>
        <FormGrid item xs={6} md={3}>
          <FormLabel htmlFor="min-ram">Kapasitas Minimum RAM (GB)</FormLabel>
          <TextField
            name="minRam"
            type="text"
            required
            value={minRam}
            onChange={(e) => {
              getNumberValue(e.target.value, setMinRam);
            }}
          />
        </FormGrid>
        <FormGrid item xs={6} md={3}>
          <FormLabel htmlFor="min-storage">Penyimpanan Minimum (GB)</FormLabel>
          <TextField
            name="minStorage"
            type="text"
            required
            value={minStorage}
            onChange={(e) => {
              getNumberValue(e.target.value, setMinStorage);
            }}
          />
        </FormGrid>
        <FormGrid item xs={12} md={6}>
          <FormLabel htmlFor="developers">Pengembang</FormLabel>
          <TextField
            name="developers"
            required
            value={developers}
            onChange={(e) => {
              setDevelopers(e.target.value);
            }}
          />
        </FormGrid>
        <FormGrid item xs={12} md={6}>
          <FormLabel htmlFor="publishers">Penerbit</FormLabel>
          <TextField
            name="publishers"
            required
            value={publishers}
            onChange={(e) => {
              setPublishers(e.target.value);
            }}
          />
        </FormGrid>
        <FormGrid item xs={12}>
          <FormGroup>
            <InputLabel>Sistem Operasi Yang Didukung</InputLabel>
            <FormControlLabel
              control={
                <Checkbox
                  name="windows"
                  value={true}
                  checked={windows}
                  onChange={(e) => setWindows(!windows)}
                />
              }
              label="Windows"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="linux"
                  value={true}
                  checked={linux}
                  onChange={(e) => setLinux(!linux)}
                />
              }
              label="Linux"
            />
            <FormControlLabel
              control={
                <Checkbox name="mac" value={true} checked={mac} onChange={(e) => setMac(!mac)} />
              }
              label="Mac"
            />
          </FormGroup>
        </FormGrid>
        <FormGrid item xs={9}>
          <InputLabel id="windows">Versi Windows</InputLabel>
          <FormControl fullWidth sx={{ minWidth: 50, mt: 1 }}>
            <InputLabel id="windows">Windows</InputLabel>
            <Select
              id="windows"
              name="winId"
              value={winId}
              labelId="windows-label"
              label="Windows"
              onChange={(e) => {
                setWinId(e.target.value);
              }}
            >
              {windowsList.map((win, index) => {
                return (
                  <MenuItem selected={win.id === winId} key={index} value={win.id}>
                    {win.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </FormGrid>

        <FormGrid item xs={12}>
          <ImageInput
            name="headerImage"
            label="Thumbnail Aplikasi"
            id="header-image"
            src={headerImage}
            onRemove={() => {
              if (headerImage) {
                setRemoveHeaderImageIdId(data?.headerImageId || "1");
              }
            }}
          />
        </FormGrid>
        <FormGrid item xs={12}>
          <ImageInput
            name="screenshots"
            label="Screenshots"
            id="screenshots"
            src={screenshots}
            onRemove={() => {
              if (screenshots) {
                setRemoveScreenshotsIdId(data?.screenshotsId || "1");
              }
            }}
          />
        </FormGrid>
        <FormGrid item xs={12}>
          <VideosInput
            name="movies"
            label="Movies"
            id="movies"
            src={movies}
            onRemove={() => {
              if (movies) {
                setRemoveMoviesIdId(data?.moviesId || "1");
              }
            }}
          />
        </FormGrid>

        <FormGrid item xs={12} md={6}>
          <LoadingButton loading={onRequest} type="submit" variant="contained">
            {data?.id ? "Perbarui" : "Unggah"}
          </LoadingButton>
        </FormGrid>
      </Grid>
    </Box>
  );
};

export default AppForm;
