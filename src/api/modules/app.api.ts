import axios from "axios";
import dotenv from "dotenv";
import { Apps } from "@/types/application";
dotenv.config();

const baseUrl = process.env.NEXT_PUBLIC_ENDEAVOUR_LAPTOP_API;
const url = `${baseUrl}/api/v1/applications`;

export const getRandomApp = async () => {
  console.info(`${url}/random`);
  const get = await axios.get(`${url}/random`);
  const { message, apps }: { message: string; apps?: Array<Apps> } = get.data;

  return { message, apps };
};

export const getHighspecApp = async (size: number) => {
  const get = await axios.get(`${url}?page=1&size=${size}=sort_by=ram&order_by=desc`);
  const { message, apps } = get.data;
  return { message, apps };
};

export const getHighPriceApp = async (size: number) => {
  const get = await axios.get(`${url}?page=1&size${size}&sort_by=price&order_by=desc`);
  const { message, apps } = get.data;
  return { message, apps };
};
