import { Box, Stack, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import landingImage from "../../public/landingImage.jpg";

export const LandingTitle: React.FC = () => {
  return (
    <Stack
      rowGap={1.5}
      mb={1.5}
      sx={{
        columnGap: 2,
        p: "16px 48px 24px 48px",
        mt: 2,
        bgcolor: "white",
        borderBottom: "1px solid",
        borderBottomColor: "#8988881f",
      }}
    >
      <Typography variant="h4" align="center">
        Selamat Datang
      </Typography>
      <Typography gutterBottom variant="h4" align="center">
        RefnWrite
      </Typography>
      <Box>
        <Image src={landingImage} alt="Gambar Landing Page" width={1130} height={400} />
      </Box>
    </Stack>
  );
};
