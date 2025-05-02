import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { brandColors } from "../styles/GlobalStyle";
import LoginModal from "./LoginModal";

const HeaderContainer = styled.header`
  width: 100%;
  height: 64px;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  background-color: white;
  z-index: 100;
`;

const HeaderContent = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: ${brandColors.primary};
  font-family: "CookieRun-Regular", sans-serif;
`;

const Navigation = styled.nav`
  display: flex;
  gap: 32px;
  align-items: center;
`;

const NavItem = styled.span`
  font-size: 16px;
  color: #333;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    color: ${brandColors.secondary};
  }
`;

// 프로필 아이콘
const ProfileIcon = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: 2px solid ${brandColors.primary};
  position: relative;
`;

// 사용자 메뉴 드롭다운
const UserMenu = styled.div`
  position: absolute;
  top: 45px;
  right: 0;
  width: 180px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 8px 0;
  z-index: 1000;
`;

const MenuItem = styled.div`
  padding: 10px 16px;
  font-size: 14px;
  color: #333;
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const Header: React.FC = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  // 로그인 상태 확인
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsLoggedIn(!!token);
  }, []);

  const handleLoginClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLoginModalOpen(true);
  };

  const handleProfileClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMyPageClick = () => {
    setIsMenuOpen(false);
    navigate("/mypage");
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setIsLoggedIn(false);
    setIsMenuOpen(false);
    navigate("/");
  };

  return (
    <>
      <HeaderContainer>
        <HeaderContent>
          <Link to="/">
            <Logo>Eum</Logo>
          </Link>
          <Navigation>
            <Link to="/projects">
              <NavItem>프로젝트</NavItem>
            </Link>
            <Link to="/teams">
              <NavItem>팀원 모집</NavItem>
            </Link>
            <Link to="/community">
              <NavItem>커뮤니티</NavItem>
            </Link>

            {isLoggedIn ? (
              <ProfileIcon onClick={handleProfileClick}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill={brandColors.primary}
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                </svg>
                {isMenuOpen && (
                  <UserMenu>
                    <MenuItem onClick={handleMyPageClick}>마이페이지</MenuItem>
                    <MenuItem onClick={handleLogout}>로그아웃</MenuItem>
                  </UserMenu>
                )}
              </ProfileIcon>
            ) : (
              <NavItem onClick={handleLoginClick}>로그인</NavItem>
            )}
          </Navigation>
        </HeaderContent>
      </HeaderContainer>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </>
  );
};

export default Header;
