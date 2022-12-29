import React from "react";
import { Alert, Snackbar, Stack, Typography } from "@mui/material";
import { RoundedButton } from "../roundedButton";
import { useRouter } from "next/router";
import { projectContent, projectParts } from "../../types/models";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { HtmlEditor } from "../htmlEditor";
import { updateContent } from "../../repositories/project";
import { mutate } from "swr";
import { useProjectPartContent } from "../../repositories/hooks/useProjectPartContent";

interface Props {
  projectPart: projectParts | undefined;
  projectContent: projectContent;
}

export const EditProjectContent: React.FC<Props> = ({ projectPart, projectContent }) => {
  const router = useRouter();
  const { projectId, projectPartId } = router.query;
  const idProject = Number(projectId);
  const idPart = Number(projectPartId);
  const { mutate } = useProjectPartContent(idProject, idPart);
  const [sbAlertOpen, setSbAlertOpen] = React.useState(false);
  const handleAlertClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setSbAlertOpen(false);
  };

  return (
    <Stack
      gap={2}
      mb={1}
      sx={{
        borderRadius: 3,
        px: 2,
        py: "20px",
      }}
    >
      <Typography variant="h4" fontWeight={500} color="#2623df">
        {projectPart!.name}
      </Typography>

      <Snackbar open={sbAlertOpen} anchorOrigin={{ vertical: "top", horizontal: "center" }} autoHideDuration={2000} onClose={handleAlertClose}>
        <Alert onClose={handleAlertClose} severity="error" sx={{ width: "100%" }}>
          Projek gagal dibuat
        </Alert>
      </Snackbar>
      <Formik
        initialValues={{
          content: projectContent.content,
        }}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          try {
            await updateContent(idProject, idPart, { content: values.content });
            console.log(values.content);
            mutate();
            router.push(`/project/${projectId}/${idPart}`);
          } catch (error) {
            setSbAlertOpen(true);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ values, submitForm, handleChange, isSubmitting, errors, setFieldValue }) => {
          return (
            <Form>
              <HtmlEditor name="content" content={values.content} setFieldValueFn={setFieldValue} minHeight="500px" />
              <Stack direction="row-reverse" spacing={1} mt="36px">
                <RoundedButton
                  variant="contained"
                  disableElevation
                  loading={isSubmitting}
                  onClick={() => {
                    submitForm();
                  }}
                >
                  Edit Konten
                </RoundedButton>
                <RoundedButton variant="text" onClick={() => router.push(`/project/${idProject}`)}>
                  Kembali
                </RoundedButton>
              </Stack>
            </Form>
          );
        }}
      </Formik>
    </Stack>
  );
};
