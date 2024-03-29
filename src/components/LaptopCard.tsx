import React from "react";
import { GoCpu } from "react-icons/go";
import { BsGpuCard } from "react-icons/bs";
import { MdOutlineStorage } from "react-icons/md";
import { CgSmartphoneRam } from "react-icons/cg";

interface LaptopCardProps {
  data: Record<string, any>;
}

const LaptopCard: React.FC<LaptopCardProps> = ({ data }) => {
  return (
    <div className="group bg-zinc-900 col-span relative h-[12vw]">
      <img
        className="
        cursor-pointer
        object-cover
        transition
        duration
        shadow-xl
        rounded-md
        group-hover:opacity-90
        sm:group-hover:opacity-0
        delay-300
        w-full
        h-[12vw]
      "
        src={data.thumb}
        alt={data.name}
      />
      <div
        className="
         opacity-0
         absolute 
         top-0
         transition 
         duration-200
         z-10
         invisible 
         sm:visible
         delay-300
         w-full
         scale-0
         group-hover:scale-110
         group-hover:-translate-y-[6vw]
         group-hover:-translate-x-[2vw]
         group-hover:opacity-100
         "
      >
        <img
          className="
          cursor-pointer
          object-cover
          transition
          duration
          shadow-xl
          rounded-t-md
          w-full
          h-[12vw]
         "
          src={data.thumb}
          alt={data.name}
        />
        <div
          className="
          z-10
          bg-zinc-800
          p-2
          lg:p-4
          absolute
          w-full
          transition
          shadow-md
          rounded-b-md
         "
        >
          <div className="flex flex-row mt-2 gap-2 items-center">
            <strong className="text-white text-[10px] lg:text-sm">{data.name}</strong>
          </div>
          <div className="flex flex-row mt-1 gap-2 items-center">
            <GoCpu color="white" />
            <p className="text-white text-[10px] lg:text-sm">{data.cpu.name}</p>
          </div>
          <div className="flex flex-row mt-1 gap-2 items-center">
            <BsGpuCard color="white" />
            <p className="text-white text-[10px] lg:text-sm">
              {data.gpu.name.replace(/ *\([^)]*\) */g, "")}
            </p>
          </div>
          <div className="flex flex-row mt-1 gap-2 items-center">
            <CgSmartphoneRam color="white" />
            <p className="text-white text-[10px] lg:text-sm">{data.ram} GB</p>
          </div>
          <div className="flex flex-row mt-1 gap-2 items-center">
            <MdOutlineStorage color="white" />
            <p className="text-white text-[10px] lg:text-sm">
              {data.ssdStorage + data.hddStorage} GB
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LaptopCard;
