import { Chip, CircularProgress, Divider, Stack, Typography } from "@mui/material";
import React from "react";
import { RoundedButton } from "../roundedButton";
import { capitalizeFirstLetter } from "../../utils/helper";
import { Router, useRouter } from "next/router";

const sublist = [
  { subName: "free", price: 0 },
  { subName: "personal", price: 30000 },
  { subName: "pro", price: 50000 },
];

// const projectlist = [
//   { id: "1", title: "Project 1", project_type: "Project Type A" },
//   { id: "2", title: "Project 2", project_type: "Project Type B" },
//   { id: "3", title: "Project 3", project_type: "Project Type C" },
// ];
const projectlist: any = [];

export const ProjectListView: React.FC = () => {
  const loading = false;
  const router = useRouter();

  if (projectlist === null || undefined || []) {
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
      {loading ? (
        <Stack width="100%" height={150} justifyContent="center" alignItems="center">
          <CircularProgress />
        </Stack>
      ) : (
        projectlist.map(({ title, project_type, id }, index) => {
          return (
            <Stack direction="column" key={index} sx={{ p: "0px 48px 0px 48px" }}>
              <GroupView title={title} projectType={project_type} id={id} />
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

const GroupView: React.FC<{ title: string; projectType: string; id: string }> = ({ title, projectType, id }) => {
  const router = useRouter();
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
            {projectType}
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
