import React from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { Alert, Box, Button, Snackbar, Stack, TextField, Typography } from "@mui/material";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { RoundedButton } from "../components/roundedButton";
import { login } from "../repositories/users";

const validationSchema = Yup.object({
  uid: Yup.string().required("Email atau username harus diisi"),
  password: Yup.string().required("Password harus diisi"),
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
          uid: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (data, { setSubmitting }) => {
          setSubmitting(true);
          try {
            await login({ ...data, uid: data.uid.toLowerCase() });
            setSbOpen(true);
            router.push("/dashboard");
          } catch (error: any) {
            setAlertMessage("Login gagal");
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
                Login
              </Typography>
              <Box sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  fullWidth
                  label="Email"
                  id="uid"
                  name="uid"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.uid}
                  error={touched.uid && Boolean(errors.uid)}
                  helperText={touched.uid && errors.uid}
                  autoComplete="uid"
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
                <Stack direction="row" width="100%" justifyContent="space-between" alignItems="center" spacing={1} sx={{ mt: 2 }}>
                  <RoundedButton href="/" disableElevation startIcon={<i className="bx bx-left-arrow-alt" />} variant="text" onClick={() => router.push("/")}>
                    Kembali
                  </RoundedButton>
                  <RoundedButton disableElevation type="submit" variant="contained" loading={isSubmitting}>
                    Masuk
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
