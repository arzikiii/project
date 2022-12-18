import React from "react";
import Layout from "../PageLayout/Layout";
import { PageHeader } from "../pageHeader";
import { CreateProject } from "./createProject";

export const CreateProjectPage: React.FC = () => {
  return (
    <Layout>
      <PageHeader title="Create Project" desc="Buat projek baru" />
      <CreateProject />
    </Layout>
  );
};
