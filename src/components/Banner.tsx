import React, { useState, useEffect } from "react";
import styled, { keyframes, css } from "styled-components";
import { brandColors } from "../styles/GlobalStyle";

const BannerWrapper = styled.div`
  width: 100%;
  padding: 0 24px;
  margin-top: 64px;
  display: flex;
  justify-content: center;
`;

const BannerContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  min-height: 220px;
  background-color: ${brandColors.primaryLight};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
  border-radius: 16px;
  position: relative;
  overflow: hidden;
`;

const BannerContent = styled.div`
  width: 100%;
  max-width: 1100px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 40px;
    text-align: center;
  }
`;

const TextArea = styled.div`
  flex: 1;
  padding-right: 40px;

  @media (max-width: 768px) {
    padding-right: 0;
  }
`;

const NoticeTag = styled.div`
  background-color: ${brandColors.primary};
  color: white;
  display: inline-block;
  padding: 6px 16px;
  border-radius: 30px;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 16px;
`;

const Title = styled.h1`
  font-size: 32px;
  line-height: 1.3;
  margin-bottom: 16px;
  font-weight: 700;
  color: #333;
  font-family: "CookieRun-Regular", sans-serif;
`;

const Description = styled.p`
  font-size: 16px;
  margin-bottom: 0;
  line-height: 1.6;
  color: #555;
  font-family: "CookieRun-Regular", sans-serif;
`;

const ImageArea = styled.div`
  flex: 0 0 280px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// ChatImage 컴포넌트 대신 실제 이미지를 표시하는 컴포넌트로 변경
const BannerImage = styled.img`
  width: 280px;
  height: 180px;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`;

const PageIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  position: absolute;
  bottom: 20px;
  right: 20px;
  background-color: white;
  padding: 4px 12px;
  border-radius: 20px;
  z-index: 10;
`;

const NavButton = styled.button`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;

  &:hover {
    color: #333;
  }
`;

// 슬라이드 애니메이션 정의
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(40px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(-40px);
  }
`;

// 애니메이션이 적용된 슬라이드 컴포넌트
const BannerSlide = styled.div<{
  active: boolean;
  direction: "next" | "prev" | null;
}>`
  display: ${(props) => (props.active ? "block" : "none")};
  width: 100%;

  ${(props) =>
    props.active &&
    props.direction === "next" &&
    css`
      animation: ${fadeIn} 0.5s ease-out forwards;
    `}

  ${(props) =>
    props.active &&
    props.direction === "prev" &&
    css`
      animation: ${fadeIn} 0.5s ease-out forwards;
    `}
`;

// 배너 데이터
const bannerData = [
  {
    tag: "NOTICE",
    title: "나에게 딱 맞는 팀원을 찾고 있나요?",
    description: "프론트엔드부터 기획자까지, Eum에서 만나요 👩‍💻🤝👨‍🎨",
    image: "/images/banner1.jpg",
  },
  {
    tag: "NOTICE",
    title: "협업이 필요한 순간, Eum",
    description: "디자이너, 개발자, 마케터가 함께 만드는 프로젝트의 시작 🚀",
    image: "/images/banner2.jpg",
  },
  {
    tag: "NEW",
    title: "AI가 분석하는 팀 컬처핏 매칭",
    description: "나와 가치관이 맞는 팀원을 AI 알고리즘으로 찾아보세요 🧠✨",
    image: "/images/banner3.jpg",
  },
];

const Banner: React.FC = () => {
  const [currentBanner, setCurrentBanner] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev" | null>(null);

  // 자동 슬라이드 기능
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection("next");
      setCurrentBanner((prev) => (prev + 1) % bannerData.length);
    }, 5000); // 5초마다 슬라이드 변경

    return () => clearInterval(interval);
  }, []);

  // 이전 배너로 이동
  const handlePrevBanner = () => {
    setDirection("prev");
    setCurrentBanner((prev) => (prev === 0 ? bannerData.length - 1 : prev - 1));
  };

  // 다음 배너로 이동
  const handleNextBanner = () => {
    setDirection("next");
    setCurrentBanner((prev) => (prev + 1) % bannerData.length);
  };

  return (
    <BannerWrapper>
      <BannerContainer>
        {bannerData.map((banner, index) => (
          <BannerSlide
            key={index}
            active={index === currentBanner}
            direction={direction}
          >
            <BannerContent>
              <TextArea>
                <NoticeTag>{banner.tag}</NoticeTag>
                <Title>{banner.title}</Title>
                <Description>{banner.description}</Description>
              </TextArea>
              <ImageArea>
                <BannerImage src={banner.image} alt={banner.title} />
              </ImageArea>
            </BannerContent>
          </BannerSlide>
        ))}
        <PageIndicator>
          <NavButton onClick={handlePrevBanner}>&lt;</NavButton>
          <div>{currentBanner + 1}</div>
          <div>/</div>
          <div>{bannerData.length}</div>
          <NavButton onClick={handleNextBanner}>&gt;</NavButton>
        </PageIndicator>
      </BannerContainer>
    </BannerWrapper>
  );
};

export default Banner;
