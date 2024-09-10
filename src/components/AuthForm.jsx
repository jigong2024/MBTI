// import { useContext, useState } from "react";
// import { Link } from "react-router-dom";
// import AuthContext from "../context/authContext";

// const AuthForm = ({ mode }) => {
//   const { handleLogin, handleSignup } = useContext(AuthContext);

//   const [formData, setFormData] = useState({
//     id: "",
//     password: "",
//     nickname: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (mode === "login") {
//       const loginData = { id: formData.id, password: formData.password };
//       handleLogin(loginData);
//     } else if (mode === "signup") {
//       handleSignup(formData);
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="id">아이디</label>
//           <input
//             type="text"
//             id="id"
//             name="id"
//             value={formData.id}
//             onChange={handleChange}
//             placeholder="아이디"
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="password">비밀번호</label>
//           <input
//             type="password"
//             id="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             placeholder="비밀번호"
//             required
//           />
//         </div>

//         {mode === "signup" && (
//           <div>
//             <label htmlFor="nickname">닉네임</label>
//             <input
//               type="text"
//               id="nickname"
//               name="nickname"
//               value={formData.nickname}
//               onChange={handleChange}
//               placeholder="닉네임"
//               required
//             />
//           </div>
//         )}
//         <button type="submit">
//           {mode === "login" ? "로그인" : "회원가입"}
//         </button>
//       </form>
//       <div>
//         {mode === "login" ? (
//           <>
//             <span>가입된 계정이 없으신가요? </span>
//             <Link to="/signup">회원가입</Link>
//           </>
//         ) : (
//           <>
//             <span>이미 계정이 있으신가요? </span>
//             <Link to="/login">로그인</Link>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AuthForm;
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/authContext";
import styled from "styled-components";

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
    <FormContainer>
      <h1>{mode === "login" ? "로그인" : "회원가입"}</h1>
      <StyledForm onSubmit={handleSubmit}>
        <InputGroup>
          <StyledLabel htmlFor="id">아이디</StyledLabel>
          <StyledInput
            type="text"
            id="id"
            name="id"
            value={formData.id}
            onChange={handleChange}
            placeholder="아이디"
            required
          />
        </InputGroup>
        <InputGroup>
          <StyledLabel htmlFor="password">비밀번호</StyledLabel>
          <StyledInput
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="비밀번호"
            required
          />
        </InputGroup>
        {mode === "signup" && (
          <InputGroup>
            <StyledLabel htmlFor="nickname">닉네임</StyledLabel>
            <StyledInput
              type="text"
              id="nickname"
              name="nickname"
              value={formData.nickname}
              onChange={handleChange}
              placeholder="닉네임"
              required
            />
          </InputGroup>
        )}
        <SubmitButton type="submit">
          {mode === "login" ? "로그인" : "회원가입"}
        </SubmitButton>
      </StyledForm>
      <SwitchModeContainer>
        {mode === "login" ? (
          <>
            <span>가입된 계정이 없으신가요? </span>
            <StyledLink to="/signup">회원가입</StyledLink>
          </>
        ) : (
          <>
            <span>이미 계정이 있으신가요? </span>
            <StyledLink to="/login">로그인</StyledLink>
          </>
        )}
      </SwitchModeContainer>
    </FormContainer>
  );
};

export default AuthForm;

const FormContainer = styled.div`
  /* max-width: 400px; */
  /* margin: 0 auto; */
  width: 300px;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const InputGroup = styled.div`
  margin-bottom: 15px;
`;

const StyledLabel = styled.label`
  display: block;
  margin-bottom: 10px;
  color: #555;
`;

const StyledInput = styled.input`
  width: 93%;
  padding: 10px;
  border: 2px solid black;
  border-radius: 10px;
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: #4a90e2;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 10px;

  &:hover {
    background-color: #357abd;
  }
`;

const SwitchModeContainer = styled.div`
  margin-top: 20px;
  text-align: center;
  color: #666;
`;

const StyledLink = styled(Link)`
  color: #4a90e2;
  text-decoration: none;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;
