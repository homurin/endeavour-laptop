import { Windows } from "@/types/windows";
import axios, { AxiosError } from "axios";
import dotenv from "dotenv";
dotenv.config();

const baseUrl = process.env.NEXT_PUBLIC_ENDEAVOUR_LAPTOP_API;
const url = `${baseUrl}/api/v1/windows`;

export const getManyWindows = async (name?: string) => {
  try {
    const get = await axios.get(`${url}?${name ? `?search=${name}` : ""}`);
    const { message, windows } = get.data as { message: string; windows: Array<Windows> };
    return { message, windows };
  } catch (err) {
    const error = err as Error;
    if (error instanceof AxiosError) {
      return { message: error.response?.data.message };
    }
    return { message: error.message };
  }
};
