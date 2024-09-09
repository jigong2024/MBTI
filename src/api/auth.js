import { authClient } from "./authClient";

// 회원가입
export const register = async (userData) => {
  const response = await authClient.post("/register", userData);
  return response.data;
};

// 로그인
export const login = async (userData) => {
  const response = await authClient.post("/login", userData);
  return response.data;
};

// 프로필
export const getUserProfile = async (token) => {
  const response = await authClient.get("/profile", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// 업데이트 프로필
export const updateProfile = async (token, formData) => {
  const response = await authClient.patch("/profile", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
