import axios from "axios";
import dotenv from "dotenv";
import { Apps } from "@/types/application";
dotenv.config();

const baseUrl = process.env.NEXT_PUBLIC_ENDEAVOUR_LAPTOP_API;
const url = `${baseUrl}/api/v1/applications`;

export const getRandomApps = async () => {
  console.info(`${url}/random`);
  const get = await axios.get(`${url}/random`);
  const { message, apps }: { message: string; apps?: Array<Apps> } = get.data;

  return { message, apps };
};

export const getNewestApps = async (size: number) => {
  const get = await axios.get(`${url}?page=1&size=${size}&sort_by=min_storage&order_by=desc`);
  const { message, apps } = get.data;
  return { message, apps };
};

export const getMostExpensiveApps = async (size: number) => {
  const get = await axios.get(`${url}?page=1&size${size}&sort_by=min_ram&order_by=desc`);
  const { message, apps } = get.data;
  return { message, apps };
};

export const getOneApp = async (id: string) => {
  const get = await axios.get(`${url}/${id}`);
  const { message, app } = get.data;
  return { message, app };
};
