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
import { getManyLaptop, removeOneLaptop } from "@/api/modules/laptop.api";
import { Laptop } from "@/types/laptop";
import { toast } from "react-toastify";
import Title from "@/components/dashboard/Title";
import ConfirmAlert from "@/components/dashboard/ConfirmAlert";

const page = () => {
  const [laptops, setLaptops] = useState<Array<Laptop>>([]);
  const [laptopsLength, setLaptopsLength] = useState<number>(0);
  const [selectedLaptop, setSelectedLaptop] = useState<{ id: string; name: string } | null>(null);
  const [onSearch, setOnSearch] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [open, setOpen] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");

  const fetchData = async () => {
    const { message, laptops } = await getManyLaptop(query, page, {
      sortBy: "created_at",
      orderBy: "desc",
    });
    if (!laptops) {
      toast.error(message);
    }
    if (laptops) {
      setLaptops(laptops);
      setLaptopsLength(laptops.length);
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
    if (selectedLaptop?.id) {
      const token = localStorage.getItem("authtoken") || "";
      const { message } = await removeOneLaptop(selectedLaptop?.id, token);
      const filtered = laptops.filter((e) => e.id !== selectedLaptop.id);
      setLaptops(filtered);
      toast.success(message);
    }
    setSelectedLaptop(null);
    setOpen(false);
  };

  return (
    <div className="mt-5 p-5">
      <ConfirmAlert
        title={`Remove Laptop ${selectedLaptop?.name}`}
        message={`Are you sure to remove this Laptop?`}
        open={open}
        onClose={() => {
          setSelectedLaptop(null);
          setOpen(false);
        }}
        onConfirm={onConfirmRemove}
      />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <Title>Laptop</Title>
            <TextField placeholder="Search laptops" onChange={onQueryChange} />
            <Button
              startIcon={<AddIcon />}
              href="/admin/dashboard/laptops/create"
              color="success"
              variant="contained"
              LinkComponent={Link}
              sx={{ marginY: 1, width: "max-content" }}
            >
              Create
            </Button>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Manage</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {laptops.length > 0 &&
                  laptops.map((laptop) => {
                    return (
                      <TableRow key={laptop.id}>
                        <TableCell>{laptop.id}</TableCell>
                        <TableCell>{laptop.name}</TableCell>
                        <TableCell>
                          <Button
                            sx={{ marginX: 1 }}
                            size="small"
                            variant="outlined"
                            href={`/admin/dashboard/laptops/${laptop.id}`}
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
                              setSelectedLaptop({ id: laptop.id, name: laptop.name });
                              setOpen(true);
                            }}
                          >
                            Delete
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
        {laptops.length > 0 && page > 1 && (
          <LoadingButton
            loading={onSearch}
            onClick={() => {
              setPage(page - 1);
            }}
          >
            Prev
          </LoadingButton>
        )}
        {laptopsLength >= 40 && (
          <LoadingButton
            loading={onSearch}
            onClick={() => {
              setPage(page + 1);
            }}
          >
            Next
          </LoadingButton>
        )}
      </div>
    </div>
  );
};

export default page;
