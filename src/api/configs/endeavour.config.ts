export type MediaType = {
  laptop: string;
  application: string;
};

export type MediaCategory = {
  top_price: string;
  high_spec: string;
};

const mediaType: MediaType = {
  laptop: "laptops",
  application: "applications",
};

const mediaCategory = {
  top_price: "sort_by=price&order_by=desc",
  high_spec: "sort_by=ram&order_by=desc",
};

const endeavourConfig = { mediaType, mediaCategory };

export default endeavourConfig;
