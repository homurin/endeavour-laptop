"use client";

import { getLaptopDetail } from "@/api/modules/laptop.api";
import { Laptop } from "@/types/laptop";
import { useEffect, useState } from "react";
import LaptopForm from "@/components/dashboard/LaptopForm";

const page = ({ params }: { params: { slug: string } }) => {
  const [laptop, setLaptop] = useState<Laptop>();

  useEffect(() => {
    const getLaptop = async () => {
      const { laptop } = await getLaptopDetail(params.slug);
      if (laptop) {
        setLaptop(laptop);
      }
    };
    getLaptop();
  }, []);

  return <>{laptop && <LaptopForm data={laptop} />}</>;
};

export default page;
