import axios, { AxiosError } from "axios";
import dotenv from "dotenv";
import { Brand } from "@/types/brand";
dotenv.config();

const baseUrl = process.env.NEXT_PUBLIC_ENDEAVOUR_LAPTOP_API;
const url = `${baseUrl}/api/v1/brands`;

export const getManyBrand = async (name?: string) => {
  try {
    const get = await axios.get(`${url}?${name ? `search=${name}` : ""}`);
    const { message, brands } = get.data as { message: string; brands: Array<Brand> };
    return { message, brands };
  } catch (err) {
    const error = err as Error;
    if (error instanceof AxiosError) {
      return { message: error.response?.data.message };
    }
    return { message: error.message };
  }
};
