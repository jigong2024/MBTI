import { useContext, useEffect, useState } from "react";
import { getTestResults } from "../api/testResults";
import TestResultList from "../components/TestResultList";
import AuthContext from "../context/authContext";

const TestResultPage = () => {
  const { user } = useContext(AuthContext);
  const [results, setResults] = useState([]);

  const fetchResults = async () => {
    const data = await getTestResults();
    setResults(data);
  };

  useEffect(() => {
    fetchResults();
  }, []);

  const refreshData = () => {
    fetchResults();
  };

  return (
    <div>
      <h1>모든 테스트 결과</h1>
      {user && (
        <TestResultList results={results} refreshResults={refreshData} />
      )}
    </div>
  );
};

export default TestResultPage;
