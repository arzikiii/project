import React from "react";
import Layout from "../PageLayout/Layout";
import { PageHeader } from "../pageHeader";
import { SubsListView } from "./subsListView";

export const SubscriptionPage: React.FC = () => {
  return (
    <Layout>
      <PageHeader title="Subscription" desc="Jenis-jenis langganan yang bisa anda beli untuk mendapatkan fitur-fitur eksklusif." />
      <SubsListView />
    </Layout>
  );
};
