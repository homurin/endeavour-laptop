import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_ENDEAVOUR_LAPTOP_API;
const url = `${baseUrl}/api/v1/laptops`;

export const getRandomLaptop = async () => {
  const get = await axios.get(`${url}/random`);

  const { message, laptops } = get.data;
  return { message, laptops };
};

export const getHighspecLaptop = async (size: number) => {
  const get = await axios.get(`${url}?page=1&size=${size}=sort_by=ram&order_by=desc`);
  const { message, laptops } = get.data;
  return { message, laptops };
};

export const getHighPriceLaptop = async (size: number) => {
  const get = await axios.get(`${url}?page=1&size${size}&sort_by=price&order_by=desc`);
  const { message, laptops } = get.data;
  return { message, laptops };
};
