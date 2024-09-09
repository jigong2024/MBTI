import { useEffect, useState } from "react";
import { getTestResults } from "../api/testResults";
import TestResultList from "../components/TestResultList";
import { getUserProfile } from "../api/auth";

const TestResultPage = () => {
  const [results, setResults] = useState([]);
  const [user, setUser] = useState(null);

  const fetchResults = async () => {
    const data = await getTestResults();
    // console.log("data", data);
    setResults(data);
    // console.log(results);
  };

  const fetchUserProfile = async () => {
    const token = localStorage.getItem("authToken");
    const userData = await getUserProfile(token);
    setUser(userData);
  };

  useEffect(() => {
    fetchResults();
    fetchUserProfile();
  }, []);

  const refreshData = () => {
    fetchResults();
    fetchUserProfile();
  };

  return (
    <div>
      <h1>모든 테스트 결과</h1>
      {user && (
        <TestResultList
          results={results}
          user={user}
          refreshResults={refreshData}
        />
      )}
    </div>
  );
};

export default TestResultPage;
