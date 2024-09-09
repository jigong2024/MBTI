import React from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div>
      <div>
        <h1>회원가입</h1>
        <form>
          <div>
            <label htmlFor="id">아이디</label>
            <input type="text" id="id" name="id" placeholder="id" />
          </div>
          <div>
            <label htmlFor="pw">비밀번호</label>
            <input type="password" id="pw" name="pw" placeholder="pw" />
          </div>
          <div>
            <label htmlFor="nickname">닉네임</label>
            <input
              type="text"
              id="nickname"
              name="nickname"
              placeholder="nickname"
            />
          </div>
          <button type="submit">로그인</button>
        </form>
        <div>
          <span>이미 계정이 있으신가요?</span>
          <Link to="/login">로그인</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
