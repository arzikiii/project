import React from "react";
import { Grid, CircularProgress, Box } from "@mui/material";
import Layout from "../PageLayout/Layout";
import { PageHeader } from "../pageHeader";
import { SideDetail } from "./sideDetail";
import { ProjectStructureDetail } from "./projectStructureDetail";
import { useRouter } from "next/router";
import { RoundedButton } from "../roundedButton";
import { useProjectDetail } from "../../repositories/hooks/useProjectDetail";

export const ProjectDetailPage: React.FC = () => {
  const router = useRouter();
  const { projectId } = router.query;
  const id = Number(projectId);
  const { project, loading } = useProjectDetail(id);

  if (loading || !project) {
    return <CircularProgress />;
  }

  return (
    <Layout>
      <Box>
        <PageHeader title="Project title" />
        <Grid container spacing={3} pt={3}>
          <Grid item xs={3}>
            <SideDetail projectType={project.projectType.name} />
          </Grid>
          <Grid item xs={9}>
            <ProjectStructureDetail projectParts={project.projectParts} loading={loading} />
          </Grid>
        </Grid>
        <RoundedButton onClick={() => console.log(project.projectParts)}>click</RoundedButton>
      </Box>
    </Layout>
  );
};
