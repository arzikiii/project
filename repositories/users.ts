import axios, { AxiosError } from "axios";
import { loginApi, ecomApi } from "../utils/apiClient";
import { User } from "../types/models";

interface signUpPayload {
  username: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export const signUp = async (data: signUpPayload): Promise<User> => {
  try {
    const res = await loginApi.post("/users/signup", data);
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
    localStorage.setItem("user", `${res.data.type} ${res.data.token}`);
    return res.data;
  } catch (error: any | AxiosError) {
    if (axios.isAxiosError(error)) {
      throw error.response;
    }
    throw error;
  }
};

export const fetchUser = async (): Promise<User> => {
  try {
    const res = await ecomApi.get<User>(`/users/profile`);
    return res.data;
  } catch (error: any | AxiosError) {
    if (axios.isAxiosError(error)) {
      throw error.response;
    }
    throw error;
  }
};

export const logOut = async () => {
  try {
    await ecomApi.post("/users/logout");
  } catch (error: any | AxiosError) {
    if (axios.isAxiosError(error)) {
      throw error.response;
    }
    throw error;
  }
};
