import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";

const CallbackContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f8f9fa;
`;

const LoadingText = styled.h2`
  font-size: 24px;
  color: #333;
  margin-bottom: 16px;
`;

const StatusText = styled.p`
  font-size: 16px;
  color: #666;
`;

const KakaoCallback: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [status, setStatus] = useState<string>("인증 코드 확인 중...");

  useEffect(() => {
    // URL에서 인증 코드 추출
    const getAuthCode = () => {
      const params = new URLSearchParams(location.search);
      return params.get("code");
    };

    const authCode = getAuthCode();

    if (!authCode) {
      setStatus("인증 코드를 찾을 수 없습니다.");
      setTimeout(() => navigate("/login"), 3000);
      return;
    }

    setStatus("인증 코드를 서버로 전송 중...");

    // 백엔드로 인증 코드 전송
    const sendAuthCodeToBackend = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/v1/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ code: authCode, provider: "kakao" }),
        });

        if (!response.ok) {
          throw new Error("서버 응답 오류");
        }

        const data = await response.json();
        setStatus("로그인 성공! 리디렉션 중...");

        // 여기서 필요에 따라 토큰 저장 등의 작업 수행
        localStorage.setItem("accessToken", data.accessToken);

        // 홈페이지로 리디렉션
        setTimeout(() => navigate("/"), 1500);
      } catch (error) {
        console.error("로그인 처리 오류:", error);
        setStatus("로그인 처리 중 오류가 발생했습니다.");
        setTimeout(() => navigate("/login"), 3000);
      }
    };

    sendAuthCodeToBackend();
  }, [location, navigate]);

  return (
    <CallbackContainer>
      <LoadingText>카카오 로그인 처리 중</LoadingText>
      <StatusText>{status}</StatusText>
    </CallbackContainer>
  );
};

export default KakaoCallback;
