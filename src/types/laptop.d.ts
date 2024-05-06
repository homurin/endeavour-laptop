import { Brand } from "./brand";
import { Cpu } from "./cpu";
import { Gallery } from "./galleries";
import { Gpu } from "./gpu";
import { Windows } from "./windows";

export enum PanelType {
  CRT = "CRT",
  LCD = "LCD",
  LED = "LED",
  TN = "TN",
  IPS = "IPS",
  VA = "VA",
  OLED = "OLED",
  AMOLED = "AMOLED",
}

export enum WindowsEdition {
  HOME = "HOME",
  S = "S",
  PRO = "PRO",
}

export interface Laptop {
  id: string;
  cpu: Cpu;
  gpu: Gpu;
  brand: Brand;
  galleries: Array<Gallery>;
  windowsVersion: Windows;
  adminId: string;
  cpuId?: string;
  gpuId?: string;
  winId?: string;
  thumbId?: string;
  videosId?: string;
  brandId?: string;
  name: string;
  ram: number;
  ssdStorage: number;
  hddStorage: number;
  totalStorage: number;
  price: number;
  displayName?: string;
  displaySize?: number;
  displayResolution?: string;
  panelType?: PanelType;
  panelCode?: number;
  refreshRate?: number;
  weight?: number;
  odEdition?: string;
  thumb?: string;
  videos?: string;
  osEdition?: WindowsEdition;
  createdAt: Date;
  updatedAt: Date;
}

export interface LaptopRecommendationRequestFields {
  minCpuSpeed: number;
  minCpuCores: number;
  minGpuBoostClock: number;
  minGpuMemory: number;
  minDirectX: number;
  minOpenGl: number;
  minRam: number;
  minStorage: number;
  minOs: number;
}

export interface LaptopFormProps extends Laptop, FormData {
  thumb?: File;
  videos?: File;
  galleries?: FileList;
  deleteGalleries?: string[];
}
