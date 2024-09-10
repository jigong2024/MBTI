import { Link } from "react-router-dom";
import styled from "styled-components";

const Home = () => {
  return (
    <DivContainer>
      <h1>무료 MBTI 검사</h1>
      <h2>자신의 성격 유형을 확인할 수 있도록 솔직하게 답변해 주세요!</h2>
      <BoxContainer>
        <Box>
          <h3>성격 유형 검사</h3>
          <p>
            자신의 성격 유형을 파악하고 삶의 여러 영역에서 어떤 영향을 미치는지
            알아보세요.
          </p>
        </Box>
        <Box>
          <h3>성격 유형 이해</h3>
          <p>
            다른 사람들이 어떻게 행동하는지 이해하는데 도움을 줄 수 있습니다.
          </p>
        </Box>
        <Box>
          <h3>팀 평가</h3>
          <p>
            팀 내에서 자신과 동료들의 성격을 이해하고 협력할 수 있는 방법을
            배워보세요.
          </p>
        </Box>
      </BoxContainer>
      <BtnContainer>
        <TestBtn to="/test">무료 테스트 시작</TestBtn>
      </BtnContainer>
    </DivContainer>
  );
};

export default Home;

const DivContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  /* color: #0056b3; */
`;

const BoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Box = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  border: 2px solid #0056b3;
  padding: 10px;
  border-radius: 10px;
  background-color: white;
`;

const BtnContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100px;
`;

const TestBtn = styled(Link)`
  text-decoration: none;
  border-radius: 10px;
  background-color: #007bff;
  padding: 12px 20px;
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
