import dotenv from "dotenv";
import axios, { AxiosError } from "axios";
import { Admin } from "@/types/admin";

dotenv.config();

const baseUrl = process.env.NEXT_PUBLIC_ENDEAVOUR_LAPTOP_API;
const url = `${baseUrl}/api/v1/auth`;

export const login = async (username: string, password: string) => {
  try {
    const send = await axios.post(url + "/login", { username, password });
    const { token, message }: { token: string; message: string } = send.data;

    return { message, isLogin: true, token };
  } catch (err) {
    const error = err as Error;
    if (error instanceof AxiosError) {
      return { message: error.response?.data.message, isLogin: false };
    }
    return { message: error.message, isLogin: false };
  }
};

export const checkToken = async (token: string) => {
  try {
    const send = await axios.post(url + "/me", { token });
    const { message, admin }: { message: string; admin: Admin } = send.data;

    return { message, admin, isValid: true };
  } catch (err) {
    const e = err as Error;
    if (e instanceof AxiosError) {
      return {
        message: e.response?.data.message,
        isValid: false,
      };
    }
    return { message: e.message, isValid: false };
  }
};
