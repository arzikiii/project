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

interface orderPayload {
  planId: Number;
}

export const makeOrder = async (data: orderPayload): Promise<any> => {
  try {
    const res = await ecomApi.post("/subscriptions/orders", data);
    return res.data;
  } catch (error: any | AxiosError) {
    if (axios.isAxiosError(error)) {
      throw error.response;
    }
    throw error;
  }
};
