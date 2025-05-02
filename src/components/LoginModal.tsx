import React from "react";
import styled from "styled-components";
import { brandColors } from "../styles/GlobalStyle";

// 카카오 인증 관련 상수
// 환경 변수에서 값을 가져오거나 기본값 사용
const KAKAO_CLIENT_ID = process.env.REACT_APP_KAKAO_CLIENT_ID;
const KAKAO_REDIRECT_URI =
  process.env.REACT_APP_KAKAO_REDIRECT_URI ||
  "http://localhost:3000/auth/kakao/callback";
const KAKAO_AUTH_URL = "https://kauth.kakao.com/oauth/authorize";

// 모달 배경
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

// 모달 컨테이너
const ModalContainer = styled.div`
  background-color: white;
  width: 100%;
  max-width: 440px;
  border-radius: 16px;
  padding: 40px 32px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  position: relative;
  text-align: center;
`;

// 닫기 버튼
const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #333;
`;

// 로고
const Logo = styled.div`
  font-size: 36px;
  font-weight: 800;
  margin-bottom: 24px;
  color: ${brandColors.primary};
  text-align: center;
`;

// 환영 메시지
const WelcomeMessage = styled.h1`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 28px;
  color: #222;
  text-align: center;
`;

// 설명 텍스트
const Description = styled.p`
  font-size: 16px;
  line-height: 1.5;
  margin-bottom: 8px;
  color: #666;
  text-align: center;
`;

// 소셜 로그인 버튼 공통 스타일
const SocialButton = styled.button`
  width: 100%;
  padding: 14px 0;
  border-radius: 30px;
  border: none;
  margin-top: 16px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

// 구글 로그인 버튼
const GoogleButton = styled(SocialButton)`
  background-color: white;
  color: #333;
  border: 1px solid #ddd;
  &:hover {
    background-color: #f8f8f8;
  }
`;

// 깃허브 로그인 버튼
const GithubButton = styled(SocialButton)`
  background-color: #24292e;
  color: white;
  &:hover {
    background-color: #1b1f23;
  }
`;

// 카카오 로그인 버튼
const KakaoButton = styled(SocialButton)`
  background-color: #fee500;
  color: #000000;
  &:hover {
    background-color: #fada0a;
  }
`;

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  // 카카오 로그인 처리 함수
  const handleKakaoLogin = () => {
    // 로그인 프로세스 시작 전 모달 닫기
    onClose();

    // 간단한 URL 구성 (필수 파라미터만 포함)
    const redirectUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${encodeURIComponent(
      KAKAO_REDIRECT_URI
    )}&response_type=code`;

    // 현재 창에서 리다이렉트 (페이지 교체)
    window.location.href = redirectUrl;
  };

  // 구글 로그인 처리 함수
  const handleGoogleLogin = () => {
    alert("구글 로그인은 아직 구현되지 않았습니다.");
  };

  // 깃허브 로그인 처리 함수
  const handleGithubLogin = () => {
    alert("깃허브 로그인은 아직 구현되지 않았습니다.");
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>×</CloseButton>
        <Logo>Eum</Logo>
        <WelcomeMessage>Eum에 오신 것을 환영합니다!</WelcomeMessage>
        <Description>
          스터디와 사이드 프로젝트를 찾는 가장 쉬운 방법!
        </Description>
        <Description>Eum에서 함께 할 팀원들을 찾으세요</Description>

        <GoogleButton onClick={handleGoogleLogin}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="#4285F4"
          >
            <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z" />
          </svg>
          Google 로그인
        </GoogleButton>

        <GithubButton onClick={handleGithubLogin}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="white"
          >
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
          Github 로그인
        </GithubButton>

        <KakaoButton onClick={handleKakaoLogin}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="#000000"
          >
            <path d="M12 3c-5.088 0-9.225 3.528-9.225 7.875 0 2.542 1.291 4.792 3.295 6.26-.479 1.741-1.733 3.321-1.733 3.321s-.124.088-.231.178c-.19.153-.132.397.103.461.223.061 1.126.327 3.159-.599.892.207 1.726.384 2.632.384 5.088 0 9.225-3.528 9.225-7.875S17.088 3 12 3z" />
          </svg>
          Kakao 로그인
        </KakaoButton>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default LoginModal;
