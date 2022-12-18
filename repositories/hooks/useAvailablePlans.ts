import useSWR from "swr";
import { fetchAvailablePlans } from "../subscription";

export const useAvailablePlans = () => {
  const { data, mutate, error } = useSWR("/subscriptions/available-plans", fetchAvailablePlans);

  const loading = !data && !error;

  return {
    loading,
    plans: data,
    mutate,
  };
};
