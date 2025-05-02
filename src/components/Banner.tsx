import React, { useState, useEffect } from "react";
import styled from "styled-components";
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

const ChatImage = styled.div`
  width: 280px;
  height: 180px;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23ffffff"><path d="M20,2H4C2.9,2,2,2.9,2,4v18l4-4h14c1.1,0,2-0.9,2-2V4C22,2.9,21.1,2,20,2z"/></svg>');
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  opacity: 0.8;
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

// 새로 추가: 자동 슬라이드를 위한 애니메이션 스타일
const BannerSlide = styled.div<{ active: boolean }>`
  display: ${(props) => (props.active ? "block" : "none")};
  width: 100%;
`;

// 배너 데이터
const bannerData = [
  {
    tag: "NOTICE",
    title: "나에게 딱 맞는 팀원을 찾고 있나요?",
    description: "프론트엔드부터 기획자까지, Eum에서 만나요 👩‍💻🤝👨‍🎨",
  },
  {
    tag: "NOTICE",
    title: "협업이 필요한 순간, Eum",
    description: "디자이너, 개발자, 마케터가 함께 만드는 프로젝트의 시작 🚀",
  },
  {
    tag: "NOTICE",
    title: "IT 행사 정보도 Eum에서!",
    description: "공모전, 컨퍼런스, 해커톤, 부트캠프까지 한번에 🌱",
  },
];

const Banner: React.FC = () => {
  const [currentBanner, setCurrentBanner] = useState(0);

  // 자동 슬라이드 기능
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % bannerData.length);
    }, 5000); // 5초마다 슬라이드 변경

    return () => clearInterval(interval);
  }, []);

  // 이전 배너로 이동
  const handlePrevBanner = () => {
    setCurrentBanner((prev) => (prev === 0 ? bannerData.length - 1 : prev - 1));
  };

  // 다음 배너로 이동
  const handleNextBanner = () => {
    setCurrentBanner((prev) => (prev + 1) % bannerData.length);
  };

  return (
    <BannerWrapper>
      <BannerContainer>
        {bannerData.map((banner, index) => (
          <BannerSlide key={index} active={index === currentBanner}>
            <BannerContent>
              <TextArea>
                <NoticeTag>{banner.tag}</NoticeTag>
                <Title>{banner.title}</Title>
                <Description>{banner.description}</Description>
              </TextArea>
              <ImageArea>
                <ChatImage />
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
