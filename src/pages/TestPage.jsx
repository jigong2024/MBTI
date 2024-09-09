import TestForm from "../components/TestForm";
import { useState } from "react";
import { questions } from "../data/questions";

const TestPage = ({ user }) => {
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

  return (
    <div>
      <h1>MBTI 테스트 페이지</h1>

      <TestForm
        calculateMBTI={calculateMBTI}
        handleAnswer={handleAnswer}
        answers={answers}
        setResult={setResult}
      />
    </div>
  );
};

export default TestPage;
