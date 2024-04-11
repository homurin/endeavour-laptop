import { Laptop } from "@/types/laptop";
import axios, { AxiosError } from "axios";

const baseUrl = process.env.NEXT_PUBLIC_ENDEAVOUR_LAPTOP_API;
const recommendationBaseUrl = process.env.NEXT_PUBLIC_ENDEAVOUR_RECOMMENDER_API;

const url = `${baseUrl}/api/v1/laptops`;
const recommendationUrl = `${recommendationBaseUrl}/api/v1`;

export const getRandomLaptops = async () => {
  try {
    const get = await axios.get(`${url}/random`);

    const { message, laptops } = get.data as { message: string; laptops: Array<Laptop> };
    return { message, laptops };
  } catch (err) {
    const error = err as Error;
    if (error instanceof AxiosError) {
      return { message: error.response?.data.message };
    }
    return { message: error.message };
  }
};

export const getNewestLaptop = async (size: number) => {
  try {
    const get = await axios.get(`${url}?page=1&size=${size}&=sort_by=release_date&order_by=desc`);
    const { message, laptops } = get.data as { message: string; laptops: Array<Laptop> };
    console.info(laptops);
    return { message, laptops };
  } catch (err) {
    const error = err as Error;
    if (error instanceof AxiosError) {
      return { message: error.response?.data.message };
    }
    return { message: error.message };
  }
};

export const getMostExpensiveLaptops = async (size: number) => {
  try {
    const get = await axios.get(`${url}?page=1&size${size}&sort_by=price&order_by=desc`);
    const { message, laptops } = get.data as { message: string; laptops: Array<Laptop> };
    return { message, laptops };
  } catch (err) {
    const error = err as Error;
    if (error instanceof AxiosError) {
      return { message: error.response?.data.message };
    }
    return { message: error.message };
  }
};

export const getManyLaptop = async (name: string, page: number) => {
  try {
    const get = await axios.get(`${url}?search=${name}&page=${page}&size=40`);
    const { message, laptops } = get.data as { message: string; laptops: Array<Laptop> } as {
      message: string;
      laptops: Array<Laptop>;
    };
    return { message, laptops };
  } catch (err) {
    const error = err as Error;
    if (error instanceof AxiosError) {
      return { message: error.response?.data.message };
    }
    return { message: error.message };
  }
};

export const getLaptopDetail = async (id: string) => {
  try {
    const get = await axios.get(`${url}/${id}`);
    const { message, laptop } = get.data as { message: string; laptop: Laptop };
    return {
      message,
      laptop,
    };
  } catch (err) {
    const error = err as Error;
    if (error instanceof AxiosError) {
      return { message: error.response?.data.message };
    }
    return { message: error.message };
  }
};

export const getSimilarLaptops = async (id: string) => {
  try {
    const get = await axios.get(`${recommendationUrl}/recommendations/${id}`);
    const { message, laptops } = get.data as { message: string; laptops: Array<Laptop> };
    return {
      message,
      laptops,
    };
  } catch (err) {
    const error = err as Error;
    if (error instanceof AxiosError) {
      return { message: error.response?.data.message };
    }
    return { message: error.message };
  }
};

export const getLaptopRecommendation = async (appIds: Array<string>) => {
  try {
    const send = await axios.post(`${recommendationUrl}/recommendations`, { app_ids: appIds });
    const { message, data } = send.data;
    return { message, specReq: data.spec_req, laptops: data.laptops };
  } catch (err) {
    const error = err as Error;
    if (error instanceof AxiosError) {
      return { message: error.response?.data.message };
    }
    return { message: error.message };
  }
};
