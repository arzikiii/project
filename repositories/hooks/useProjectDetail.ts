import useSWR from "swr";
import { fetchProjectById } from "../project";

export const projectDetailKey = (id: number) => `/projects/${id}`;

export const useProjectDetail = (projectId: number) => {
  const { data, error, mutate } = useSWR([projectDetailKey(projectId), projectId], () => fetchProjectById(projectId));

  const loading = !data && !error;

  return {
    project: data,
    loading,
    error,
    mutate,
  };
};
