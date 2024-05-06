"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getOneApp } from "@/api/modules/app.api";
import { Apps } from "@/types/application";
import AppForm from "@/components/dashboard/AppForm";

const page = ({ params }: { params: { slug: string } }) => {
  const [app, setApp] = useState<Apps>();
  useEffect(() => {
    const getApp = async () => {
      const { message, app } = await getOneApp(params.slug);

      if (!app) {
        toast.error(message);
      }
      setApp(app);
    };
    getApp();
  }, []);
  return <>{app ? <AppForm data={app} /> : null}</>;
};

export default page;
