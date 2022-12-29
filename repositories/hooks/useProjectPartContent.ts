import useSWR from "swr";
import { fetchProjectPartById } from "../project";

export const projectContentKey = (projectId: number, projectPartId: number) => `/projects/${projectId}/parts/${projectPartId}/content`;

export const useProjectPartContent = (projectId: number, projectPartId: number) => {
  const { data, error, mutate } = useSWR([projectContentKey(projectId, projectPartId), projectId, projectPartId], () => fetchProjectPartById(projectId, projectPartId));

  const loading = !data && !error;

  return {
    content: data,
    loading,
    error,
    mutate,
  };
};
