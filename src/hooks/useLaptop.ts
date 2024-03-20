"use client";
import useSWR from "swr";
import fetcher from "@libs/fetcher";

const useLaptop = (page: number = 1, size: number = 10) => {
  const { data, error, isLoading } = useSWR(
    `http://127.0.0.1:5000/api/v1/laptops?page=${page}&size=${size}`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  return {
    data,
    error,
    isLoading,
  };
};

export default useLaptop;
