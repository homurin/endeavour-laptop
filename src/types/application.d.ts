import * as Application from "@repository/applicationRepository";
import { Windows } from "./windows";

export interface Apps {
  id: string;
  minOs: Windows;
  adminId: string;
  winId: string;
  name: string;
  headerImageId?: string;
  screenshotsId?: string;
  moviesId?: string;
  price?: number;
  description?: string;
  website?: string;
  link?: string;
  developers?: string;
  publishers?: string;
  headerImage?: string;
  screenshots?: string;
  movies?: string;
  windows: boolean;
  mac: boolean;
  linux: boolean;
  releaseDate: Date;
  minCpuSpeed: number;
  minCores: number;
  minDirectX: number;
  minOpenGl: number;
  minGpuMemory: number;
  minGpuBoostClock: number;
  minRam: number;
  minStorage: number;
  bitOs: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface MinimumAppsRequirements {
  cpuMaxSpeed: number;
  cpuCores: number;
  directX: number;
  openGl: number;
  gpuMemory: number;
  gpuMaxSpeed: number;
  ram: number;
  totalStorage: number;
  windowsName: string;
  buildNumber: number;
}

export interface ApplicationCreate extends FormData {
  winId: string;
  name: string;
  price: number;
  releaseDate: Date;
  description?: string;
  developers?: string;
  publishers?: string;
  minCpuSpeed: number;
  minCores: number;
  minGpuBoostClock: number;
  minGpuMemory: number;
  minDirectX: number;
  minOpenGl: number;
  minRam: number;
  minStorage: number;
  bitOs: number;
  headerImage?: File;
  screenshots?: File;
  movies?: File;
}
