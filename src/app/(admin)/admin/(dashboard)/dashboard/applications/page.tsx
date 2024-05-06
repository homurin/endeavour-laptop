"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AddIcon from "@mui/icons-material/Add";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { getManyApp, removeOneApp } from "@/api/modules/app.api";
import { Apps } from "@/types/application";
import { toast } from "react-toastify";
import Title from "@/components/dashboard/Title";
import ConfirmAlert from "@/components/dashboard/ConfirmAlert";

const page = () => {
  const [apps, setApps] = useState<Array<Apps>>([]);
  const [appsLength, setAppsLength] = useState<number>(0);
  const [selectedApp, setSelectedApp] = useState<{ id: string; name: string } | null>(null);
  const [onSearch, setOnSearch] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [open, setOpen] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");

  const fetchData = async () => {
    const { message, apps } = await getManyApp(query, page, {
      sortBy: "created_at",
      orderBy: "desc",
    });
    if (!apps) {
      toast.error(message);
    }
    if (apps) {
      setApps(apps);
      setAppsLength(apps.length);
    }
    setOnSearch(false);
  };

  useEffect(() => {
    setOnSearch(true);
    fetchData();
  }, [page, query]);

  const onQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const onConfirmRemove = async () => {
    if (selectedApp?.id) {
      const token = localStorage.getItem("authtoken") || "";
      const { message } = await removeOneApp(selectedApp?.id, token);
      const filtered = apps.filter((e) => e.id !== selectedApp.id);
      setApps(filtered);
      toast.success(message);
    }
    setSelectedApp(null);
    setOpen(false);
  };

  return (
    <div className="mt-5 p-5">
      <ConfirmAlert
        title={`Hapus aplikasi ${selectedApp?.name}`}
        message={`Apa anda yakin untuk menghapus aplikasi ini?`}
        open={open}
        onClose={() => {
          setSelectedApp(null);
          setOpen(false);
        }}
        onConfirm={onConfirmRemove}
      />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <Title>Aplikasi</Title>
            <TextField placeholder="Cari aplikasi" onChange={onQueryChange} />
            <Button
              startIcon={<AddIcon />}
              href="/admin/dashboard/applications/create"
              color="success"
              variant="contained"
              LinkComponent={Link}
              sx={{ marginY: 1, width: "max-content" }}
            >
              Buat
            </Button>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Nama</TableCell>
                  <TableCell>Kelolah</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {apps.length > 0 &&
                  apps.map((app) => {
                    return (
                      <TableRow key={app.id}>
                        <TableCell>{app.id}</TableCell>
                        <TableCell>{app.name}</TableCell>
                        <TableCell>
                          <Button
                            sx={{ marginX: 1 }}
                            size="small"
                            variant="outlined"
                            href={`/admin/dashboard/applications/${app.id}`}
                            LinkComponent={Link}
                          >
                            Edit
                          </Button>
                          <Button
                            sx={{ marginX: 1 }}
                            size="small"
                            variant="outlined"
                            color="error"
                            onClick={() => {
                              setSelectedApp({ id: app.id, name: app.name });
                              setOpen(true);
                            }}
                          >
                            Hapus
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>

      <div className="flex justify-center">
        {apps.length > 0 && page > 1 && (
          <LoadingButton
            loading={onSearch}
            onClick={() => {
              setPage(page - 1);
            }}
          >
            Sebelumnya
          </LoadingButton>
        )}
        {appsLength >= 40 && (
          <LoadingButton
            loading={onSearch}
            onClick={() => {
              setPage(page + 1);
            }}
          >
            Selanjutnya
          </LoadingButton>
        )}
      </div>
    </div>
  );
};

export default page;
