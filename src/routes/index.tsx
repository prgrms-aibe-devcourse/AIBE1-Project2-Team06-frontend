import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import KakaoCallback from "../pages/KakaoCallback";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/auth/kakao/callback" element={<KakaoCallback />} />
      {/* 추후 추가될 라우트들 */}
      <Route path="/projects" element={<div>프로젝트 페이지 (준비중)</div>} />
      <Route path="/teams" element={<div>팀원 모집 페이지 (준비중)</div>} />
      <Route path="/community" element={<div>커뮤니티 페이지 (준비중)</div>} />
      <Route path="/register" element={<div>회원가입 페이지 (준비중)</div>} />
      <Route path="*" element={<div>404 페이지를 찾을 수 없습니다.</div>} />
    </Routes>
  );
};

export default AppRoutes;
