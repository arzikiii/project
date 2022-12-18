import useSWR from "swr";
import { fetchProject } from "../project";

export const useProject = () => {
  const { data, mutate, error } = useSWR("/projects", fetchProject);

  const loading = !data && !error;

  return {
    loading,
    projects: data,
    mutate,
  };
};
