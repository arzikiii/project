import { Stack, Typography } from "@mui/material";
import React from "react";

export const PageHeader: React.FC<{ title: string; desc?: string }> = ({ title, desc }) => {
  return (
    <>
      <Stack
        rowGap={1.5}
        mb={1.5}
        sx={{
          columnGap: 2,
          p: "24px 48px 24px 48px",
          mt: 2,
          bgcolor: "white",
          borderBottom: "1px solid",
          borderBottomColor: "#8988881f",
        }}
      >
        <Typography variant="h4" fontSize={3} color="#2623df">
          {title}
        </Typography>
        <Typography variant="subtitle1">{desc}</Typography>
      </Stack>
    </>
  );
};
