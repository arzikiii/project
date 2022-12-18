import axios, { AxiosError } from "axios";
import { Projects, ProjectType, Type } from "../types/models";
import { ecomApi } from "../utils/apiClient";

export const fetchProject = async (): Promise<Projects[]> => {
  try {
    const res = await ecomApi.get<any>(`/projects`);
    return res.data.projects;
  } catch (error: any | AxiosError) {
    if (axios.isAxiosError(error)) {
      throw error.response;
    }
    throw error;
  }
};

export const fetchProjectType = async (): Promise<any> => {
  try {
    const res = await ecomApi.get<any>(`/projects/types`);
    return res.data.types;
  } catch (error: any | AxiosError) {
    if (axios.isAxiosError(error)) {
      throw error.response;
    }
    throw error;
  }
};

export const fetchProjectById = async (id: string): Promise<Projects> => {
  try {
    const res = await ecomApi.get<Projects>(`books/${id}`);
    return res.data;
  } catch (error: any | AxiosError) {
    if (axios.isAxiosError(error)) {
      throw error.response;
    }
    throw error;
  }
};

export const deleteProject = async (id: string) => {
  try {
    const res = await ecomApi.delete(`/projects/${id}`);
    return res.data;
  } catch (error: any | AxiosError) {
    if (axios.isAxiosError(error)) throw error.response;
    throw error;
  }
};

interface projectPayload {
  name: string;
  projectTypeId: number;
}

export const createProject = async (data: projectPayload): Promise<Projects> => {
  try {
    const res = await ecomApi.post("/projects", data);
    return res.data;
  } catch (error: any | AxiosError) {
    if (axios.isAxiosError(error)) {
      throw error.response;
    }
    throw error;
  }
};
