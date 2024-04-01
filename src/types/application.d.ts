import * as Application from "@repository/applicationRepository";
import { Windows } from "./windows";

export interface Apps {
  id: string;
  minOs: Windows;
  adminId: string;
  windId: string;
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

export interface AppGetAllQuery {
  search?: string;
  sort_by?: string;
  order_by?: Prisma.SortOrder;
  page?: string;
  size?: string;
}
