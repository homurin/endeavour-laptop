"use client";

import { checkToken } from "@/api/modules/admin.api";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Page() {
  const [isValid, setIsValid] = useState<boolean>(false);

  useEffect(() => {
    const getToken = async () => {
      const token = sessionStorage.getItem("session_logininfo" || "");
      if (token) {
        const { isValid } = await checkToken(token);
        setIsValid(isValid);
      }
    };
    getToken();
  }, []);

  useEffect(() => {
    if (isValid) {
      redirect("/admin/login");
    }
  }, [isValid]);

  return <div>Dashboard Admin</div>;
}
