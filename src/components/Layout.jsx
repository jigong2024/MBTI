import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Layout = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {}, []);

  const handleLogout = () => {};

  return (
    <div>
      <header>
        <nav>
          <Link to="/">홈</Link>
        </nav>
      </header>
    </div>
  );
};

export default Layout;
