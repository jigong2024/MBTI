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
          <div>
            {user ? (
              <>
                <button>프로필 테스트</button>
                <button>결과 보기</button>

                <button onClick={handleLogout}>로그아웃</button>
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
