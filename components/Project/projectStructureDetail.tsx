import React from "react";
import { CircularProgress, Divider, Stack, Typography } from "@mui/material";
import { RoundedButton } from "../roundedButton";
import { useRouter } from "next/router";
import { projectParts } from "../../types/models";
import { HtmlBox } from "../htmlBox";

interface Props {
  projectParts: projectParts[];
  loading: boolean;
}

export const ProjectStructureDetail: React.FC<Props> = ({ projectParts, loading }) => {
  const router = useRouter();
  const { projectId } = router.query;
  const idProject = Number(projectId);
  return (
    <Stack>
      <Typography variant="h5" fontWeight={600} height="52px" px={2} display="flex" alignItems={"center"} color="#2623df">
        Struktur Projek
      </Typography>
      <Stack
        gap={2}
        mb={1}
        sx={{
          border: "1px solid",
          borderColor: "#0000001F",
          borderRadius: 3,
          px: 2,
          py: "20px",
        }}
      >
        {loading ? (
          <Stack width="100%" height={150} justifyContent="center" alignItems="center">
            <CircularProgress />
          </Stack>
        ) : (
          projectParts?.map(({ name, contentExcerpt, id }, index) => {
            return (
              <Stack direction="column" key={index}>
                <GroupView name={name} content={contentExcerpt} id={id} projectId={idProject} />
                {projectParts.length - 1 !== index && <Divider />}
              </Stack>
            );
          })
        )}
      </Stack>
      <Stack direction="row-reverse" columnGap={1} rowGap={1.5}>
        <RoundedButton onClick={() => router.push(`/project`)} sx={{ fontSize: "10px" }}>
          Kembali
        </RoundedButton>
      </Stack>
    </Stack>
  );
};

const GroupView: React.FC<{ name: string; content: string; id: number; projectId: number }> = ({ name, content, id, projectId }) => {
  const router = useRouter();
  return (
    <Stack mb={3} gap={2}>
      <Typography variant="h5" fontWeight={500} color="#2623df">
        {name}
      </Typography>
      <HtmlBox htmlContent={content !== "" ? content : "-"} variant="body1" />

      <Stack direction="row-reverse" columnGap={1} rowGap={1.5}>
        <RoundedButton onClick={() => router.push(`/project/${projectId}/${id}`)} sx={{ fontSize: "10px" }} variant="contained">
          Lihat
        </RoundedButton>
        <RoundedButton onClick={() => router.push(`/project/${projectId}/${id}/edit`)} sx={{ fontSize: "10px" }}>
          Edit
        </RoundedButton>
      </Stack>
    </Stack>
  );
};
