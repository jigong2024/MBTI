import { resultClient } from "./client";

export const getTestResults = async () => {
  const response = await resultClient.get("/");
  return response.data;
};

export const createTestResult = async (resultData) => {
  const response = await resultClient.post("/", resultData);
  return response.data;
};

export const deleteTestResult = async (id) => {
  const response = await resultClient.delete(`/${id}`);
  return response.data;
};

export const updateTestResult = async (id, visibility) => {
  const response = await resultClient.patch(`/${id}`, {
    visibility,
  });
  return response.data;
};
