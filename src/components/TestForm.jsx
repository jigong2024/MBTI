import { useState } from "react";
import { questions } from "../data/questions";
import styled from "styled-components";

const TestForm = () => {
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  const calculateMBTI = (answers) => {
    const scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };

    answers.forEach((answer, index) => {
      const question = questions[index];
      if (question.type === "E/I") {
        scores[answer === "예" ? "E" : "I"]++;
      } else if (question.type === "S/N") {
        scores[answer === "예" ? "S" : "N"]++;
      } else if (question.type === "T/F") {
        scores[answer === "예" ? "T" : "F"]++;
      } else if (question.type === "J/P") {
        scores[answer === "예" ? "J" : "P"]++;
      }
    });

    const result = `${scores.E >= scores.I ? "E" : "I"}${
      scores.S >= scores.N ? "S" : "N"
    }${scores.T >= scores.F ? "T" : "F"}${scores.J >= scores.P ? "J" : "P"}`;
    return result;
  };

  const handleAnswer = (id, answer) => {
    setAnswers((prev) => ({ ...prev, [id]: answer }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(answers).length === questions.length) {
      const answersArray = questions.map((q) => answers[q.id]);
      const mbtiResult = calculateMBTI(answersArray);
      setResult(mbtiResult);
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
                <SeletBtn
                  key={option}
                  type="button"
                  onClick={() => handleAnswer(q.id, option)}
                  btnColor={answers[q.id] === option ? "lightblue" : "white"}
                >
                  {option}
                </SeletBtn>
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

const SeletBtn = styled.button`
  padding: 10px 20px;
  margin: 5px;
  background-color: white;
  border: 1px solid black;
  border-radius: 5px;
  cursor: pointer;
  background-color: ${({ btnColor }) => btnColor};
`;
