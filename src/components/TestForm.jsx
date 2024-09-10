import { questions } from "../data/questions";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
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
                // 버튼
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
        <button type="submit">제출하기</button>
      </form>
    </div>
  );
};

export default TestForm;

const SelectBtn = styled.button`
  padding: 10px 20px;
  margin: 5px;
  border: 1px solid black;
  border-radius: 5px;
  cursor: pointer;
  background-color: ${({ $btnColor }) => $btnColor};
`;
