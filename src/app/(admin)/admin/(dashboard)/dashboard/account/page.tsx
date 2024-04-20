"use client";

import { Box, TextField, Grid, FormLabel, Button } from "@mui/material";
import { styled } from "@mui/system";
import React, { FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/redux/store";
import { LoadingButton } from "@mui/lab";
import { login, updateUserProfile } from "@/api/modules/admin.api";
import { Admin } from "@/types/admin";
import { setAdmin } from "@/redux/features/adminStateSlice";

const FormGrid = styled(Grid)(() => ({ display: "flex", flexDirection: "column" }));

const AppForm = ({ params }: { params: { id: string } }) => {
  const useAppDispatch = useDispatch.withTypes<AppDispatch>();
  const useAppSelector = useSelector.withTypes<RootState>();
  const { user } = useAppSelector((state) => {
    return state.adminState;
  });
  const dispatch = useAppDispatch();

  const [fullName, setFullName] = useState<string>(user?.fullName || "");
  const [username, setUsername] = useState<string>(user?.username || "");
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");
  const [onUpdatePassword, setOnUpdatePassword] = useState<boolean>(false);
  const [onEdit, setOnEdit] = useState<boolean>(false);
  const [onRequest, setOnRequest] = useState<boolean>(true);

  useEffect(() => {}, [dispatch]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setOnRequest(true);
    e.preventDefault();
    const adminBody: Admin = { username, fullName };
    if (onUpdatePassword && user) {
      if (newPassword !== confirmNewPassword) {
        return toast.error("new password not match");
      }
      console.log(oldPassword);
      console.log();
      const { isLogin, message } = await login(user.username || "", oldPassword);
      if (!isLogin) {
        return toast.error(message);
      }
      adminBody.password = newPassword;
    }
    const token = localStorage.getItem("authtoken");
    if (token) {
      const { message, newToken, admin } = await updateUserProfile(token, adminBody);
      if (admin) {
        dispatch(setAdmin(admin));
        localStorage.setItem("authtoken", newToken);
        setOnEdit(false);
        setOldPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
        return toast.success(message);
      }
      return toast.error(message);
    }
    setOnEdit(false);
  };

  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      sx={{
        backgroundColor: "white",
        padding: 2,
        margin: 2,
        display: "flex",
        flexDirection: "column",
      }}
      noValidate
      autoComplete="off"
    >
      <Grid container spacing={3}>
        <FormGrid item xs={12} md={6}>
          <FormLabel htmlFor="username">Username</FormLabel>
          <TextField
            id="username"
            name="username"
            value={username}
            required
            disabled={!onEdit}
            onChange={(e) => {
              setUsername(
                e.target.value
                  .replace(/[^a-zA-Z0-9]/g, "")
                  .toLowerCase()
                  .slice(0, 30)
              );
            }}
          />
        </FormGrid>
        <FormGrid item xs={12} md={6}>
          <FormLabel htmlFor="full-name">Nama Lengkap </FormLabel>
          <TextField
            id="full-name"
            name="fullName"
            value={fullName}
            required
            disabled={!onEdit}
            onChange={(e) => {
              setFullName(e.target.value.replace(/[^a-zA-Z\s:]/, "").slice(0, 50));
            }}
          />
        </FormGrid>
        {onUpdatePassword && onEdit && (
          <>
            <FormGrid item xs={12} md={6}>
              <FormLabel htmlFor="old-password">Password Lama</FormLabel>
              <TextField
                id="old-password"
                name="oldPassword"
                type="password"
                value={oldPassword}
                required
                disabled={!onEdit}
                onChange={(e) => {
                  setOldPassword(e.target.value.replace(/[^a-zA-Z\d\s:]/g, "").slice(0, 50));
                }}
              />
            </FormGrid>
            <FormGrid item xs={12} md={6}>
              <FormLabel htmlFor="new-password">Password Baru</FormLabel>
              <TextField
                id="new-password"
                name="newPassword"
                type="password"
                value={newPassword}
                required
                disabled={!onEdit}
                onChange={(e) => {
                  setNewPassword(e.target.value.replace(/[^a-zA-Z\d\s:]/g, "").slice(0, 50));
                }}
              />
            </FormGrid>
            <FormGrid item xs={12} md={6}>
              <FormLabel htmlFor="confirm-new-password">Konfirmasi Password Baru</FormLabel>
              <TextField
                id="confirm-new-password"
                name="confirmNewPassword"
                type="password"
                value={confirmNewPassword}
                error={newPassword !== confirmNewPassword}
                helperText="password not match"
                required
                disabled={!onEdit}
                onChange={(e) => {
                  setConfirmNewPassword(e.target.value.replace(/[^a-zA-Z\d\s:]/g, "").slice(0, 50));
                }}
              />
            </FormGrid>
          </>
        )}
        {onEdit && (
          <FormGrid item xs={12}>
            <Button
              className="w-max"
              type="button"
              color={onUpdatePassword ? "error" : "info"}
              variant="outlined"
              onClick={() => {
                setOnUpdatePassword(!onUpdatePassword);
              }}
            >
              {onUpdatePassword ? "Batalkan Perubahan" : "Perbarui Password"}
            </Button>
          </FormGrid>
        )}

        <FormGrid item xs={12}>
          {onEdit ? (
            <LoadingButton
              loading={!onRequest}
              color="secondary"
              type={onEdit ? "submit" : "button"}
              variant="outlined"
            >
              Simpan Perubahan
            </LoadingButton>
          ) : (
            <Button
              type="button"
              variant="outlined"
              onClick={() => {
                setOnEdit(true);
              }}
            >
              Perbarui Profil
            </Button>
          )}
        </FormGrid>
      </Grid>
    </Box>
  );
};

export default AppForm;
