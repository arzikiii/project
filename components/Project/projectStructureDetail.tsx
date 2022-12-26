import React from "react";
import { CircularProgress, Divider, Stack, Typography } from "@mui/material";
import { RoundedButton } from "../roundedButton";
import { useRouter } from "next/router";

//TODO add props

const struktur = [
  {
    name: "Bab 1",
    content:
      "lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet",
  },
  {
    name: "Bab 2",
    content:
      "lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet",
  },
  {
    name: "Bab 3",
    content:
      "lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet",
  },
];

export const ProjectStructureDetail: React.FC = () => {
  const loading = false;
  const router = useRouter();
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
          struktur?.map(({ name, content }, index) => {
            return (
              <Stack direction="column" key={index}>
                <GroupView name={name} content={content} />
                {struktur.length - 1 !== index && <Divider />}
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

const GroupView: React.FC<{ name: string; content: string }> = ({ name, content }) => {
  const router = useRouter();
  return (
    <Stack mb={3} gap={2}>
      <Typography variant="h5" fontWeight={500} color="#2623df">
        {name}
      </Typography>
      <Typography variant="body1" color="#000" fontWeight={100} noWrap>
        {content}
      </Typography>

      <Stack direction="row-reverse" columnGap={1} rowGap={1.5}>
        <RoundedButton onClick={() => router.push(`/project/1/1/edit`)} sx={{ fontSize: "10px" }}>
          Edit
        </RoundedButton>
        <RoundedButton onClick={() => router.push(`/project/1/1`)} sx={{ fontSize: "10px" }} variant="contained">
          Lihat
        </RoundedButton>
      </Stack>
    </Stack>
  );
};
