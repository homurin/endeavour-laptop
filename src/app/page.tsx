"use client";
import AppHeroSlide from "@/components/common/AppHeroSlide";
import LaptopHeroSlide from "@/components/common/LaptopHeroSlide";

export default function Page() {
  const isEven = Date.now() % 2 === 0;
  return (
    <>
      {isEven && <AppHeroSlide />}
      {!isEven && <LaptopHeroSlide />}
    </>
  );
}
