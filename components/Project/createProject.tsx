import { Box, FormHelperText, Stack, TextField, Typography, MenuItem, CircularProgress, Snackbar, Alert } from "@mui/material";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import { RoundedButton } from "../roundedButton";
import * as Yup from "yup";
import { useProjectType } from "../../repositories/hooks/useProjectType";
import { Type } from "../../types/models";
import { createProject } from "../../repositories/project";

const validationSchema = Yup.object({
  name: Yup.string().required("Nama projek harus diisi"),
  projectTypeId: Yup.string().required("Project Type harus diisi"),
});

const topicList = [
  { id: 1, name: "machine learning" },
  { id: 2, name: "data mining" },
];

export const CreateProject: React.FC = () => {
  const router = useRouter();
  const { projectType, loading } = useProjectType();
  const [sbAlertOpen, setSbAlertOpen] = React.useState(false);

  const handleAlertClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setSbAlertOpen(false);
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box
      sx={{
        my: 4.5,
        border: "1px solid black",
        borderRadius: "16px",
        padding: "24px",
        "& .MuiTextField-root": {
          position: "relative",
          width: "100%",
          mt: "16px",
        },
      }}
    >
      <Snackbar open={sbAlertOpen} anchorOrigin={{ vertical: "top", horizontal: "center" }} autoHideDuration={2000} onClose={handleAlertClose}>
        <Alert onClose={handleAlertClose} severity="error" sx={{ width: "100%" }}>
          Projek gagal dibuat
        </Alert>
      </Snackbar>
      <Formik
        initialValues={{
          name: "",
          projectTypeId: "",
          topic: "",
        }}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          try {
            await createProject({ ...values, projectTypeId: Number(values.projectTypeId) });
            router.push("/project");
          } catch (error) {
            setSbAlertOpen(true);
          } finally {
            setSubmitting(false);
          }
        }}
        validationSchema={validationSchema}
      >
        {({ values, submitForm, handleChange, isSubmitting, errors, setFieldValue }) => {
          return (
            <Form>
              <Typography variant="subtitle1">Project Name</Typography>
              <TextField
                id="outlined"
                placeholder="name"
                name="name"
                label="name"
                defaultValue={values.name}
                onChange={handleChange}
                error={Boolean(errors.name)}
                inputProps={{
                  maxLength: 120,
                }}
              />
              <Stack direction="row" justifyContent="space-between" mx="16px">
                <FormHelperText error>{errors.name}</FormHelperText>
              </Stack>

              <Typography id="Type" variant="subtitle1" sx={{ mt: "8px" }}>
                Project Type
              </Typography>
              <TextField
                select
                label="Project Type"
                name="ProjectTypeId"
                placeholder="Project Type"
                onChange={(event) => setFieldValue("projectTypeId", event.target.value)}
                defaultValue={values.projectTypeId}
                error={Boolean(errors.projectTypeId)}
              >
                {projectType.map((type: Type) => {
                  return (
                    <MenuItem key={type.id} value={type.id}>
                      {type.name}
                    </MenuItem>
                  );
                })}
              </TextField>
              <Stack direction="row" justifyContent="space-between" mx="16px">
                <FormHelperText error>{errors.projectTypeId}</FormHelperText>
              </Stack>

              <Typography id="Type" variant="subtitle1" sx={{ mt: "8px" }}>
                Project Topic
              </Typography>
              <TextField select label="Topic" name="topic" placeholder="Topic" onChange={(event) => setFieldValue("topic", event.target.value)} defaultValue={values.topic} error={Boolean(errors.topic)}>
                {topicList.map((type: Type) => {
                  return (
                    <MenuItem key={type.id} value={type.id}>
                      {type.name}
                    </MenuItem>
                  );
                })}
              </TextField>
              <Stack direction="row" justifyContent="space-between" mx="16px">
                <FormHelperText error>{errors.topic}</FormHelperText>
              </Stack>

              <Stack direction="row-reverse" spacing={1} mt="36px">
                <RoundedButton
                  variant="contained"
                  disableElevation
                  loading={isSubmitting}
                  onClick={() => {
                    submitForm();
                  }}
                >
                  Buat Projek
                </RoundedButton>
                <RoundedButton variant="text" onClick={() => router.push("/project")}>
                  Kembali
                </RoundedButton>
              </Stack>
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
};
