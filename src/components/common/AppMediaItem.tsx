"use client";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { LoadingButton } from "@mui/lab";
import { CardActionArea, Typography, CardActions } from "@mui/material";
import { FaWindows, FaApple, FaLinux } from "react-icons/fa";
import { MdLibraryAdd, MdLibraryAddCheck } from "react-icons/md";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import uiConfigs from "@/configs/ui.config";
import Link from "next/link";
import { Apps } from "@/types/application";
import * as selectedApps from "@/utils/selectedAppsUtils";

const AppMediaItem = ({ media }: { media: Apps }) => {
  const [isSelectedApp, setIsSelectedApp] = useState<boolean>(false);
  const [onRequest, setOnRequest] = useState<boolean>(false);

  useEffect(() => {
    const getData = async () => {
      const isSelectedAppExists = await selectedApps.isExists(media.id);
      if (isSelectedAppExists) setIsSelectedApp(true);
    };
    getData();
  }, [media]);

  const onAddClick = async () => {
    try {
      if (isSelectedApp) {
        await onRemoveSelectedApps();
        return;
      }

      setOnRequest(true);

      const payload = {
        id: media?.id,
        name: media?.name,
        headerImage: media?.headerImage || "",
      };

      await selectedApps.add(payload);
      setIsSelectedApp(true);
      setOnRequest(false);
      toast.success("add selected application success");
    } catch (err) {
      toast.error("add selected application failed");
    }
  };

  const onRemoveSelectedApps = async () => {
    try {
      if (onRequest) return;
      setOnRequest(true);
      await selectedApps.remove(media.id);
      setOnRequest(false);
      setIsSelectedApp(false);
      toast.success("remove selected application success");
    } catch (err) {
      toast.error("remove selected application failed");
    }
  };

  return (
    <Card sx={{ marginRight: "0.3rem" }}>
      <CardActionArea LinkComponent={Link} href={`/applications/${media.id}`}>
        <img
          style={{ objectFit: "contain", width: "100%", height: "10rem" }}
          src={media.headerImage}
          alt={`${name}-header-image`}
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
            {media.name}
          </Typography>
          {media.windows && <FaWindows size={20} style={{ display: "inline" }} />}
          {media.mac && <FaApple size={20} style={{ display: "inline" }} />}
          {media.linux && <FaLinux size={20} style={{ display: "inline" }} />}
        </CardContent>
      </CardActionArea>
      <CardActions>
        <LoadingButton
          startIcon={!isSelectedApp ? <MdLibraryAdd /> : <MdLibraryAddCheck />}
          variant="contained"
          size="small"
          loadingPosition="start"
          onClick={onAddClick}
          loading={onRequest}
          sx={{ width: "max-content" }}
        >
          <span>{isSelectedApp ? "Added" : "Add to List"}</span>
        </LoadingButton>
      </CardActions>
    </Card>
  );
};

export default AppMediaItem;
