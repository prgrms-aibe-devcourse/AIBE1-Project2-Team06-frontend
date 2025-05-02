import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { brandColors } from "../../styles/GlobalStyle";

// 백엔드 요청 형식 간소화
interface LoginRequestDto {
  code: string;
  provider: string;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  text-align: center;
  padding: 0 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
`;

const Status = styled.p`
  font-size: 16px;
  color: #666;
  margin-bottom: 16px;
`;

const Spinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border-left-color: ${brandColors.primary};
  animation: spin 1s linear infinite;
  margin-bottom: 20px;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Message = styled.p`
  font-size: 14px;
  color: #888;
  margin-bottom: 24px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: ${brandColors.primary};
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${brandColors.primaryDark};
  }
`;

const KakaoCallback = () => {
  const [status, setStatus] = useState<string>("인증 코드 확인 중...");
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const location = useLocation();
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/", { replace: true });
  };

  useEffect(() => {
    const processKakaoLogin = async () => {
      try {
        // URL에서 인가 코드만 추출
        const params = new URLSearchParams(location.search);
        const code = params.get("code");

        if (!code) {
          setStatus("인증 코드를 찾을 수 없습니다.");
          setIsError(true);
          setErrorMessage("인증 과정에서 코드를 받지 못했습니다.");
          return;
        }

        setStatus("인증 코드로 로그인 처리 중...");

        // 백엔드 서버로 인가 코드와 provider만 전송
        const loginRequestDto: LoginRequestDto = {
          code: code,
          provider: "kakao",
        };

        const response = await fetch("/api/v1/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginRequestDto),
        });

        if (!response.ok) {
          throw new Error(`서버 응답 오류: ${response.status}`);
        }

        const data = await response.json();

        // 로그인 성공 처리
        if (data.accessToken) {
          localStorage.setItem("accessToken", data.accessToken);
          setStatus("로그인 성공! 리디렉션 중...");
          setTimeout(() => navigate("/", { replace: true }), 1500);
        } else {
          setIsError(true);
          setErrorMessage("로그인 처리 중 오류가 발생했습니다. (토큰 없음)");
          setStatus("로그인 처리 중 오류가 발생했습니다.");
        }
      } catch (error) {
        console.error("카카오 로그인 오류:", error);
        setIsError(true);
        setErrorMessage(
          error instanceof Error
            ? error.message
            : "알 수 없는 오류가 발생했습니다."
        );
        setStatus("로그인 처리 중 오류가 발생했습니다.");
      }
    };

    processKakaoLogin();
  }, [location, navigate]);

  return (
    <Container>
      {!isError ? (
        <>
          <Spinner />
          <Title>카카오 로그인 처리 중</Title>
          <Status>{status}</Status>
        </>
      ) : (
        <>
          <Title>로그인 오류</Title>
          <Status>{status}</Status>
          <Message>{errorMessage}</Message>
          <Button onClick={goToHome}>홈으로 돌아가기</Button>
        </>
      )}
    </Container>
  );
};

export default KakaoCallback;
