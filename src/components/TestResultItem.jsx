import { useContext } from "react";
import { deleteTestResult, updateTestResult } from "../api/testResults";
import AuthContext from "../context/authContext";
import styled from "styled-components";

const mbtiDescriptions = {
  ISTJ: "책임감 있고 신뢰할 수 있으며, 전통적이고 실용적인 사고방식을 가지고 있습니다.",
  ISFJ: "헌신적이고 따뜻하며, 사람들의 필요를 잘 이해하고 도와줍니다.",
  INFJ: "이상적이며 통찰력이 뛰어나고, 사람들과의 깊은 관계를 중요시합니다.",
  INTJ: "독립적이고 전략적이며, 높은 목표를 설정하고 달성하는 데 집중합니다.",
  ISTP: "문제 해결 능력이 뛰어나고, 상황에 맞게 유연하게 대처합니다.",
  ISFP: "예술적 감각이 뛰어나며, 감정 표현을 중요시합니다.",
  INFP: "이상적이고 창의적이며, 내면의 가치를 중요시합니다.",
  INTP: "논리적이고 분석적이며, 지적 호기심이 강합니다.",
  ESTP: "활동적이고 실용적이며, 순간의 기회를 포착하는 능력이 뛰어납니다.",
  ESFP: "사교적이고 쾌활하며, 현재의 순간을 즐깁니다.",
  ENFP: "열정적이고 창의적이며, 새로운 가능성을 탐구합니다.",
  ENTP: "논쟁을 즐기며, 창의적인 문제 해결 능력을 가지고 있습니다.",
  ESTJ: "체계적이고 효율적이며, 목표 달성에 집중합니다.",
  ESFJ: "사교적이고 따뜻하며, 다른 사람들의 감정을 잘 이해합니다.",
  ENFJ: "카리스마 있고 공감 능력이 뛰어나며, 사람들을 이끄는 데 탁월합니다.",
  ENTJ: "결단력 있고 목표 지향적이며, 리더십을 발휘합니다.",
};

const TestResultItem = ({ result, refreshResults }) => {
  const { user } = useContext(AuthContext);

  const isOwner = result.userId === user.id;
  const formattedDate = new Date(result.date).toLocaleString();
  const description =
    mbtiDescriptions[result.result] || "MBTI 유형 설명을 찾을 수 없습니다.";

  const handleToggleVisibility = async () => {
    try {
      const newVisibility = !result.visibility;
      await updateTestResult(result.id, newVisibility);
      refreshResults();
    } catch (error) {
      console.error("Visibility toggle failed:", error);
      alert("Visibility toggle failed. Please try again.");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTestResult(result.id);
      refreshResults();
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Delete failed. Please try again.");
    }
  };

  return (
    <ResultBox>
      <Header>
        <h4>{isOwner ? user.nickname : result.nickname}</h4>
        <Nowdate>{formattedDate}</Nowdate>
      </Header>
      <MBTIResult>{result.result}</MBTIResult>
      <Description>{description}</Description>
      {isOwner && (
        <Header>
          <StyledButton onClick={handleToggleVisibility}>
            {result.visibility ? "비공개로 전환" : "공개로 전환"}
          </StyledButton>
          <StyledButton onClick={handleDelete} delete>
            삭제
          </StyledButton>
        </Header>
      )}
    </ResultBox>
  );
};

export default TestResultItem;

const ResultBox = styled.div`
  border: 2px solid black;
  border-radius: 10px;
  margin-top: 20px;
  padding: 10px;
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

  &:hover {
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
    background-color: #007bff77;
  }
`;

const Header = styled.div`
  font-size: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const Nowdate = styled.p`
  margin: 5px 0 0;
  font-size: 14px;
  color: #777;
`;

const MBTIResult = styled.p`
  font-size: 24px;
  font-weight: bold;
  color: #4a90e2;
  margin: 0;
`;

const Description = styled.p`
  font-size: 16px;
  color: #555;
  line-height: 1.5;
  margin-bottom: 15px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const StyledButton = styled.button`
  /* padding: 8px 12px; */
  /* border: none; */
  border-radius: 5px;
  /* font-size: 14px; */
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: ${(props) => (props.delete ? "#ff6b6b" : "#4a90e2")};
  color: white;

  &:hover {
    background-color: black;
  }
`;
