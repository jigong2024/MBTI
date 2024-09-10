import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/authContext";
import styled from "styled-components";

const Profile = () => {
  const { user, handleUpdateProfile } = useContext(AuthContext);
  const [nickname, setNickname] = useState("");

  useEffect(() => {
    if (user) {
      setNickname(user.nickname);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await handleUpdateProfile(nickname);
    } catch (error) {
      console.error("닉네임 업데이트 실패", error);
      alert("닉네임 업데이트 실패!");
    }
  };

  return (
    <Container>
      <h1>프로필 수정</h1>
      <FormContainer onSubmit={handleSubmit}>
        <label htmlFor="nickname">닉네임</label>
        <Input
          type="text"
          id="nickname"
          name="nickname"
          placeholder="nickname"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
        <TestBtn type="submit">닉네임 수정</TestBtn>
      </FormContainer>
    </Container>
  );
};

export default Profile;

const Container = styled.div`
  /* background-color: green; */
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  font-weight: bolder;
  font-size: 20px;
`;

const Input = styled.input`
  border: 2px solid black;
  border-radius: 10px;
  padding: 5px;
`;

const TestBtn = styled.button`
  text-decoration: none;
  border-radius: 10px;
  background-color: #007bff;
  padding: 10px;
  color: white;
  font-weight: bold;
  text-align: center;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #0056b3;
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;
