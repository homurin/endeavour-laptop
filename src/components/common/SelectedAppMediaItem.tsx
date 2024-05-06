"use client";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardActionArea, Typography, CardActions, Grid } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { FaTrashAlt } from "react-icons/fa";
import { useState } from "react";
import uiConfigs from "@/configs/ui.config";
import Link from "next/link";
import { SelectedAppsProps } from "@/utils/selectedAppsUtils";
import { remove } from "@/utils/selectedAppsUtils";
import { toast } from "react-toastify";

const LaptopMediaItem = ({
  media,
  onRemoved,
}: {
  media: SelectedAppsProps;
  onRemoved: { (id: string): Promise<void> };
}) => {
  const [onRequest, setOnRequest] = useState<boolean>(false);
  const onRemoveSelectedApps = async () => {
    try {
      if (onRequest) return;
      if (media.id) {
        setOnRequest(true);
        await remove(media.id);
        await onRemoved(media.id);
        setOnRequest(false);
        toast.success("berhasil menghapus aplikasi terpilih");
        return;
      }
      toast.error("invalid id");
    } catch (err) {
      toast.error("gagal menghapus aplikasi terpilih");
    }
  };

  return (
    <Card sx={{ marginRight: "0.3rem" }}>
      <CardActionArea LinkComponent={Link} href={`/applications/${media.id}`}>
        <img
          style={{ objectFit: "contain", width: "100%", height: "10rem" }}
          src={media.headerImage}
          alt={`${media.name}-header-image`}
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
        </CardContent>
      </CardActionArea>
      <CardActions>
        <LoadingButton
          startIcon={<FaTrashAlt />}
          variant="contained"
          size="small"
          sx={{ width: "max-content" }}
          loading={onRequest}
          onClick={onRemoveSelectedApps}
        >
          <span>Hapus</span>
        </LoadingButton>
      </CardActions>
    </Card>
  );
};

export default LaptopMediaItem;
