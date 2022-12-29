import React from "react";
import { Stack, Typography } from "@mui/material";

interface Props {
  projectType: string;
}

export const SideDetail: React.FC<Props> = ({ projectType }) => {
  return (
    <Stack px={1.5} pb={1.5} borderRadius={4}>
      <Typography variant="h5" fontWeight={600} height="52px" px={2} display="flex" alignItems={"center"} color="#2623df">
        Tipe Projek
      </Typography>
      <Typography variant="h6" fontWeight={400} height="26px" px={2} pb={7}>
        {projectType}
      </Typography>
      <Typography variant="h5" fontWeight={600} height="52px" px={2} display="flex" alignItems={"center"} color="#2623df">
        Topik Projek
      </Typography>
      <Typography variant="h6" fontWeight={400} height="26px" px={2}>
        Machine Learning
      </Typography>
    </Stack>
  );
};
