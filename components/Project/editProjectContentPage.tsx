import React from "react";
import Layout from "../PageLayout/Layout";
import { CircularProgress } from "@mui/material";
import { PageHeader } from "../pageHeader";
import { EditProjectContent } from "./editProjectContent";
import { useRouter } from "next/router";
import { useProjectDetail } from "../../repositories/hooks/useProjectDetail";
import { useProjectPartContent } from "../../repositories/hooks/useProjectPartContent";
import { projectParts } from "../../types/models";

export const EditProjectContentPage: React.FC = () => {
  const router = useRouter();
  const { projectId, projectPartId } = router.query;
  const { content, loading, mutate } = useProjectPartContent(Number(projectId), Number(projectPartId));
  const { project, loading: projectLoading } = useProjectDetail(Number(projectId));

  if (loading || !content || projectLoading || !project) {
    return <CircularProgress />;
  }

  const projectPart: projectParts | undefined = project.projectParts.find((item) => item.id === Number(projectPartId));

  return (
    <Layout>
      <PageHeader title={project.name} />
      <EditProjectContent projectContent={content} projectPart={projectPart} />
    </Layout>
  );
};
