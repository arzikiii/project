import React from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { Alert, Box, Button, Snackbar, Stack, TextField, Typography } from "@mui/material";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { RoundedButton } from "../components/roundedButton";

const validationSchema = Yup.object({
  email: Yup.string().email("Masukkan email yang valid").required("Email harus diisi"),
  password: Yup.string().required("Password harus diisi"),
});

const Login: NextPage = () => {
  const router = useRouter();
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
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (data, { setSubmitting }) => {
          alert("login"); //TODO implement login
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
