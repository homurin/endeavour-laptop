import axios, { AxiosError } from "axios";
import dotenv from "dotenv";
import { Gpu } from "@/types/gpu";
dotenv.config();

const baseUrl = process.env.NEXT_PUBLIC_ENDEAVOUR_LAPTOP_API;
const url = `${baseUrl}/api/v1/gpus`;

export const getManyGpu = async (name?: string) => {
  try {
    const get = await axios.get(`${url}?${name ? `search=${name}` : ""}`);
    const { message, gpus } = get.data as { message: string; gpus: Array<Gpu> };
    return { message, gpus };
  } catch (err) {
    const error = err as Error;
    if (error instanceof AxiosError) {
      return { message: error.response?.data.message };
    }
    return { message: error.message };
  }
};
