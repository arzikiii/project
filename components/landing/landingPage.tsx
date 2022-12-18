import React from "react";
import Layout from "../PageLayout/Layout";
import { LandingTitle } from "./landingTitle";
import { LandingContent } from "./landingContent";

export const LandingPage: React.FC = () => {
  return (
    <Layout>
      <LandingTitle />
      <LandingContent />
    </Layout>
  );
};
