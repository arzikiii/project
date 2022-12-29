import React from "react";
import { CircularProgress, Stack, Typography } from "@mui/material";
import { RoundedButton } from "../roundedButton";
import { useRouter } from "next/router";
import { useProjectPartContent } from "../../repositories/hooks/useProjectPartContent";
import { useProjectDetail } from "../../repositories/hooks/useProjectDetail";
import { projectContent, projectParts } from "../../types/models";

interface Props {
  projectContent: projectContent;
  projectPart: projectParts | undefined;
}

export const ProjectContent: React.FC<Props> = ({ projectContent, projectPart }) => {
  const router = useRouter();
  const { projectId, projectPartId } = router.query;
  const idProject = Number(projectId);
  const idPart = Number(projectPartId);

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
      <Typography variant="body1" color="#000" fontWeight={100}>
        {projectContent.content}
      </Typography>

      <Stack direction="row-reverse" columnGap={1} rowGap={1.5}>
        <RoundedButton onClick={() => router.push(`/project/${idProject}/${idPart}/edit`)} sx={{ fontSize: "10px" }} variant="contained">
          Edit
        </RoundedButton>
        <RoundedButton onClick={() => router.push(`/project/${idProject}`)} sx={{ fontSize: "10px" }}>
          Kembali
        </RoundedButton>
      </Stack>
    </Stack>
  );
};
