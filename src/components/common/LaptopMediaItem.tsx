"use client";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardActionArea, Typography } from "@mui/material";
import { FiCpu } from "react-icons/fi";
import { BsGpuCard } from "react-icons/bs";
import { FaMemory, FaWindows } from "react-icons/fa";
import { MdOutlineStorage } from "react-icons/md";
import { useEffect, useState } from "react";
import uiConfigs from "@/configs/ui.config";
import Link from "next/link";
import { Laptop } from "@/types/laptop";

const LaptopMediaItem = ({ media }: { media: Laptop }) => {
  const [name, setName] = useState<string>("");
  const [thumb, setThumb] = useState<string | undefined>("");
  const [cpu, setCpu] = useState<string>("");
  const [gpu, setGpu] = useState<string>("");
  const [ram, setRam] = useState<number>(0);
  const [storage, setStorage] = useState<number>(0);
  const [windows, setWindows] = useState<string>("");

  useEffect(() => {
    setName(media.name);
    setThumb(media.thumb);
    setCpu(
      `${media.cpu?.name}@${media.cpu?.baseSpeed.toFixed(2)}~${media.cpu?.maxSpeed.toFixed(2)}`
    );
    setGpu(media.gpu?.name);
    setRam(media.ram);
    setStorage(media.ssdStorage + media.hddStorage);
    setWindows(`${media.windowsVersion?.name} ${media.osEdition}`);
  }, [media]);

  return (
    <Card sx={{ marginRight: "0.3rem" }}>
      <CardActionArea LinkComponent={Link} href={`/laptops/${media.id}`}>
        <img
          style={{ objectFit: "contain", width: "100%", height: "15rem" }}
          src={thumb}
          alt={`${name}-thumb`}
        />
        <CardContent>
          <Typography
            variant="h5"
            component="div"
            sx={{
              fontWeight: 700,
              color: "text.primary",
              fontSize: "1rem",
              ...uiConfigs.style.typoLines(1, "left"),
            }}
          >
            {name}
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: "text.primary",
              fontSize: "0.8rem",
              ...uiConfigs.style.typoLines(1, "left"),
            }}
          >
            <FiCpu style={{ display: "inline" }} />
            {" " + cpu} GHz
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "text.primary",
              fontSize: "0.8rem",
              ...uiConfigs.style.typoLines(1, "left"),
            }}
          >
            <BsGpuCard style={{ display: "inline" }} />
            {" " + gpu}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "text.primary",
              fontSize: "0.8rem",
              ...uiConfigs.style.typoLines(1, "left"),
            }}
          >
            <FaMemory style={{ display: "inline" }} />
            {" " + ram} GB
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "text.primary",
              fontSize: "0.8rem",
              ...uiConfigs.style.typoLines(1, "left"),
            }}
          >
            <MdOutlineStorage style={{ display: "inline" }} />
            {" " + storage} GB
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "text.primary",
              fontSize: "0.8rem",
              ...uiConfigs.style.typoLines(1, "left"),
            }}
          >
            <FaWindows style={{ display: "inline" }} />
            {" " + windows}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default LaptopMediaItem;
