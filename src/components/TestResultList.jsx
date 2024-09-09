import TestResultItem from "./TestResultItem";

const TestResultList = ({ results, user, refreshResults }) => {
  return (
    <div>
      {results
        .filter((result) => result.visibility || result.userId === user.id)
        .map((result) => (
          <TestResultItem
            key={result.id}
            result={result}
            user={user}
            refreshResults={refreshResults}
          />
        ))}
    </div>
  );
};

export default TestResultList;
