import { CircularProgress, Stack, Typography } from "@mui/material";
import React from "react";
import { RoundedButton } from "../roundedButton";
import { useRouter } from "next/router";
import { useProject } from "../../repositories/hooks/useProject";
import { Type } from "../../types/models";
import { useProjectType } from "../../repositories/hooks/useProjectType";

export const ProjectListView: React.FC = () => {
  const router = useRouter();
  const { projects, loading } = useProject();
  const { loading: typeLoading } = useProjectType();

  if (projects?.length === 0) {
    return (
      <Stack gap={2}>
        <Stack
          direction="column"
          gap={1}
          mb={1}
          sx={{
            border: "1px solid",
            borderColor: "#0000001F",
            borderRadius: 3,
            px: 2,
            py: "20px",
          }}
        >
          <Typography variant="h6" fontWeight={500} sx={{ mb: "8px" }}>
            Anda belum memiliki projek
          </Typography>
          <Stack direction="row-reverse">
            <RoundedButton onClick={() => router.push("/project/create")} sx={{ fontSize: "10px" }} variant="contained">
              Buat projek baru
            </RoundedButton>
          </Stack>
        </Stack>
      </Stack>
    );
  }

  return (
    <Stack gap={2}>
      {projects && projects.length !== 0 && loading && typeLoading ? (
        <Stack width="100%" height={150} justifyContent="center" alignItems="center">
          <CircularProgress />
        </Stack>
      ) : (
        projects?.map((item, index) => {
          return (
            <Stack direction="column" key={index} sx={{ p: "0px 48px 0px 48px" }}>
              <GroupView title={item.name} projectTypeName={item.projectType.name} id={item.id} />
            </Stack>
          );
        })
      )}
      <Stack direction="row-reverse">
        <RoundedButton onClick={() => router.push("/project/create")} sx={{ fontSize: "10px" }}>
          Create new project
        </RoundedButton>
      </Stack>
    </Stack>
  );
};

const GroupView: React.FC<{ title: string; projectTypeName: string; id: number }> = ({ title, projectTypeName, id }) => {
  const router = useRouter();
  const { loading } = useProjectType();

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Stack gap={2}>
      <Stack
        direction="column"
        gap={1}
        mb={1}
        sx={{
          border: "1px solid",
          borderColor: "#0000001F",
          borderRadius: 3,
          px: 2,
          py: "20px",
        }}
      >
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h6" fontWeight={500} sx={{ mb: "8px" }}>
            {title}
          </Typography>
          <Typography variant="body2" color="text.disabled" sx={{ pt: "2px" }}>
            {projectTypeName}
          </Typography>
        </Stack>
        <Typography variant="caption" color="#000" fontWeight={100}>
          This is supposedly a description but i do not know what to write so i will just type some random things
        </Typography>
        <Stack direction="row-reverse">
          <RoundedButton onClick={() => router.push(`/project/${id}`)} sx={{ fontSize: "10px" }} variant="contained">
            Go to this project
          </RoundedButton>
        </Stack>
      </Stack>
    </Stack>
  );
};
