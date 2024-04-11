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
  Button,
} from "@mui/material";
import { styled } from "@mui/system";
import { FaWindows, FaApple, FaLinux } from "react-icons/fa";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { getManyWindows } from "@/api/modules/windows.api";
import React, { FormEvent, useCallback, useEffect, useState } from "react";
import { Windows } from "@/types/windows";
import { toast } from "react-toastify";

const FormGrid = styled(Grid)(() => ({ display: "flex", flexDirection: "column" }));

const ScreenshotsImage = ({ name }: { name: string }) => {
  const [fileUrl, setFileUrl] = useState<string>();

  return (
    <>
      <input
        type="file"
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
      {fileUrl && <img className="w-52" src={fileUrl} />}
    </>
  );
};

const Page = () => {
  const [query, setQuery] = useState<string>("");
  const [windows, setWindows] = useState<Windows[]>([]);
  const [screenshots, setScreenshots] = useState<File>();
  const [screenshotsUrl, setScreenshotsUrl] = useState<string>("");

  const fetchCpu = useCallback(async () => {
    const { windows, message } = await getManyWindows(query);
    if (windows) {
      setWindows(windows);
      return;
    }
    toast.error(message);
  }, [query]);

  useEffect(() => {
    const screenshotsImage = () => {
      if (screenshots) {
        const imgSrc = URL.createObjectURL(screenshots);
        console.info(imgSrc);
        setScreenshotsUrl(imgSrc);
      }
    };
    screenshotsImage();
    fetchCpu();
  }, [query, screenshots]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    for (const x of formData.entries()) {
      console.info(x);
    }
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
          <FormLabel htmlFor="Name">Name</FormLabel>
          <TextField name="name" required />
        </FormGrid>
        <FormGrid item xs={12} md={4}>
          <FormLabel htmlFor="Price">Price</FormLabel>
          <TextField name="price" type="number" required />
        </FormGrid>
        <FormGrid item xs={12}>
          <FormLabel htmlFor="Description">Description</FormLabel>
          <TextField name="description" multiline rows={4} />
        </FormGrid>
        <FormGrid item xs={6} md={3}>
          <FormLabel htmlFor="Min CPU Speed">Min CPU Speed</FormLabel>
          <TextField name="minCpuSpeed" type="number" required />
        </FormGrid>
        <FormGrid item xs={6} md={3}>
          <FormLabel htmlFor="Min CPU Cores">Min CPU Cores</FormLabel>
          <TextField name="minCpuCores" type="number" required />
        </FormGrid>
        <FormGrid item xs={6} md={3}>
          <FormLabel htmlFor="Min GPU Boost Clock">Min GPU Boost Clock</FormLabel>
          <TextField name="minGpuBoostClock" type="number" required />
        </FormGrid>
        <FormGrid item xs={6} md={3}>
          <FormLabel htmlFor="Min GPU Memory / VRAM">Min GPU Memory / VRAM</FormLabel>
          <TextField name="minGpuMemory" type="number" required />
        </FormGrid>
        <FormGrid item xs={6} md={3}>
          <FormLabel htmlFor="Min Direct X Version">Min Direct X Version</FormLabel>
          <TextField name="minDirectX" type="number" required />
        </FormGrid>
        <FormGrid item xs={6} md={3}>
          <FormLabel htmlFor="Min OpenGL Version">Min OpenGL Version</FormLabel>
          <TextField name="minOpenGl" type="number" required />
        </FormGrid>
        <FormGrid item xs={6} md={3}>
          <FormLabel htmlFor="Min RAM">Min RAM</FormLabel>
          <TextField name="minRam" type="number" required />
        </FormGrid>
        <FormGrid item xs={6} md={3}>
          <FormLabel htmlFor="Min Storage">Min Storage</FormLabel>
          <TextField name="minStorage" type="number" required />
        </FormGrid>
        <FormGrid item xs={12} md={6}>
          <FormLabel htmlFor="Developers">Developers</FormLabel>
          <TextField name="developers" required />
        </FormGrid>
        <FormGrid item xs={12} md={6}>
          <FormLabel htmlFor="Publishers">Publishers</FormLabel>
          <TextField name="publishers" required />
        </FormGrid>
        <FormGrid item xs={12}>
          <FormGroup>
            <InputLabel>Supported Operating System</InputLabel>
            <FormControlLabel
              control={<Checkbox name="windows" value={true} defaultChecked />}
              label="Windows"
            />
            <FormControlLabel control={<Checkbox name="linux" value={true} />} label="Linux" />
            <FormControlLabel control={<Checkbox name="mac" value={true} />} label="Mac" />
          </FormGroup>
        </FormGrid>
        <FormGrid item xs={12}>
          <FormControl fullWidth sx={{ minWidth: 50 }}>
            <InputLabel id="cpu">Windows</InputLabel>
            <Select id="cpu" name="windowsId" value="" labelId="cpu" label="Windows">
              {windows.map((win, index) => {
                return (
                  <MenuItem key={index} value={win.id}>
                    {win.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </FormGrid>
        <FormGrid item xs={12}>
          <ScreenshotsImage name="screenshots" />
        </FormGrid>
        {/* <FormGrid item xs={12}>
          <FormLabel htmlFor="headerImage">Header Image</FormLabel>
          <input type="file" name="headerImage" required />
        </FormGrid>
        <FormGrid item xs={12}>
          <FormLabel htmlFor="screenshots">Screenshots</FormLabel>
          <input
            type="file"
            name="screenshots"
            multiple={false}
            onChange={(e) => {
              if (e.target.files) {
                setScreenshots(e.target.files[0]);
              }
            }}
            required
          />
          {screenshotsUrl && <img className="w-52" src={screenshotsUrl} />}
        </FormGrid>
        <FormGrid item xs={12}>
          <FormLabel htmlFor="Publishers">Movies</FormLabel>
          <input type="file" name="movies" required />
        </FormGrid> */}
        <FormGrid item xs={12} md={6}>
          <Button type="submit" variant="contained">
            Create
          </Button>
        </FormGrid>
      </Grid>
    </Box>
  );
};

export default Page;
