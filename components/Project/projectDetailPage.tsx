import React from "react";
import { Grid, CircularProgress, Box } from "@mui/material";
import Layout from "../PageLayout/Layout";
import { PageHeader } from "../pageHeader";
import { SideDetail } from "./sideDetail";
import { ProjectStructureDetail } from "./projectStructureDetail";

export const ProjectDetailPage: React.FC = () => {
  return (
    <Layout>
      <Box>
        <PageHeader title="Project title" />
        <Grid container spacing={3} pt={3}>
          <Grid item xs={3}>
            <SideDetail />
          </Grid>
          <Grid item xs={9}>
            <ProjectStructureDetail />
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
};
