"use client";
import React from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { GoCpu } from "react-icons/go";
import { BsGpuCard } from "react-icons/bs";
import { MdOutlineStorage } from "react-icons/md";
import { CgSmartphoneRam } from "react-icons/cg";
import useLaptop from "@/hooks/useLaptop";

const Billboard = () => {
  const { data } = useLaptop();
  return (
    <div className="relative h-[56.25vw]">
      <video
        className="w-full h-[56.25vw] object-cover brightness-[60%]"
        autoPlay
        muted
        loop
        poster={data?.randomLaptop.thumb}
        src={data?.randomLaptop.videos}
      ></video>
      <div className="absolute top-[30%] md:top-[40%] ml-4 md:ml-16">
        <p className="text-white text-1xl md:text-5xl h-full w-[100%] lg:text-6xl font-bold drop-shadow-xl">
          {data?.randomLaptop.name}
        </p>
        <p className="text-white font-b text-[8px] md:text-lg mt-3 md:mt-8 w-[90%] md:w-[80%] lg:w-[100%] drop-shadow-xl">
          <strong>Processor :</strong> {data?.randomLaptop.cpu.name}
        </p>
        <p className="text-white text-[8px] md:text-lg w-[90%] md:w-[80%] lg:w-[100%] drop-shadow-xl">
          <strong>Graphic Cards :</strong> {data?.randomLaptop.gpu.name}
        </p>
        <p className="text-white text-[8px] md:text-lg w-[90%] md:w-[80%] lg:w-[50%] drop-shadow-xl">
          <strong>RAM :</strong> {data?.randomLaptop.ram} GB
        </p>
        <p className="text-white text-[8px] md:text-lg w-[90%] md:w-[80%] lg:w-[50%] drop-shadow-xl">
          <strong>Storage :</strong> {data?.randomLaptop.totalStorage} GB
        </p>
        <div className="flex flex-row items-center mt-3 md:mt-4 gap-3">
          <button className="bg-white text-white bg-opacity-30 rounded-md py-1 md:py-2 px-2 md:px-4 w-auto text-xs lg:text-lg font-semibold flex flex-row items-center hover:bg-opacity-20 transition">
            <AiOutlineInfoCircle className="mr-2" />
            More Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default Billboard;
