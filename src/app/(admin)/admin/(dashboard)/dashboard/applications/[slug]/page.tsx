"use client";

import { useEffect, useState } from "react";
import { getOneApp } from "@/api/modules/app.api";
import { Apps } from "@/types/application";
import { toast } from "react-toastify";

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

  return (
    <div>
      App {params.slug} <p>{app?.name}</p>
    </div>
  );
};

export default page;
