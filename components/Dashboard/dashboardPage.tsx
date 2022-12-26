import { Grid, CircularProgress, Box } from "@mui/material";
import React from "react";
import Layout from "../PageLayout/Layout";
import { PageHeader } from "../pageHeader";
import { SideBox } from "./sideBox";
import { ProjectListView } from "./projectListView";
import { useUser } from "../../repositories/hooks/useUser";
import { useProject } from "../../repositories/hooks/useProject";

export const DashboardPage: React.FC = () => {
  const { loading } = useUser();
  const { loading: projectLoading } = useProject();

  if (loading || projectLoading) {
    return <CircularProgress />;
  }

  return (
    <Layout>
      <Box>
        <PageHeader title="Dashboard" desc="Informasi tentang Subscription dan Projek Anda." />
        <Grid container spacing={3} pt={3}>
          <Grid item xs={3}>
            <SideBox />
          </Grid>
          <Grid item xs={9}>
            <ProjectListView />
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
};
