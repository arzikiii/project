import { Box, Stack, Typography, Divider } from "@mui/material";
import React from "react";
import { RoundedButton } from "../roundedButton";
import { useRouter } from "next/router";
import { useProject } from "../../repositories/hooks/useProject";
import { deleteProject } from "../../repositories/project";
import { useProjectType } from "../../repositories/hooks/useProjectType";

export const LandingContent: React.FC = () => {
  const router = useRouter();
  return (
    <Box>
      <Stack gap={2}>
        <Stack
          direction="column"
          gap={1}
          mb={1}
          sx={{
            px: 2,
            py: "20px",
          }}
        >
          <Typography variant="h6" fontWeight={500} sx={{ mb: "8px" }}>
            Buat projek anda!
          </Typography>
          <Typography variant="caption" color="#000" fontWeight={100}>
            Anda bisa membuat projek sesuai dengan kebutuhan anda, buat akun untuk memulai membuat projek.
          </Typography>
          <Stack direction="row-reverse">
            <RoundedButton onClick={() => router.push("/signUp")} sx={{ fontSize: "10px" }} variant="contained">
              sign up
            </RoundedButton>
          </Stack>
        </Stack>
        <Divider />
        <Stack
          direction="column"
          gap={1}
          mb={1}
          sx={{
            px: 2,
            py: "20px",
          }}
        >
          <Typography variant="h6" fontWeight={500} sx={{ mb: "8px" }}>
            Dapatkan fitur sesuai dengan subscription plan!
          </Typography>
          <Typography variant="caption" color="#000" fontWeight={100}>
            Dapatkan fitur-fitur yang dapat membantu anda dalam mengerjakan projek anda sesuai dengan subscription plan.
          </Typography>
          <Stack direction="row-reverse">
            <RoundedButton onClick={() => router.push("/subscription")} sx={{ fontSize: "10px" }} variant="contained">
              Lihat Plan
            </RoundedButton>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};
