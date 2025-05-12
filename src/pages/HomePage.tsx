import React, { useEffect } from "react";
import styled from "styled-components";
import Banner from "../components/Banner";
import ProjectSection from "../components/ProjectSection";
import { brandColors } from "../styles/GlobalStyle";

const StyledHomePage = styled.div`
  width: 100%;
  min-height: 100vh;
`;

const HomePage: React.FC = () => {
  useEffect(() => {
    // 로그인 상태 확인
    const token = localStorage.getItem("token");
    if (token) {
      console.log("홈페이지: 로그인 상태 확인 - 로그인됨");
    } else {
      console.log("홈페이지: 로그인 상태 확인 - 로그인되지 않음");
    }
  }, []);

  return (
    <StyledHomePage>
      <Banner />
      <ProjectSection />
    </StyledHomePage>
  );
};

export default HomePage;
