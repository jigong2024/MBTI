import { questions } from "../data/questions";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { createTestResult } from "../api/testResults";
import { useContext } from "react";
import AuthContext from "../context/authContext";

const TestForm = ({ handleAnswer, calculateMBTI, answers, setResult }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // console.log("user", user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(answers).length === questions.length) {
      const answersArray = questions.map((q) => answers[q.id]);
      const mbtiResult = calculateMBTI(answersArray);

      const resultData = {
        userId: user.id,
        nickname: user.nickname,
        result: mbtiResult,
        answers: answersArray,
        date: new Date().toISOString(),
        visibility: true,
      };

      try {
        await createTestResult(resultData);
        setResult(mbtiResult);
        navigate("/result");
      } catch (error) {
        console.error("Error submitting test result:", error);
        alert("결과 제출 중 오류가 발생했습니다. 다시 시도해 주세요!");
      }
    } else {
      alert("모든 질문에 답해주세요!");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {questions.map((q) => (
          <div key={q.id}>
            <p>{q.question}</p>
            <div>
              {q.options.map((option) => (
                <SelectBtn
                  key={option}
                  type="button"
                  onClick={() => handleAnswer(q.id, option)}
                  $btnColor={answers[q.id] === option ? "lightblue" : "white"}
                >
                  {option}
                </SelectBtn>
              ))}
            </div>
          </div>
        ))}
        <BtnContainer>
          <TestBtn type="submit">제출하기</TestBtn>
        </BtnContainer>
      </form>
    </div>
  );
};

export default TestForm;

const SelectBtn = styled.button`
  padding: 10px 20px;
  margin: 5px;
  border: 2px solid black;
  border-radius: 10px;
  cursor: pointer;
  background-color: ${({ $btnColor }) => $btnColor};
`;

const BtnContainer = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 10px;
`;

const TestBtn = styled.button`
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
