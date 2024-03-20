"use client";
import { isEmpty } from "lodash";
import React from "react";
import LaptopCard from "./LaptopCard";

interface LaptopListProps {
  data: Record<string, any>[];
  title: string;
}

const LaptopList: React.FC<LaptopListProps> = ({ data, title }) => {
  if (isEmpty(data)) {
    return null;
  }

  return (
    <div className="px-4 md:px-12 mt-4 space-y-8">
      <div>
        <p className="text-white text-md md:text-xl lg:text-2xl font-semibold">{title}</p>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {data.map((laptop) => (
          <LaptopCard key={laptop.id} data={laptop} />
        ))}
      </div>
    </div>
  );
};

export default LaptopList;
