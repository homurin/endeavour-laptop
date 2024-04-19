"use client";
import { LoadingButton } from "@mui/lab";
import { Box, TextField, Toolbar, Grid, Stack } from "@mui/material";
import React, { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import uiConfigs from "@/configs/ui.config";
import Container from "@/components/common/Container";
import AppHeroSlide from "@/components/common/AppHeroSlide";
import { Apps } from "@/types/application";
import { getManyApp } from "@/api/modules/app.api";
import AppMediaItem from "@/components/common/AppMediaItem";

let timer: NodeJS.Timeout;
const timeout = 500;

export default function Page() {
  const [query, setQuery] = useState<string>("");
  const [onSearch, setOnSearch] = useState<boolean>(false);
  const [apps, setApps] = useState<Array<Apps>>([]);
  const [page, setPage] = useState<number>(1);

  const search = useCallback(async () => {
    setOnSearch(true);
    const { message, apps } = await getManyApp(query, page);
    setOnSearch(false);

    if (message !== "success") toast.error(message);
    if (apps) {
      if (page > 1) {
        setApps((prev) => [...prev, ...apps]);
      } else {
        setApps(apps);
      }
    }
  }, [query, page]);

  useEffect(() => {
    if (query.trim().length === 0) {
      setApps([]);
      setPage(1);
    } else {
      search();
    }
  }, [query, page]);

  const onQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    clearTimeout(timer);
    timer = setTimeout(() => {
      setQuery(newQuery);
    }, timeout);
  };
  return (
    <>
      <AppHeroSlide />
      <Toolbar />
      <Container header="cari aplikasi sesuai kebutuhanmu">
        <Box sx={{ ...uiConfigs.style.mainContent }}>
          <Stack spacing={2}>
            <TextField
              sx={{ width: "100%", marginBottom: "1rem" }}
              placeholder="search apps"
              color="success"
              autoFocus
              onChange={onQueryChange}
            />
            <Grid container spacing={1} sx={{ marginRight: "-8x!important" }}>
              {apps.map((app, index) => {
                return (
                  <Grid item xs={6} sm={4} md={3} key={index}>
                    <AppMediaItem media={app} />
                  </Grid>
                );
              })}
            </Grid>
            {apps.length > 5 && (
              <LoadingButton loading={onSearch} onClick={() => setPage(page + 1)}>
                <span>Load More</span>
              </LoadingButton>
            )}
          </Stack>
        </Box>
      </Container>
    </>
  );
}
