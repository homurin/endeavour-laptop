import axios, { AxiosError } from "axios";
import dotenv from "dotenv";
import { Cpu } from "@/types/cpu";
dotenv.config();

const baseUrl = process.env.NEXT_PUBLIC_ENDEAVOUR_LAPTOP_API;
const url = `${baseUrl}/api/v1/cpus`;

export const getManyCpu = async (name?: string) => {
  try {
    const get = await axios.get(`${url}?${name ? `search=${name}` : ""}`);
    const { message, cpus } = get.data as { message: string; cpus: Array<Cpu> };
    return { message, cpus };
  } catch (err) {
    const error = err as Error;
    if (error instanceof AxiosError) {
      return { message: error.response?.data.message };
    }
    return { message: error.message };
  }
};
