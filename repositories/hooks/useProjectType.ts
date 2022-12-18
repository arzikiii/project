import useSWR from "swr";
import { fetchProjectType } from "../project";

export const useProjectType = () => {
  const { data, mutate, error } = useSWR("/types", fetchProjectType);

  const loading = !data && !error;

  return {
    loading,
    projectType: data,
    mutate,
  };
};
