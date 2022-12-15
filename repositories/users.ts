import axios, { AxiosError } from "axios";
import { loginApi } from "../utils/apiClient";
import { User } from "../types/models";

interface signUpPayload {
  username: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export let userToken: string;

export const signUp = async (data: signUpPayload): Promise<User> => {
  try {
    const res = await loginApi.post("/users/signup", data);
    userToken = res.data;
    return res.data;
  } catch (error: any | AxiosError) {
    if (axios.isAxiosError(error)) {
      throw error.response;
    }
    throw error;
  }
};

interface loginPayload {
  uid: string;
  password: string;
}

export const login = async (data: loginPayload): Promise<User> => {
  try {
    const res = await loginApi.post("/users/login", data);
    userToken = res.data;
    return res.data;
  } catch (error: any | AxiosError) {
    if (axios.isAxiosError(error)) {
      throw error.response;
    }
    throw error;
  }
};
