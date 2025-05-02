import React, { useEffect } from "react";
import styled from "styled-components";
import Banner from "../components/Banner";
import ProjectSection from "../components/ProjectSection";

const StyledHomePage = styled.div`
  width: 100%;
  min-height: 100vh;
`;

const StatsSection = styled.section`
  width: 100%;
  padding: 60px 20px;
  background-color: #3498db;
  color: white;
  display: flex;
  justify-content: center;
`;

const StatsContent = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 40px;
    align-items: center;
  }
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 12px;
`;

const StatLabel = styled.div`
  font-size: 18px;
  opacity: 0.9;
`;

const HomePage: React.FC = () => {
  useEffect(() => {
    // 로그인 상태 확인
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      console.log("홈페이지: 로그인 상태 확인 - 로그인됨");
    } else {
      console.log("홈페이지: 로그인 상태 확인 - 로그인되지 않음");
    }
  }, []);

  return (
    <StyledHomePage>
      <Banner />

      <ProjectSection />

      <StatsSection>
        <StatsContent>
          <StatItem>
            <StatNumber>10,000+</StatNumber>
            <StatLabel>활성 유저</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber>5,000+</StatNumber>
            <StatLabel>완료된 프로젝트</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber>15,000+</StatNumber>
            <StatLabel>팀 매칭</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber>98%</StatNumber>
            <StatLabel>만족도</StatLabel>
          </StatItem>
        </StatsContent>
      </StatsSection>
    </StyledHomePage>
  );
};

export default HomePage;
