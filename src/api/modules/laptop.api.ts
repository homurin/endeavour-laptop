import { LaptopRecommendationRequestFields } from "@/types/laptop";
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_ENDEAVOUR_LAPTOP_API;
const recommendationBaseUrl = process.env.NEXT_PUBLIC_ENDEAVOUR_RECOMMENDER_API;

const url = `${baseUrl}/api/v1/laptops`;
const recommendationUrl = `${recommendationBaseUrl}/api/v1`;

export const getRandomLaptops = async () => {
  const get = await axios.get(`${url}/random`);

  const { message, laptops } = get.data;
  return { message, laptops };
};

export const getNewestLaptop = async (size: number) => {
  const get = await axios.get(`${url}?page=1&size=${size}&=sort_by=created_at&order_by=desc`);
  const { message, laptops } = get.data;
  console.info(laptops);
  return { message, laptops };
};

export const getMostExpensiveLaptops = async (size: number) => {
  const get = await axios.get(`${url}?page=1&size${size}&sort_by=price&order_by=desc`);
  const { message, laptops } = get.data;
  return { message, laptops };
};

export const getLaptopDetail = async (id: string) => {
  const get = await axios.get(`${url}/${id}`);
  const { message, laptop } = get.data;
  return {
    message,
    laptop,
  };
};

export const getSimilarLaptops = async (id: string) => {
  const get = await axios.get(`${recommendationUrl}/recommendations/${id}`);
  const { message, laptops } = get.data;
  return {
    message,
    laptops,
  };
};

export const getLaptopRecommendation = async (appIds: Array<string>) => {
  const send = await axios.post(`${recommendationUrl}/recommendations`, { app_ids: appIds });
  const { message, data } = send.data;
  console.info(send.data);
  return { message, specReq: data.spec_req, laptops: data.laptops };
};
