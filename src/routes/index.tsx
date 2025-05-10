import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../pages/HomePage";
import KakaoCallback from "../components/OAuth/KakaoCallback";
import SettingPage from "../pages/SettingPage";
import ProjectDetailPage from "../pages/ProjectDetailPage";
import MyPage from "../pages/MyPage";
import RecruitFormPage from "../pages/RecruitFormPage";
import RecruitEditPage from "../pages/RecruitEditPage";
import ProfilePage from "../pages/ProfilePage";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/auth/kakao/callback" element={<KakaoCallback />} />
      <Route path="/settings" element={<SettingPage />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/project/:id" element={<ProjectDetailPage />} />
      <Route path="/profile/:publicId" element={<ProfilePage />} />
      {/* 추후 추가될 라우트들 */}
      <Route path="/projects" element={<div>프로젝트 페이지 (준비중)</div>} />
      <Route path="/teams" element={<Navigate to="/recruit" replace />} />
      <Route path="/recruit" element={<RecruitFormPage />} />
      <Route path="/recruits/edit/:id" element={<RecruitEditPage />} />
      <Route path="/community" element={<div>커뮤니티 페이지 (준비중)</div>} />
      <Route path="/register" element={<div>회원가입 페이지 (준비중)</div>} />
      <Route path="*" element={<div>404 페이지를 찾을 수 없습니다.</div>} />
    </Routes>
  );
};

export default AppRoutes;
