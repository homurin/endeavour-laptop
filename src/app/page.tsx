"use client";
import Navbar from "@/components/Navbar";
import Billboard from "@/components/Billboard";
import LaptopList from "@/components/LaptopList";
import useLaptop from "@/hooks/useLaptop";

export default function Home() {
  const { data } = useLaptop(1, 4);
  return (
    <>
      <Navbar />
      <Billboard />
      <div>
        <LaptopList title="Our Products" data={data?.laptops} />
      </div>
    </>
  );
}
