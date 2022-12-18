import useSWR from "swr";
import { fetchProjectById } from "../project";

export const projectDetailKey = (id: string) => `/projects/${id}`;

export const useCollectionDetail = (projectId: string) => {
  const { data, error, mutate } = useSWR([projectDetailKey(projectId), projectId], () => fetchProjectById(projectId));

  const loading = !data && !error;

  return {
    project: data,
    loading,
    error,
    mutate,
  };
};
