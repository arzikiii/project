import axios from "axios";
import { BASE_URL } from "./constant";
import { getToken } from "../repositories/hooks/useToken";

export const loginApi = axios.create({
  baseURL: `${BASE_URL}/api`,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

loginApi.interceptors.request.use((request) => {
  console.log(`user => ${request.method} | ${request.url}`);
  return request;
});

export const ecomApi = axios.create({
  baseURL: `${BASE_URL}/api`,
  headers: {
    "Content-Type": "application/json",
    Authorization: getToken(),
    Accept: "application/json",
  },
});

ecomApi.interceptors.request.use((request) => {
  console.log(`api => ${request.method} | ${request.url}`);
  return request;
});
