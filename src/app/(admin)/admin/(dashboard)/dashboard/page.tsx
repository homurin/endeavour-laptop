"use client";

import { Container, Grid } from "@mui/material";
import ItemOverviewBox from "@/components/dashboard/ItemOverviewBox";

const Page = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4} lg={3}>
          <ItemOverviewBox title="Laptop" href="/admin/dashboard/laptops" count={10} />
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
          <ItemOverviewBox title="Application" href="/admin/dashboard/applications" count={10} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Page;
