import React from "react";
import { Grid, CircularProgress, Box } from "@mui/material";
import Layout from "../PageLayout/Layout";
import { PageHeader } from "../pageHeader";
import { ProjectContent } from "./projectContent";
import { useRouter } from "next/router";
import { useProjectPartContent } from "../../repositories/hooks/useProjectPartContent";
import { useProjectDetail } from "../../repositories/hooks/useProjectDetail";
import { projectParts } from "../../types/models";

export const ProjectContentPage: React.FC = () => {
  const router = useRouter();
  const { projectId, projectPartId } = router.query;
  const { content, loading } = useProjectPartContent(Number(projectId), Number(projectPartId));
  const { project, loading: projectLoading } = useProjectDetail(Number(projectId));

  if (loading || !content || projectLoading || !project) {
    return <CircularProgress />;
  }

  const projectPart: projectParts | undefined = project.projectParts.find((item) => item.id === Number(projectPartId));

  return (
    <Layout>
      <PageHeader title={project.name} />
      <ProjectContent projectContent={content} projectPart={projectPart} />
    </Layout>
  );
};
