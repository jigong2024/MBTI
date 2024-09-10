import { authClient } from "./client";

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

// 프로필 조회
export const getUserProfile = async (token) => {
  const response = await authClient.get("/user", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// 프로필 업데이트 (닉네임만)
export const updateProfile = async (token, nickname) => {
  const response = await authClient.patch(
    "/profile",
    { nickname },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};
