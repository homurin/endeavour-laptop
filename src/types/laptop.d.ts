import { Cpu } from "./cpu";
import { Gallery } from "./galleries";
import { Gpu } from "./gpu";
import { Windows } from "./windows";

export interface Laptop {
  id: string;
  cpu: Cpu;
  gpu: Gpu;
  galleries: Array<Gallery>;
  windows: Windows;
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
  price: number;
  displayName?: string;
  displaySize?: number;
  displayResolution?: string;
  panelType?: string;
  panelCode?: number;
  refreshRate?: number;
  weight?: number;
  suitableFor?: string;
  isNew?: boolean;
  gamingScore?: number;
  workstationScore: number;
  odEdition?: string;
  thumb?: string;
  videos?: string;
  osEdition?: string;
  deleteGalleries?: string[];
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
