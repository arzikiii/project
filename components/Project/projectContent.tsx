import React from "react";
import { Chip, CircularProgress, Divider, Stack, Typography } from "@mui/material";
import { RoundedButton } from "../roundedButton";
import { useRouter } from "next/router";

export const ProjectContent: React.FC = () => {
  const router = useRouter();
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
        Bab 1
      </Typography>
      <Typography variant="body1" color="#000" fontWeight={100}>
        lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum
        dolor sit amet
      </Typography>

      <Stack direction="row-reverse" columnGap={1} rowGap={1.5}>
        <RoundedButton onClick={() => router.push(`/project/1/1/edit`)} sx={{ fontSize: "10px" }} variant="contained">
          Edit
        </RoundedButton>
        <RoundedButton onClick={() => router.push(`/project/1`)} sx={{ fontSize: "10px" }}>
          Kembali
        </RoundedButton>
      </Stack>
    </Stack>
  );
};
