import { Grid } from "@mui/material";
import React from "react";
import Layout from "../PageLayout/Layout";
import { PageHeader } from "../pageHeader";
import { SideBox } from "./sideBox";
import { ProjectListView } from "./projectListView";

export const DashboardPage: React.FC = () => {
  return (
    <Layout>
      <PageHeader title="Dashboard" desc="Informasi tentang Subscription dan Projek Anda." />
      <Grid container spacing={3} pt={3}>
        <Grid item xs={3}>
          <SideBox />
        </Grid>
        <Grid item xs={9}>
          <ProjectListView />
        </Grid>
      </Grid>
    </Layout>
  );
};
