"use client";

import { Box } from "@mui/material";
import AppHeroSlide from "@/components/common/AppHeroSlide";
import LaptopHeroSlide from "@/components/common/LaptopHeroSlide";
import uiConfigs from "@/configs/ui.config";
import Container from "@/components/common/Container";
import AppMediaSlide from "@/components/common/AppMediaSlide";
import { useEffect, useState } from "react";
import { getMostExpensiveApps, getNewestApps } from "@/api/modules/app.api";
import { getMostExpensiveLaptops, getNewestLaptop } from "@/api/modules/laptop.api";
import { Apps } from "@/types/application";
import { toast } from "react-toastify";
import LaptopMediaSlide from "@/components/common/LaptopMediaSlide";
import { Laptop } from "@/types/laptop";

export default function Page() {
  const [mostExpensiveApps, setMostExpensiveApps] = useState<Array<Apps>>([]);
  const [newestApps, setNewestApps] = useState<Array<Apps>>([]);
  const [newestLaptops, setNewestLaptop] = useState<Array<Laptop>>([]);
  const [mostExpensiveLaptops, setMostExpensiveLaptops] = useState<Array<Laptop>>([]);

  useEffect(() => {
    const getData = async () => {
      const { message: newestAppsMsg, apps: newestApps } = await getNewestApps(20);
      if (newestAppsMsg !== "success") toast.error(newestAppsMsg);
      if (newestApps) setNewestApps(newestApps);

      const { message: mostExpensiveAppsMsg, apps: mostExpensiveApps } = await getMostExpensiveApps(
        10
      );
      if (mostExpensiveAppsMsg !== "success") toast.error(mostExpensiveAppsMsg);
      if (mostExpensiveApps) setMostExpensiveApps(mostExpensiveApps);

      const { message: newestLaptopsMsg, laptops: newestLaptops } = await getNewestLaptop(20);
      if (newestLaptopsMsg !== "success") toast.error(newestLaptopsMsg);
      if (newestLaptops) setNewestLaptop(newestLaptops);

      const { message: expensiveLaptopsMsg, laptops: expensiveLaptops } =
        await getMostExpensiveLaptops(10);
      if (expensiveLaptopsMsg !== "success") toast.error(expensiveLaptopsMsg);
      if (expensiveLaptops) setMostExpensiveLaptops(expensiveLaptops);
    };
    getData();
  }, []);

  const isEven = Date.now() % 2 === 0;
  return (
    <>
      {isEven && <AppHeroSlide />}
      {!isEven && <LaptopHeroSlide />}
      <Box marginTop="-4rem" sx={{ ...uiConfigs.style.mainContent }}>
        <Container header="laptop rilis terbaru">
          <LaptopMediaSlide data={newestLaptops} />
        </Container>

        <Container header="laptop dengan harga tertinggi">
          <LaptopMediaSlide data={mostExpensiveLaptops} />
        </Container>

        <Container header="aplikasi rilis terbaru">
          <AppMediaSlide data={newestApps} />
        </Container>

        <Container header="aplikasi dengan harga tertinggi">
          <AppMediaSlide data={mostExpensiveApps} />
        </Container>
      </Box>
    </>
  );
}
