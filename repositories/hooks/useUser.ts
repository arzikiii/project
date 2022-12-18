import useSWR from "swr";
import { fetchUser } from "../users";

export const useUser = () => {
  const { data, mutate, error } = useSWR("/users/profile", fetchUser);

  const loading = !data && !error;

  return {
    loading,
    user: data,
    mutate,
  };
};
