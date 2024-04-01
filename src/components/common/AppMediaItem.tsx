"use client";

import { Box, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import uiConfigs from "@/configs/ui.config";
import Link from "next/link";
import { Apps } from "@/types/application";

const AppMediaItem = ({ media }: { media: Apps }) => {
  const [name, setName] = useState("" as string);
  const [headerImage, setHeaderImage] = useState("" as string | undefined);
  console.info(headerImage);
  useEffect(() => {
    setName(media.name);
    setHeaderImage(media.headerImage);
  }, [media]);

  return (
    <Link href={`/applications/${media.id}`}>
      <Box
        sx={{
          ...uiConfigs.style.backgroundImage(headerImage),
          paddingTop: "50%",
          marginRight: "0.3rem",
          "&:hover .media-info": { opacity: 1, bottom: 0 },
          "&:hover .media-back-drop, &:hover .media-play-btn": { opacity: 1 },
        }}
      >
        <Box
          className="media-back-drop"
          sx={{
            opacity: { xs: 1, md: 0 },
            transition: "all 0.3s ease",
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            backgroundImage: "linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0))",
          }}
        />

        <Box
          className="media-info"
          sx={{
            transition: "all 0.3s ease",
            opacity: { xs: 1, md: 0 },
            position: "absolute",
            bottom: { xs: 0, md: "-20px" },
            width: "100%",
            heigth: "max-content",
            boxSizing: "border-box",
            padding: {
              xs: "10px",
              md: "2rem 1rem",
            },
          }}
        >
          <Stack spacing={{ xs: 1, md: 2 }}>
            <Typography
              variant="body1"
              fontWeight="700"
              sx={{
                color: "primary.contrastText",
                fontSize: "1rem",
                ...uiConfigs.style.typoLines(1, "left"),
              }}
            >
              {name}
            </Typography>
          </Stack>
        </Box>
      </Box>
    </Link>
  );
};

export default AppMediaItem;
