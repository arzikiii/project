import React from "react";
import { Grid, CircularProgress, Box } from "@mui/material";
import Layout from "../PageLayout/Layout";
import { PageHeader } from "../pageHeader";
import { ProjectContent } from "./projectContent";

export const ProjectContentPage: React.FC = () => {
  return (
    <Layout>
      <PageHeader title="Project title" />
      <ProjectContent />
    </Layout>
  );
};
