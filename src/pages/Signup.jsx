import AuthForm from "../components/AuthForm";

const Signup = ({ handleSignup }) => {
  return (
    <div>
      <AuthForm mode="signup" onSubmit={handleSignup} />
    </div>
  );
};

export default Signup;
