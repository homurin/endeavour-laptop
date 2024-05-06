export interface Gpu {
  id: string;
  name: string;
  url: string;
  benchmark: number;
  price: number;
  cores: number;
  directX: number;
  openGl: number;
  baseSpeed: number;
  maxSpeed: number;
  memory: number;
  memorySpeed: number;
  createdAt: Date;
  updatedAt: Date;
}
