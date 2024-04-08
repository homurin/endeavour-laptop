import dotenv from "dotenv";
import axios, { AxiosError } from "axios";
import { Admin } from "@/types/admin";

dotenv.config();

// const token = localStorage.getItem("session_logininfo") || "";

const baseUrl = process.env.NEXT_PUBLIC_ENDEAVOUR_LAPTOP_API;
const url = `${baseUrl}/api/v1/auth`;

export const login = async (username: string, password: string) => {
  try {
    const send = await axios.post(url + "/login", { username, password });
    const { user, token, message }: { user: Admin; token: string; message: string } = send.data;

    return { message, isLogin: true, token, user };
  } catch (err) {
    const error = err as Error;
    if (error instanceof AxiosError) {
      return { message: error.response?.data.message, isLogin: false };
    }
    return { message: error.message, isLogin: false };
  }
};

export const userInfo = async (token: string) => {
  try {
    const send = await axios.get(url + "/me", { headers: { Authorization: `Bearer ${token}` } });
    const { message, admin }: { message: string; admin: Admin } = send.data;

    return { message, admin };
  } catch (err) {
    const e = err as Error;
    if (e instanceof AxiosError) {
      return {
        message: e.response?.data.message,
      };
    }
    return { message: e.message };
  }
};
