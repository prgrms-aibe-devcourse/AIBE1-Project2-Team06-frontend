import React from "react";
import styled from "styled-components";

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
  background-color: #e8f4ff;
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
  background-color: #2196f3;
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

const Banner: React.FC = () => {
  return (
    <BannerWrapper>
      <BannerContainer>
        <BannerContent>
          <TextArea>
            <NoticeTag>NOTICE</NoticeTag>
            <Title>IT 행사 정보도 Eum에서!</Title>
            <Description>
              공모전, 컨퍼런스, 해커톤, 부트캠프까지 한번에 👋
            </Description>
          </TextArea>
          <ImageArea>
            <ChatImage />
          </ImageArea>
        </BannerContent>
        <PageIndicator>
          <NavButton>&lt;</NavButton>
          <div>3</div>
          <div>/</div>
          <div>3</div>
          <NavButton>&gt;</NavButton>
        </PageIndicator>
      </BannerContainer>
    </BannerWrapper>
  );
};

export default Banner;
