import { useEffect, useState } from "react";
import {
  deleteTestResult,
  getTestResults,
  updateTestResult,
} from "../api/testResults";
import TestResultList from "../components/TestResultList";

const TestResultPage = ({ user }) => {
  const [results, setResults] = useState([]);

  const fetchResults = async () => {
    const data = await getTestResults();
    // console.log("data", data);
    setResults(data);
    // console.log(results);
  };

  useEffect(() => {
    fetchResults();
  }, []);

  return (
    <div>
      <h1>모든 테스트 결과</h1>
      <TestResultList
        results={results}
        user={user}
        refreshResults={fetchResults}
      />
    </div>
  );
};

export default TestResultPage;
