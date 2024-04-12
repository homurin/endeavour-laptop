import axios, { AxiosError } from "axios";
import dotenv from "dotenv";
import { ApplicationCreate, Apps } from "@/types/application";
import { headers } from "next/headers";
dotenv.config();

const baseUrl = process.env.NEXT_PUBLIC_ENDEAVOUR_LAPTOP_API;
const url = `${baseUrl}/api/v1/applications`;

export const getRandomApps = async () => {
  try {
    const get = await axios.get(`${url}/random`);
    const { message, apps }: { message: string; apps?: Array<Apps> } = get.data;

    return { message, apps };
  } catch (err) {
    const error = err as Error;
    if (error instanceof AxiosError) {
      return { message: error.response?.data.message };
    }
    return { message: error.message };
  }
};

export const getNewestApps = async (size: number) => {
  try {
    const get = await axios.get(`${url}?page=1&size=${size}&sort_by=release_date&order_by=desc`);
    const { message, apps } = get.data;
    return { message, apps };
  } catch (err) {
    const error = err as Error;
    if (error instanceof AxiosError) {
      return { message: error.response?.data.message };
    }
    return { message: error.message };
  }
};

export const getMostExpensiveApps = async (size: number) => {
  try {
    const get = await axios.get(`${url}?page=1&size${size}&sort_by=price&order_by=desc`);
    const { message, apps } = get.data;
    return { message, apps };
  } catch (err) {
    const error = err as Error;
    if (error instanceof AxiosError) {
      return { message: error.response?.data.message };
    }
    return { message: error.message };
  }
};

export const getManyApp = async (
  name: string,
  page: number,
  order: { sortBy?: string; orderBy?: string }
) => {
  try {
    const get = await axios.get(
      `${url}?search=${name}&page=${page}&size=40${
        order.sortBy && order.orderBy && `&sort_by=${order.sortBy}&order_by=${order.orderBy}`
      }`
    );
    const { message, apps } = get.data as { message: string; apps: Array<Apps> };
    return { message, apps };
  } catch (err) {
    const error = err as Error;
    if (error instanceof AxiosError) {
      return { message: error.response?.data.message };
    }
    return { message: error.message };
  }
};

export const getOneApp = async (id: string) => {
  try {
    const get = await axios.get(`${url}/${id}`);
    const { message, app } = get.data;
    return { message, app };
  } catch (err) {
    const error = err as Error;
    if (error instanceof AxiosError) {
      return { message: error.response?.data.message };
    }
    return { message: error.message };
  }
};

export const createOneApp = async (data: ApplicationCreate, token: string) => {
  try {
    const response = await axios.post(`${url}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const { app, message } = response.data as { message: string; app: Apps };
    return {
      app,
      message,
    };
  } catch (err) {
    const e = err as Error;
    if (e instanceof AxiosError) {
      return { message: e.response?.data.message };
    }
    return { message: e.message };
  }
};

export const updateOneApp = async (id: string, data: ApplicationCreate, token: string) => {
  try {
    const response = await axios.patch(`${url}/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const { app, message } = response.data as { message: string; app: Apps };
    return {
      app,
      message,
    };
  } catch (err) {
    const e = err as Error;
    if (e instanceof AxiosError) {
      return { message: e.response?.data.message };
    }
    return { message: e.message };
  }
};

export const removeOneApp = async (id: string, token: string) => {
  try {
    const res = await axios.delete(`${url}/${id}`, { headers: { Authorization: token } });
    const { message } = res.data;
    return { message };
  } catch (err) {
    const e = err as Error;
    if (e instanceof AxiosError) {
      return { message: e.response?.data.message };
    }
    return { message: e.message };
  }
};
