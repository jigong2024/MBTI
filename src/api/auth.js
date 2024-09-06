import axios from "axios";

const API_URL = "https://moneyfulpublicpolicy.co.kr";

// 회원가입
export const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

// 로그인
export const login = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);
  return response.data;
};

// 프로필
export const getUserProfile = async (token) => {
  const response = await axios.get(`${API_URL}/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// 업데이트 프로필
export const updateProfile = async (token, formData) => {
  const response = await axios.patch(`${API_URL}/profile`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
