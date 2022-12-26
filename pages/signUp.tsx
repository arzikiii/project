import React from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { Alert, Box, Snackbar, Stack, TextField, Typography } from "@mui/material";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { RoundedButton } from "../components/roundedButton";
import { signUp } from "../repositories/users";

const validationSchema = Yup.object({
  email: Yup.string().email("Masukkan email yang valid").required("Email harus diisi"),
  username: Yup.string().required("username harus diisi"),
  password: Yup.string().required("Password harus diisi"),
  password_confirmation: Yup.string().required("Password harus diisi"),
});

const Login: NextPage = () => {
  const router = useRouter();
  const [sbAlertOpen, setSbAlertOpen] = React.useState(false);
  const [sbOpen, setSbOpen] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState("");

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setSbOpen(false);
  };

  const handleAlertClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setSbAlertOpen(false);
  };

  return (
    <Box
      component="main"
      sx={{
        background: "#FFF",
        width: "100%",
        height: "100vh",
        backgroundSize: "cover",
        position: "relative",
      }}
    >
      <Snackbar open={sbAlertOpen} anchorOrigin={{ vertical: "top", horizontal: "center" }} autoHideDuration={2000} onClose={handleAlertClose}>
        <Alert onClose={handleAlertClose} severity="error" sx={{ width: "100%" }}>
          {alertMessage}
        </Alert>
      </Snackbar>
      <Snackbar open={sbOpen} anchorOrigin={{ vertical: "top", horizontal: "center" }} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          login berhasil, anda akan segera diarahkan
        </Alert>
      </Snackbar>
      <Formik
        initialValues={{
          username: "",
          email: "",
          password: "",
          password_confirmation: "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (data, { setSubmitting }) => {
          setSubmitting(true);
          try {
            await signUp({ ...data, email: data.email.toLowerCase() });
            setSbOpen(true);
            router.push("/login");
          } catch (error: any) {
            setAlertMessage("Sign up gagal");
            setSbAlertOpen(true);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ values, isSubmitting, handleChange, handleBlur, touched, errors }) => (
          <Form>
            <Box
              sx={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                minWidth: { xs: "100%", sm: "400px" },
                height: { xs: "100%", sm: "unset" },
                backgroundColor: "white",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                border: "1px solid #E0E0E0",
                borderRadius: "8px",
                marginX: "auto",
                padding: 4,
              }}
            >
              <Typography component="h1" variant="h5" color="#000000">
                Daftar Akun
              </Typography>
              <Box sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  fullWidth
                  label="Username"
                  id="username"
                  name="username"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.username}
                  error={touched.username && Boolean(errors.username)}
                  helperText={touched.username && errors.username}
                  autoComplete="username"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  fullWidth
                  label="Email"
                  id="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  fullWidth
                  label="Password"
                  name="password"
                  type="password"
                  id="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  autoComplete="password"
                />
                <TextField
                  margin="normal"
                  fullWidth
                  label="Password_confirmation"
                  name="password_confirmation"
                  type="password"
                  id="password_confirmation"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password_confirmation}
                  error={touched.password_confirmation && Boolean(errors.password_confirmation)}
                  helperText={touched.password_confirmation && errors.password_confirmation}
                  autoComplete="password_confirmation"
                />
                <Stack direction="row" width="100%" justifyContent="space-between" alignItems="center" spacing={1} sx={{ mt: 2 }}>
                  <RoundedButton href="/" disableElevation startIcon={<i className="bx bx-left-arrow-alt" />} variant="text" onClick={() => router.push("/")}>
                    Kembali
                  </RoundedButton>
                  <RoundedButton disableElevation type="submit" variant="contained" loading={isSubmitting}>
                    Daftar
                  </RoundedButton>
                </Stack>
              </Box>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default Login;
