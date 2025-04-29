import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

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
  color: #3498db;
  font-family: "CookieRun-Regular", sans-serif;
`;

const Navigation = styled.nav`
  display: flex;
  gap: 32px;
`;

const NavItem = styled.span`
  font-size: 16px;
  color: #333;
  font-weight: 500;

  &:hover {
    color: #3498db;
  }
`;

const Header: React.FC = () => {
  return (
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
          <Link to="/login">
            <NavItem>로그인</NavItem>
          </Link>
        </Navigation>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;
