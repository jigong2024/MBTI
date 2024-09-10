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
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      fetchUserProfile(token);
    } else {
      setLoading(false);
    }
  }, []);

  // 회원가입 로직
  const handleSignup = async (userData) => {
    try {
      await register(userData);
      navigate("/login");
      alert("회원가입이 되었습니다. 다시 로그인을 해주세요!");
    } catch (error) {
      console.error("Singup failed", error);
    }
  };

  // 로그인 로직
  const handleLogin = async (userData) => {
    try {
      const response = await login(userData);
      localStorage.setItem("authToken", response.accessToken);

      await fetchUserProfile(response.accessToken);
      navigate("/");
      alert("로그인 되었습니다!");
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  // 로그인 후, 프로필 정보 가져오는 로직
  const fetchUserProfile = async (token) => {
    try {
      const userProfile = await getUserProfile(token);

      if (userProfile.success) {
        setUser({
          id: userProfile.id,
          nickname: userProfile.nickname,
        });
      } else {
        throw new Error("Failed to fetch user profile");
      }
    } catch (error) {
      console.error(error);
      alert("프로필 정보 가져오는데 실패하였습니다. 다시 시도해 주세요.");
    } finally {
      setLoading(false);
    }
  };

  // 프로필 업데이트 로직
  const handleUpdateProfile = async (nickname) => {
    try {
      const token = localStorage.getItem("authToken");
      const updatedProfile = await updateProfile(token, nickname);
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

  // 로그아웃 로직
  const handleLogout = (showAlert = true) => {
    localStorage.removeItem("authToken");
    setUser(null);
    navigate("/login");
    if (showAlert) {
      alert("로그아웃 되었습니다!");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

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
