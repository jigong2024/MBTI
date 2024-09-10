import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import TestPage from "./pages/TestPage";
import TestResultPage from "./pages/TestResultPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { getUserProfile, login, register, updateProfile } from "./api/auth";
import AuthContext from "./context/authContext";

const App = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    // console.log("stored token", token);

    fetchUserProfile(token);
  }, []);

  // 사용자 프로필 정보를 가져오는 함수
  const fetchUserProfile = async (token) => {
    try {
      const userProfile = await getUserProfile(token);
      // console.log("유저 정보", userProfile);

      if (userProfile.success) {
        setUser({
          id: userProfile.id,
          nickname: userProfile.nickname,
        });
        // console.log("유저", user);
      } else {
        throw new Error("Failed to fetch user profile");
      }
    } catch (error) {
      console.error("Failed to fetch user profile", error);
      localStorage.removeItem("authToken");
      setUser(null);
    }
  };

  const handleSignup = async (userData) => {
    try {
      await register(userData);
      navigate("/login");
      alert("회원가입이 되었습니다. 다시 로그인을 해주세요!");
    } catch (error) {
      console.error("Singup failed", error);
    }
  };

  const handleLogin = async (userData) => {
    try {
      // console.log("유저데이터", userData);
      const response = await login(userData);
      // console.log(response);
      localStorage.setItem("authToken", response.accessToken);

      await fetchUserProfile(response.accessToken);
      navigate("/");
      alert("로그인 되었습니다!");
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setUser(null);
    navigate("/login");
    alert("로그아웃 되었습니다!");
  };

  const handleUpdateProfile = async (nickname) => {
    try {
      const token = localStorage.getItem("authToken");
      // API 호출하여 프로필 업데이트 (닉네임만)
      const updatedProfile = await updateProfile(token, nickname);
      // 업데이트된 정보로 user 상태 갱신
      setUser((prevUser) => ({
        ...prevUser,
        nickname: updatedProfile.nickname,
      }));
      alert("닉네임이 업데이트되었습니다!");
    } catch (error) {
      console.error("Profile update failed", error);
      alert("닉네임 업데이트에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        handleLogin,
        handleLogout,
        handleSignup,
        handleUpdateProfile,
      }}
    >
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/test"
            element={
              <ProtectedRoute>
                <TestPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/result"
            element={
              <ProtectedRoute>
                <TestResultPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Layout>
    </AuthContext.Provider>
  );
};

export default App;
