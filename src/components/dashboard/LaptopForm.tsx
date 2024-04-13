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
import { getManyCpu } from "@/api/modules/cpu.api";
import { getManyGpu } from "@/api/modules/gpu.api";
import { getManyBrand } from "@/api/modules/brand.api";
import { getManyWindows } from "@/api/modules/windows.api";
import React, { FormEvent, useEffect, useState } from "react";
import { Windows } from "@/types/windows";
import { toast } from "react-toastify";
import { createOneLaptop, updateOneLaptop } from "@/api/modules/laptop.api";
import { LaptopFormProps, Laptop } from "@/types/laptop";
import { LoadingButton } from "@mui/lab";
import { Gallery } from "@/types/galleries";
import { Cpu } from "@/types/cpu";
import { Brand } from "@/types/brand";
import { Gpu } from "@/types/gpu";

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

const LaptopForm = ({ data }: { data?: Laptop }) => {
  const [cpuList, setCpuList] = useState<Cpu[]>([]);
  const [gpuList, setGpuList] = useState<Gpu[]>([]);
  const [brandList, setBrandList] = useState<Brand[]>([]);
  const [windowsList, setWindowsList] = useState<Windows[]>([]);
  const [onRequest, setOnRequest] = useState<boolean>(false);
  const [winId, setWinId] = useState<string>(data?.winId || "");
  const [cpuId, setCpuId] = useState<string>(data?.cpuId || "");
  const [gpuId, setGpuId] = useState<string>(data?.gpuId || "");
  const [brandId, setBrandId] = useState<string>(data?.brandId || "");
  const [name, setName] = useState<string>(data?.name || "");
  const [ram, setRam] = useState<number>(data?.ram || 0);
  const [ssdStorage, setSsdStorage] = useState<number>(data?.ssdStorage || 0);
  const [hddStorage, setHddStorage] = useState<number>(data?.hddStorage || 0);
  const [price, setPrice] = useState<number>(data?.price || 0);
  const [displayName, setDisplayName] = useState<string>(data?.displayName || "");
  const [displaySize, setDisplaySize] = useState<number>(data?.displaySize || 0);
  const [displayResolution, setDisplayResolution] = useState<string>(data?.displayResolution || "");
  const [panelType, setPanelType] = useState<string>(data?.panelType || "");
  const [panelCode, setPanelCode] = useState<number>(data?.panelCode || 0);
  const [refreshRate, setRefreshRate] = useState<number>(data?.refreshRate || 60);
  const [weight, setWeight] = useState<number>(data?.weight || 0);
  const [osEdition, setOsEdition] = useState<string>(data?.osEdition || "HOME");
  const [thumb, setThumb] = useState<string>(data?.thumb || "");
  const [gallery, setGallery] = useState<Array<Gallery>>(data?.galleries || []);
  const [videos, setVideos] = useState<string>(data?.thumb || "");

  const router = useRouter();

  const getCpu = async () => {
    const { cpus, message } = await getManyCpu();
    if (cpus) {
      setCpuList(cpus);
      return;
    }
    toast.error(message);
  };
  const getGpu = async () => {
    const { gpus, message } = await getManyGpu();
    if (gpus) {
      setGpuList(gpus);
      return;
    }
    toast.error(message);
  };
  const getBrands = async () => {
    const { brands, message } = await getManyBrand();
    if (brands) {
      setBrandList(brands);
      return;
    }
    toast.error(message);
  };
  const getWindows = async () => {
    const { windows, message } = await getManyWindows();
    if (windows) {
      setWindowsList(windows);
      return;
    }
    toast.error(message);
  };

  const getLaptopComponents = async () => {
    await getCpu();
    await getGpu();
    await getBrands();
    await getWindows();
    setOnRequest(false);
  };

  useEffect(() => {
    setOnRequest(true);
    getLaptopComponents();
  }, []);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setOnRequest(true);
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const token = localStorage.getItem("authtoken");
    const laptopData = formData as LaptopFormProps;

    if (token) {
      if (data?.id) {
        const { message, laptop } = await updateOneLaptop(data.id, laptopData, token);
        if (laptop) {
          toast.success(message);
          return router.push("/admin/dashboard/applications");
        }
        toast.error(message);
      } else {
        const { message, laptop } = await createOneLaptop(laptopData, token);
        if (laptop) {
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

        <FormGrid item xs={12} md={6}>
          <FormControl fullWidth sx={{ minWidth: 50 }}>
            <InputLabel id="cpu">Processor / CPU</InputLabel>
            <Select
              id="cpu"
              name="cpuId"
              value={cpuId}
              labelId="cpu-label"
              label="Processor / CPU"
              onChange={(e) => {
                setCpuId(e.target.value);
              }}
            >
              {cpuList.map((cpu, index) => {
                return (
                  <MenuItem selected={cpu.id === cpuId} key={index} value={cpu.id}>
                    {cpu.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </FormGrid>
        <FormGrid item xs={12} md={6}>
          <FormControl fullWidth sx={{ minWidth: 50 }}>
            <InputLabel id="gpu">GPU / VGA</InputLabel>
            <Select
              id="gpu"
              name="gpuId"
              value={gpuId}
              labelId="gpu-label"
              label="GPU / VGA"
              onChange={(e) => {
                setGpuId(e.target.value);
              }}
            >
              {gpuList.map((gpu, index) => {
                return (
                  <MenuItem selected={gpu.id === gpuId} key={index} value={gpu.id}>
                    {gpu.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </FormGrid>

        <FormGrid item xs={12} md={6}>
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

        <FormGrid item xs={12} md={6}>
          <FormControl fullWidth sx={{ minWidth: 50 }}>
            <InputLabel id="brand">Brand</InputLabel>
            <Select
              id="brand"
              name="brandId"
              value={brandId}
              labelId="brand-label"
              label="Brand"
              onChange={(e) => {
                setBrandId(e.target.value);
              }}
            >
              {brandList.map((brand, index) => {
                return (
                  <MenuItem selected={brand.id === brandId} key={index} value={brand.id}>
                    {brand.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </FormGrid>

        <FormGrid item xs={6} md={3}>
          <FormLabel htmlFor="ram">RAM</FormLabel>
          <TextField
            id="ram"
            name="ram"
            type="number"
            required
            value={ram}
            onChange={(e) => {
              setRam(Number(e.target.value));
            }}
          />
        </FormGrid>

        <FormGrid item xs={6} md={3}>
          <FormLabel htmlFor="ssd-storage">SSD Storage</FormLabel>
          <TextField
            id="ssd-storage"
            name="ssdStorage"
            type="number"
            required
            value={ssdStorage}
            onChange={(e) => {
              setSsdStorage(Number(e.target.value));
            }}
          />
        </FormGrid>

        <FormGrid item xs={6} md={3}>
          <FormLabel htmlFor="hdd-storage">HDD Storage</FormLabel>
          <TextField
            id="hdd-storage"
            name="hddStorage"
            type="number"
            required
            value={hddStorage}
            onChange={(e) => {
              setHddStorage(Number(e.target.value));
            }}
          />
        </FormGrid>

        <FormGrid item xs={6} md={3}>
          <FormLabel htmlFor="price">Price</FormLabel>
          <TextField
            id="price"
            name="price"
            type="number"
            required
            value={price}
            onChange={(e) => {
              setPrice(Number(e.target.value));
            }}
          />
        </FormGrid>

        <FormGrid item xs={6} md={3}>
          <FormLabel htmlFor="display-name">Display Name</FormLabel>
          <TextField
            id="display-name"
            name="displayName"
            type="text"
            required
            value={displayName}
            onChange={(e) => {
              setDisplayName(e.target.value);
            }}
          />
        </FormGrid>

        <FormGrid item xs={6} md={3}>
          <FormLabel htmlFor="display-size">Display Size</FormLabel>
          <TextField
            id="display-size"
            name="displaySize"
            type="number"
            required
            value={displaySize}
            onChange={(e) => {
              setDisplaySize(Number(e.target.value));
            }}
          />
        </FormGrid>

        <FormGrid item xs={6} md={3}>
          <FormLabel htmlFor="panel-type">Panel Type</FormLabel>
          <TextField
            id="panel-type"
            name="panelType"
            type="text"
            required
            value={panelType}
            onChange={(e) => {
              setPanelType(e.target.value);
            }}
          />
        </FormGrid>

        <FormGrid item xs={6} md={3}>
          <FormLabel htmlFor="panel-type">Panel Code</FormLabel>
          <TextField
            id="panel-code"
            name="panelCode"
            type="number"
            required
            value={panelCode}
            onChange={(e) => {
              setPanelCode(Number(e.target.value));
            }}
          />
        </FormGrid>

        <FormGrid item xs={6} md={3}>
          <FormLabel htmlFor="panel-type">Refresh Rate</FormLabel>
          <TextField
            id="refresh-rate"
            name="refreshRate"
            type="number"
            required
            value={refreshRate}
            onChange={(e) => {
              setRefreshRate(Number(e.target.value));
            }}
          />
        </FormGrid>

        <FormGrid item xs={6} md={3}>
          <FormLabel htmlFor="weight">Weight</FormLabel>
          <TextField
            id="weight"
            name="weight"
            type="number"
            required
            value={weight}
            onChange={(e) => {
              setWeight(Number(e.target.value));
            }}
          />
        </FormGrid>

        <FormGrid item xs={12}>
          <ImageInput name="thumb" label="Thumbnail" id="thumb" src={thumb} />
        </FormGrid>
        {/* <FormGrid item xs={12}>
          <ImageInput name="gallery" label="Gallery" id="gallery" src={gallery} />
        </FormGrid> */}
        <FormGrid item xs={12}>
          <VideosInput name="videos" label="Videos" id="videos" src={videos} />
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

export default LaptopForm;
