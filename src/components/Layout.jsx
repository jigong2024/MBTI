import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/authContext";

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const { user, handleLogout } = useContext(AuthContext);

  useEffect(() => {}, []);

  const onLogout = () => {
    handleLogout();
    navigate("/login");
  };

  return (
    <div className="content">
      <header>
        <nav>
          <Link to="/">홈</Link>
          <div>
            {user ? (
              <>
                <Link to="/profile">프로필 수정</Link>
                <Link to="/result">결과 보기</Link>

                <button onClick={onLogout}>로그아웃</button>
              </>
            ) : (
              <Link to="/login">로그인</Link>
            )}
          </div>
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
