import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/authContext";

const AuthForm = ({ mode }) => {
  const { handleLogin, handleSignup } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    id: "",
    password: "",
    nickname: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (mode === "login") {
      const loginData = { id: formData.id, password: formData.password };
      handleLogin(loginData);
    } else if (mode === "signup") {
      handleSignup(formData);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="id">아이디</label>
          <input
            type="text"
            id="id"
            name="id"
            value={formData.id}
            onChange={handleChange}
            placeholder="아이디"
            required
          />
        </div>
        <div>
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="비밀번호"
            required
          />
        </div>

        {mode === "signup" && (
          <div>
            <label htmlFor="nickname">닉네임</label>
            <input
              type="text"
              id="nickname"
              name="nickname"
              value={formData.nickname}
              onChange={handleChange}
              placeholder="닉네임"
              required
            />
          </div>
        )}
        <button type="submit">
          {mode === "login" ? "로그인" : "회원가입"}
        </button>
      </form>
      <div>
        {mode === "login" ? (
          <>
            <span>가입된 계정이 없으신가요? </span>
            <Link to="/signup">회원가입</Link>
          </>
        ) : (
          <>
            <span>이미 계정이 있으신가요? </span>
            <Link to="/login">로그인</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
