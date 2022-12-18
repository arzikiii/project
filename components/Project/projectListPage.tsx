import React from "react";
import Layout from "../PageLayout/Layout";
import { PageHeader } from "../pageHeader";
import { ProjectListView } from "../Dashboard/projectListView";

export const ProjectListPage: React.FC = () => {
  return (
    <Layout>
      <PageHeader title="Your Project" desc="Semua projek yang anda buat." />
      <ProjectListView />
    </Layout>
  );
};
