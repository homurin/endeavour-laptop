"use client";

import React from "react";

type HeroSliceParams = {
  mediaType: string;
  mediaCategory: string;
};

interface HeroSlice {
  (params: HeroSliceParams): React.ReactElement;
}

const HeroSlide: HeroSlice = ({ mediaType, mediaCategory }) => {
  return <div>HeroSlide</div>;
};

export default HeroSlide;
