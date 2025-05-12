import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { brandColors } from "../../styles/GlobalStyle";
import { fetchAPI } from "../../config/apiConfig";

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

const ErrorDetails = styled.div`
  margin-top: 16px;
  padding: 16px;
  background-color: #f8f8f8;
  border-radius: 8px;
  text-align: left;
  max-width: 100%;
  overflow-x: auto;
  font-family: monospace;
  font-size: 12px;
  color: #555;
`;

const KakaoCallback = () => {
  const [status, setStatus] = useState<string>("인증 코드 확인 중...");
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [errorDetails, setErrorDetails] = useState<string>("");
  const location = useLocation();
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/", { replace: true });
  };

  useEffect(() => {
    const processKakaoLogin = async () => {
      try {
        // 현재 URL 및 환경 정보 로깅
        console.log("현재 콜백 URL:", window.location.href);
        console.log("환경 변수:", {
          REACT_APP_API_URL: process.env.REACT_APP_API_URL,
          REACT_APP_KAKAO_REDIRECT_URI:
            process.env.REACT_APP_KAKAO_REDIRECT_URI,
          NODE_ENV: process.env.NODE_ENV,
        });

        // 배포 환경 여부 확인
        const isNetlify =
          navigator.userAgent.includes("Netlify") ||
          document.location.hostname.includes("netlify.app") ||
          document.location.hostname === "aibe-eum.store";

        console.log("배포 환경 감지:", isNetlify);

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

        console.log("백엔드 요청 데이터:", loginRequestDto);

        const response = await fetchAPI("login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginRequestDto),
        });

        if (!response.ok) {
          const errorText = await response
            .text()
            .catch(() => "응답 텍스트를 가져올 수 없음");
          console.error("로그인 API 오류:", {
            status: response.status,
            statusText: response.statusText,
            errorText,
          });

          throw new Error(`서버 응답 오류: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        console.log("서버 응답 데이터:", data); // 디버깅용 로그

        // 로그인 성공 처리
        if (data.token) {
          localStorage.setItem("token", data.token);

          // 커스텀 이벤트 발생 - 로그인 성공 알림
          const loginEvent = new Event("login-success");
          window.dispatchEvent(loginEvent);

          setStatus("로그인 성공! 리디렉션 중...");
          setTimeout(() => {
            // 홈페이지로 이동할 때도 이벤트 발생
            navigate("/", { replace: true });
            // 약간의 지연 후 다시 한번 이벤트 발생 (안전장치)
            setTimeout(() => {
              window.dispatchEvent(new Event("login-success"));
            }, 300);
          }, 1500);
        } else {
          setIsError(true);
          setErrorMessage("로그인 처리 중 오류가 발생했습니다. (토큰 없음)");
          setStatus("로그인 처리 중 오류가 발생했습니다.");
        }
      } catch (error) {
        console.error("카카오 로그인 오류:", error);
        setIsError(true);

        const errorMsg =
          error instanceof Error
            ? error.message
            : "알 수 없는 오류가 발생했습니다.";
        setErrorMessage(errorMsg);

        // 상세 오류 정보 설정
        setErrorDetails(`
현재 URL: ${window.location.href}
API URL: ${process.env.REACT_APP_API_URL || "(설정되지 않음)"}
리다이렉트 URI: ${process.env.REACT_APP_KAKAO_REDIRECT_URI || "(설정되지 않음)"}
오류 시간: ${new Date().toLocaleString()}
오류 메시지: ${errorMsg}
        `);

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
          {errorDetails && <ErrorDetails>{errorDetails}</ErrorDetails>}
          <Button onClick={goToHome}>홈으로 돌아가기</Button>
        </>
      )}
    </Container>
  );
};

export default KakaoCallback;
