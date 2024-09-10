import { useContext } from "react";
import TestResultItem from "./TestResultItem";
import AuthContext from "../context/authContext";

const TestResultList = ({ results, refreshResults }) => {
  const { user } = useContext(AuthContext);
  return (
    <div>
      {results
        .filter((result) => result.visibility || result.userId === user.id)
        .map((result) => (
          <TestResultItem
            key={result.id}
            result={result}
            // currentUser={user}
            refreshResults={refreshResults}
          />
        ))}
    </div>
  );
};

export default TestResultList;
