"use client";

import { useEffect, useState } from "react";
import { getManyApp } from "@/api/modules/app.api";
import { Apps } from "@/types/application";
import { toast } from "react-toastify";

const page = () => {
  const [apps, setApps] = useState<Array<Apps>>([]);
  const [onRequest, setOnRequest] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [query, setQuery] = useState<string>("");

  useEffect(() => {
    setOnRequest(true);
    const fetchData = async () => {
      const { message, apps } = await getManyApp(query, page);
      if (!apps) {
        toast.error(message);
      }
      if (apps) {
        setApps(apps);
      }
      setOnRequest(false);
    };
    fetchData();
  }, [page, query]);

  return <div>App Dashboard</div>;
};

export default page;
