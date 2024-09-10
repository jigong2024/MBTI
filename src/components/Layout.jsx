import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/authContext";
import styled from "styled-components";

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const { user, handleLogout } = useContext(AuthContext);

  useEffect(() => {}, []);

  const onLogout = () => {
    handleLogout();
    navigate("/login");
  };

  return (
    <PageWrapper>
      <FixHeader>
        <NavContainer>
          <StyledLink to="/">홈</StyledLink>
          <InNav>
            {user ? (
              <>
                <StyledLink to="/profile">프로필 수정</StyledLink>
                <StyledLink to="/result">결과 보기</StyledLink>
                <LogoutButton onClick={onLogout}>로그아웃</LogoutButton>
              </>
            ) : (
              <StyledLink to="/login">로그인</StyledLink>
            )}
          </InNav>
        </NavContainer>
      </FixHeader>
      <ContentWrapper>
        <Container>
          <main>{children}</main>
        </Container>
      </ContentWrapper>
    </PageWrapper>
  );
};

export default Layout;

const PageWrapper = styled.div`
  min-height: 100vh;
  background-image: url("/images/background.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  max-height: 700px;
  max-width: 700;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: rgba(255, 255, 255, 0.9);
  padding: 10px 20px;
  min-width: 700px;
  min-height: 700px;
  overflow-y: auto;
  border-radius: 20px;
  box-shadow: 0 4px 6px black(0, 0, 0, 0.8);
`;

const FixHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const NavContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const InNav = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #333;
  font-weight: 500;
  transition: color 0.3s ease;

  &:hover {
    color: #007bff;
  }
`;

const LogoutButton = styled.button`
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  color: #333;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #e2e6ea;
    border-color: #dae0e5;
  }
`;
