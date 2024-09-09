import AuthForm from "../components/AuthForm";

const Login = ({ handleLogin }) => {
  return (
    <div>
      <AuthForm mode="login" onSubmit={handleLogin} />
    </div>
  );
};

export default Login;
