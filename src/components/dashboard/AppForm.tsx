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
import { dateFormatFromIsoString } from "@/utils/parseDate";

const FormGrid = styled(Grid)(() => ({ display: "flex", flexDirection: "column" }));

const ImageInput = ({
  name,
  src,
  label,
  id,
}: {
  name: string;
  src?: string;
  label?: string;
  id?: string;
}) => {
  const [fileUrl, setFileUrl] = useState<string>(src || "");

  return (
    <>
      <FormLabel htmlFor={id}>{label}</FormLabel>
      <input
        id={id}
        type="file"
        accept="image/*"
        name={name}
        multiple={false}
        onChange={(e) => {
          if (e.target.files) {
            const file = e.target.files[0];
            setFileUrl(URL.createObjectURL(file));
          }
        }}
        required
      />
      {fileUrl && <img className="w-1/2" src={fileUrl} />}
    </>
  );
};

const VideosInput = ({
  name,
  src,
  label,
  id,
}: {
  name: string;
  src?: string;
  label?: string;
  id?: string;
}) => {
  const [fileUrl, setFileUrl] = useState<string>(src || "");

  return (
    <>
      <FormLabel htmlFor={id}>{label}</FormLabel>
      <input
        id={id}
        type="file"
        accept="video/*"
        name={name}
        multiple={false}
        onChange={(e) => {
          if (e.target.files) {
            const file = e.target.files[0];
            setFileUrl(URL.createObjectURL(file));
          }
        }}
        required
      />
      {fileUrl && <iframe src={fileUrl} className="h-96"></iframe>}
    </>
  );
};

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
  const [bitOs, setBitOs] = useState<number>(data?.bitOs || 64);

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
    appData?.append("releaseDate", isoDate.toISOString());

    if (token) {
      if (data?.id) {
        const { message, app } = await updateOneApp(data.id, appData, token);
        if (app) {
          toast.success(message);
          return router.push("/admin/dashboard/applications");
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
          <FormLabel htmlFor="name">Name</FormLabel>
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
          <FormLabel htmlFor="price">Price</FormLabel>
          <TextField
            name="price"
            type="number"
            required
            value={price}
            onChange={(e) => {
              setPrice(Number(e.target.value));
            }}
          />
        </FormGrid>
        <FormGrid item xs={6} md={4}>
          <FormLabel htmlFor="releaseDate">Release Date</FormLabel>
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
          <FormLabel htmlFor="description">Description</FormLabel>
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
          <FormLabel htmlFor="min-cpu-speed">Min CPU Speed</FormLabel>
          <TextField
            name="minCpuSpeed"
            type="number"
            required
            value={minCpuSpeed}
            onChange={(e) => {
              setMinCpuSpeed(Number(e.target.value));
            }}
          />
        </FormGrid>
        <FormGrid item xs={6} md={3}>
          <FormLabel htmlFor="min-cpu-cores">Min CPU Cores</FormLabel>
          <TextField
            name="minCores"
            type="number"
            required
            value={minCpuCores}
            onChange={(e) => {
              setMinCpuCores(Number(e.target.value));
            }}
          />
        </FormGrid>
        <FormGrid item xs={6} md={3}>
          <FormLabel htmlFor="min-gpu-boost-clock">Min GPU Boost Clock</FormLabel>
          <TextField
            name="minGpuBoostClock"
            type="number"
            required
            value={minGpuBoostClock}
            onChange={(e) => {
              setMinGpuBoostClock(Number(e.target.value));
            }}
          />
        </FormGrid>
        <FormGrid item xs={6} md={3}>
          <FormLabel htmlFor="min-gpu-memory">Min GPU Memory / VRAM</FormLabel>
          <TextField
            name="minGpuMemory"
            type="number"
            required
            value={minGpuMemory}
            onChange={(e) => {
              setMinGpuMemory(Number(e.target.value));
            }}
          />
        </FormGrid>
        <FormGrid item xs={6} md={3}>
          <FormLabel htmlFor="min-direct-x-version">Min Direct X Version</FormLabel>
          <TextField
            name="minDirectX"
            type="number"
            required
            value={minDirectX}
            onChange={(e) => {
              setMinDirectX(Number(e.target.value));
            }}
          />
        </FormGrid>
        <FormGrid item xs={6} md={3}>
          <FormLabel htmlFor="min-open-gl-version">Min OpenGL Version</FormLabel>
          <TextField
            name="minOpenGl"
            type="number"
            required
            value={minOpenGl}
            onChange={(e) => {
              setMinOpenGl(Number(e.target.value));
            }}
          />
        </FormGrid>
        <FormGrid item xs={6} md={3}>
          <FormLabel htmlFor="min-ram">Min RAM</FormLabel>
          <TextField
            name="minRam"
            type="number"
            required
            value={minRam}
            onChange={(e) => {
              setMinRam(Number(e.target.value));
            }}
          />
        </FormGrid>
        <FormGrid item xs={6} md={3}>
          <FormLabel htmlFor="min-storage">Min Storage</FormLabel>
          <TextField
            name="minStorage"
            type="number"
            required
            value={minStorage}
            onChange={(e) => {
              setMinStorage(Number(e.target.value));
            }}
          />
        </FormGrid>
        <FormGrid item xs={12} md={6}>
          <FormLabel htmlFor="developers">Developers</FormLabel>
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
          <FormLabel htmlFor="publishers">Publishers</FormLabel>
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
            <InputLabel>Supported Operating System</InputLabel>
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
          <FormControl fullWidth sx={{ minWidth: 50 }}>
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
        <FormGrid item xs={3}>
          <FormControl fullWidth sx={{ minWidth: 50 }}>
            <InputLabel id="bitOs">OS Bit</InputLabel>
            <Select
              id="bitOs"
              name="bitOs"
              value={bitOs}
              label="Bit OS"
              labelId="bit-os-label"
              onChange={(e) => {
                setBitOs(Number(e.target.value));
              }}
            >
              <MenuItem selected={bitOs == 32} value={32}>
                32
              </MenuItem>
              <MenuItem selected={bitOs == 64} value={64}>
                64
              </MenuItem>
            </Select>
          </FormControl>
        </FormGrid>
        <FormGrid item xs={12}>
          <ImageInput name="headerImage" label="Header Image" id="header-image" src={headerImage} />
        </FormGrid>
        <FormGrid item xs={12}>
          <ImageInput name="screenshots" label="Screenshots" id="screenshots" src={screenshots} />
        </FormGrid>
        <FormGrid item xs={12}>
          <VideosInput name="movies" label="Movies" id="movies" src={movies} />
        </FormGrid>

        <FormGrid item xs={12} md={6}>
          <LoadingButton loading={onRequest} type="submit" variant="contained">
            {data?.id ? "Update" : "Create"}
          </LoadingButton>
        </FormGrid>
      </Grid>
    </Box>
  );
};

export default AppForm;
