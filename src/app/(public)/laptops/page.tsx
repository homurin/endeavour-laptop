"use client";
import LaptopHeroSlide from "@/components/common/LaptopHeroSlide";
import { LoadingButton } from "@mui/lab";
import { Box, TextField, Toolbar, Grid, Stack } from "@mui/material";
import React, { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import { getManyLaptop } from "@/api/modules/laptop.api";
import uiConfigs from "@/configs/ui.config";
import { Laptop } from "@/types/laptop";
import LaptopMediaItem from "@/components/common/LaptopMediaItem";
import Container from "@/components/common/Container";

let timer: NodeJS.Timeout;
const timeout = 500;

export default function Page() {
  const [query, setQuery] = useState<string>("");
  const [onSearch, setOnSearch] = useState<boolean>(false);
  const [laptops, setLaptops] = useState<Array<Laptop>>([]);
  const [page, setPage] = useState<number>(1);

  const search = useCallback(async () => {
    setOnSearch(true);
    const { message, laptops } = await getManyLaptop(query, page);
    setOnSearch(false);

    if (message !== "success") toast.error(message);
    if (laptops) {
      if (page > 1) {
        setLaptops((prev) => [...prev, ...laptops]);
      } else {
        setLaptops(laptops);
      }
    }
  }, [query, page]);

  useEffect(() => {
    if (query.trim().length === 0) {
      setLaptops([]);
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
      <LaptopHeroSlide />
      <Toolbar />
      <Container header="Cari laptop sesuai kebutuhanmu">
        <Box sx={{ ...uiConfigs.style.mainContent }}>
          <Stack spacing={2}>
            <TextField
              sx={{ width: "100%", marginBottom: "1rem" }}
              placeholder="cari laptop"
              color="success"
              autoFocus
              onChange={onQueryChange}
            />
            <Grid container spacing={1} sx={{ marginRight: "-8x!important" }}>
              {laptops.map((laptop, index) => {
                return (
                  <Grid item xs={6} sm={4} md={3} key={index}>
                    <LaptopMediaItem media={laptop} />
                  </Grid>
                );
              })}
            </Grid>
            {laptops.length > 0 && (
              <LoadingButton loading={onSearch} onClick={() => setPage(page + 1)}>
                <span>Muat lebih banyak</span>
              </LoadingButton>
            )}
          </Stack>
        </Box>
      </Container>
    </>
  );
}
