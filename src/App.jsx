// import { useEffect, useState } from "react";
// import { Route, Routes, useNavigate } from "react-router-dom";
// import Layout from "./components/Layout";
// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import Profile from "./pages/Profile";
// import TestPage from "./pages/TestPage";
// import TestResultPage from "./pages/TestResultPage";
// import ProtectedRoute from "./components/ProtectedRoute";
// import { login, register } from "./api/auth";

// const App = () => {
//   const [user, setUser] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem("authToken");
//     setUser(!!token);
//   }, []);

//   const handleSignup = async (userData) => {
//     try {
//       await register(userData);
//       navigate("/login");
//       alert("회원가입이 되었습니다. 다시 로그인을 해주세요!");
//     } catch (error) {
//       console.error("Singup failed", error);
//     }
//   };

//   const handleLogin = async (userData) => {
//     try {
//       const response = await login(userData);
//       localStorage.setItem("authToken", response.token);
//       setUser(true);
//       navigate("/");
//       alert("로그인 되었습니다!");
//     } catch (error) {
//       console.error("Login failed", error);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("authToken");
//     setUser(false);
//     navigate("/login");
//     alert("로그아웃 되었습니다!");
//   };

//   return (
//     <Layout user={user} handleLogout={handleLogout}>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login handleLogin={handleLogin} />} />
//         <Route
//           path="/signup"
//           element={<Signup handleSignup={handleSignup} />}
//         />
//         <Route
//           path="/profile"
//           element={
//             <ProtectedRoute user={user}>
//               <Profile />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/test"
//           element={
//             <ProtectedRoute user={user}>
//               <TestPage />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/result"
//           element={
//             <ProtectedRoute user={user}>
//               <TestResultPage />
//             </ProtectedRoute>
//           }
//         />
//       </Routes>
//     </Layout>
//   );
// };

// export default App;

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
import { getUserProfile, login, register } from "./api/auth";

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

  return (
    <Layout user={user} handleLogout={handleLogout}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login handleLogin={handleLogin} />} />
        <Route
          path="/signup"
          element={<Signup handleSignup={handleSignup} />}
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute user={user}>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/test"
          element={
            <ProtectedRoute user={user}>
              <TestPage user={user} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/result"
          element={
            <ProtectedRoute user={user}>
              <TestResultPage user={user} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Layout>
  );
};

export default App;
