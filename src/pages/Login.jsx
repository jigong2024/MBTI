import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div>
      <div>
        <h1>로그인</h1>
        <form>
          <div>
            <label htmlFor="id">아이디</label>
            <input type="text" id="id" name="id" placeholder="id" />
          </div>
          <div>
            <label htmlFor="pw">비밀번호</label>
            <input type="password" id="pw" name="pw" placeholder="pw" />
          </div>
          <button type="submit">로그인</button>
        </form>
        <div>
          <span>계정이 없으신가요?</span>
          <Link to="/signup">회원가입</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
