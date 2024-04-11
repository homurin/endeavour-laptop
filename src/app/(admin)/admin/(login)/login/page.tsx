"use client";

import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/api/modules/admin.api";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { setAdmin } from "@/redux/features/adminStateSlice";
import { LoadingButton } from "@mui/lab";
import { userInfo } from "@/api/modules/admin.api";

const defaultTheme = createTheme({ palette: { mode: "dark" } });

export default function Page() {
  const useAppSelector = useSelector.withTypes<RootState>();
  const { user } = useAppSelector((state) => state.adminState);
  const [onRequest, setOnRequest] = useState<boolean>(true);
  const useAppDispatch = useDispatch.withTypes<AppDispatch>();
  const dispatch = useAppDispatch();

  const router = useRouter();

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      setOnRequest(true);
      e.preventDefault();
      const data = new FormData(e.currentTarget);
      const username = data.get("username") as string;
      const password = data.get("password") as string;
      const { message, isLogin, token, user } = await login(username, password);

      if (isLogin && token) {
        dispatch(setAdmin(user));
        localStorage.setItem("authtoken", token);
        router.push("/admin/dashboard");
      } else {
        dispatch(setAdmin(null));
        toast.error(message);
      }
      setOnRequest(false);
    },
    [router]
  );
  useEffect(() => {
    const authAdmin = async () => {
      const token = localStorage.getItem("authtoken");
      if (token) {
        const { admin } = await userInfo(token);
        if (!admin) {
          dispatch(setAdmin(null));
          setOnRequest(false);
        } else {
          dispatch(setAdmin(admin));
          router.push("/admin/dashboard");
        }
      } else {
        dispatch(setAdmin(null));
        setOnRequest(false);
      }
    };
    authAdmin();
  }, [dispatch]);

  return (
    !user &&
    !onRequest && (
      <ThemeProvider theme={defaultTheme}>
        <ToastContainer
          position="bottom-left"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnFocusLoss
          pauseOnHover
          theme="dark"
        />
        <Grid container component="main" sx={{ height: "100vh" }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: "url('/images/hero.jpg')",
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <Grid
            className="bg-slate-900  text-white"
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Admin Login
              </Typography>
              <Box component="form" method="POST" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
                  sx={{ color: "#ffffff" }}
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />

                <LoadingButton
                  loading={onRequest}
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Login
                </LoadingButton>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    )
  );
}
