import { apiClient } from "./apiClient";

export const getSections = async () => {
  const { data } = await apiClient.get("/api/sections");
  return data;
};

export const getSectionByKey = async (key) => {
  const { data } = await apiClient.get(`/api/sections/${key}`);
  return data;
};

export const updateSection = async (key, payload) => {
  const { data } = await apiClient.put(`/api/sections/${key}`, payload);
  return data;
};
