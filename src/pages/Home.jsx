import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Home = () => {
  return (
    <div>
      <h1>무료 MBTI 검사</h1>
      <h3>자신의 성격 유형을 확인할 수 있도록 솔직하게 답변해 주세요!</h3>
      <BoxContainer>
        <Box>
          <p>성격 유형 검사</p>
          <p>
            자신의 성격 유형을 파악하고 삶의 여러 영역에서 어떤 영향을 미치는지
            알아보세요.
          </p>
        </Box>
        <Box>
          <p>성격 유형 이해</p>
          <p>
            다른 사람들이 어떻게 행동하는지 이해하는데 도움을 줄 수 있습니다.
          </p>
        </Box>
        <Box>
          <p>팀 평가</p>
          <p>
            팀 내에서 자신과 동료들의 성격을 이해하고 협력할 수 있는 방법을
            배워보세요.
          </p>
        </Box>
      </BoxContainer>
      <BtnContainer>
        <TestBtn to="/test">무료 테스트 시작</TestBtn>
      </BtnContainer>
    </div>
  );
};

export default Home;

const BoxContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  padding: 10px;
  border-radius: 5px;
`;

const BtnContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100px;
`;

const TestBtn = styled(Link)`
  border: 1px soliㅇ black;
  border-radius: 5px;
  background-color: green;
  color: white;
`;
