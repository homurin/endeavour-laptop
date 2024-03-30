"use client";
import HeroSlide from "@/components/common/HeroSlide";
import endeavourConfig from "@/api/configs/endeavour.config";

export default function Page() {
  return (
    <>
      <HeroSlide
        mediaType={endeavourConfig.mediaType.laptop}
        mediaCategory={endeavourConfig.mediaCategory.top_price}
      />
    </>
  );
}
