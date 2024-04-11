"use client";

import { userInfo } from "@/api/modules/admin.api";
import { setAdmin } from "@/redux/features/adminStateSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const useAppDispatch = useDispatch.withTypes<AppDispatch>();
  const dispatch = useAppDispatch();

  const useAppSelector = useSelector.withTypes<RootState>();
  const { user } = useAppSelector((state) => state.adminState);
  useEffect(() => {
    const authAdmin = async () => {
      const token = localStorage.getItem("authtoken");
      if (token) {
        const { admin } = await userInfo(token);
        if (!admin) {
          dispatch(setAdmin(null));
          router.push("/admin/login");
        } else {
          dispatch(setAdmin(admin));
        }
      } else {
        dispatch(setAdmin(null));
        router.push("/admin/login");
      }
    };
    authAdmin();
  }, [dispatch]);

  return user ? children : null;
};

export default ProtectedLayout;
