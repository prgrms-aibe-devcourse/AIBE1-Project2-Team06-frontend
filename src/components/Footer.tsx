import React from "react";
import styled from "styled-components";
import { brandColors } from "../styles/GlobalStyle";
import { Link } from "react-router-dom";

const FooterContainer = styled.footer`
  width: 100%;
  padding: 40px 0;
  background-color: #f8f9fa;
  display: flex;
  justify-content: center;
`;

const FooterContent = styled.div`
  width: 100%;
  max-width: 1200px;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const Logo = styled.div`
  font-size: 22px;
  font-weight: bold;
  color: ${brandColors.primary};
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 16px;
`;

const SocialIcon = styled.div`
  width: 32px;
  height: 32px;
  background-color: #ddd;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    background-color: ${brandColors.primary};
    color: white;
  }
`;

const MiddleSection = styled.div`
  display: flex;
  gap: 40px;
  margin-bottom: 20px;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ColumnTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
`;

const ColumnItem = styled(Link)`
  font-size: 14px;
  color: #555;
  text-decoration: none;

  &:hover {
    color: ${brandColors.secondary};
  }
`;

const BottomSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: #777;
  font-size: 14px;
  padding-top: 20px;
  border-top: 1px solid #eee;
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <TopSection>
          <Logo>Eum</Logo>
          <SocialLinks>
            <SocialIcon>F</SocialIcon>
            <SocialIcon>I</SocialIcon>
            <SocialIcon>T</SocialIcon>
            <SocialIcon>G</SocialIcon>
          </SocialLinks>
        </TopSection>

        <MiddleSection>
          <Column>
            <ColumnTitle>서비스</ColumnTitle>
            <ColumnItem to="/projects">프로젝트</ColumnItem>
            <ColumnItem to="/recruit">팀원 모집</ColumnItem>
            <ColumnItem to="/community">커뮤니티</ColumnItem>
          </Column>
          <Column>
            <ColumnTitle>정보</ColumnTitle>
            <ColumnItem to="/terms">이용약관</ColumnItem>
            <ColumnItem to="/privacy">개인정보처리방침</ColumnItem>
            <ColumnItem to="/support">고객센터</ColumnItem>
          </Column>
          <Column>
            <ColumnTitle>회사</ColumnTitle>
            <ColumnItem to="/about">Eum 소개</ColumnItem>
            <ColumnItem to="/jobs">채용</ColumnItem>
          </Column>
        </MiddleSection>

        <BottomSection>
          <div>© 2025 Eum. All rights reserved.</div>
          <div>서울특별시 강남구 테헤란로 123, 456호</div>
          <div>대표: Eum | 사업자등록번호: 123-45-67890</div>
        </BottomSection>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
