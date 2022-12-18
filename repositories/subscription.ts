import axios, { AxiosError } from "axios";
import { ecomApi } from "../utils/apiClient";

export const fetchAvailablePlans = async (): Promise<any[]> => {
  try {
    const res = await ecomApi.get<any>(`/subscriptions/available-plans`);
    return res.data.availablePlans;
  } catch (error: any | AxiosError) {
    if (axios.isAxiosError(error)) {
      throw error.response;
    }
    throw error;
  }
};
