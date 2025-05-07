import React, { useState } from "react";
import styled from "styled-components";
import { brandColors } from "../styles/GlobalStyle";

// 페이지 컨테이너
const PageContainer = styled.div`
  max-width: 440px;
  margin: 32px auto 40px;
  padding: 0 20px;
`;

// 프로필 섹션
const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 32px;
`;

// 프로필 이미지
const ProfileImage = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  border: 2px solid ${brandColors.primary};
  position: relative;
  overflow: hidden;
`;

// 배지 아이콘 (카카오 인증 표시)
const Badge = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${brandColors.primary};
  position: absolute;
  bottom: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 12px;
`;

// 환영 메시지
const WelcomeMessage = styled.h1`
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 24px;
  text-align: center;
`;

// 정보 섹션
const InfoSection = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

// 정보 행
const InfoRow = styled.div`
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
`;

// 정보 라벨
const InfoLabel = styled.div`
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
`;

// 정보 값
const InfoValue = styled.div`
  font-size: 16px;
  color: #333;
  font-weight: 500;
`;

// 태그 컨테이너
const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
`;

// 태그
const Tag = styled.span`
  display: inline-flex;
  align-items: center;
  background-color: ${brandColors.primaryLight};
  color: ${brandColors.primaryText};
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 14px;
`;

// 수정 버튼
const EditButton = styled.button`
  width: 100%;
  padding: 14px;
  background-color: ${brandColors.primary};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 24px;

  &:hover {
    background-color: ${brandColors.primaryDark};
  }
`;

// 프로젝트/스터디 섹션
const ActivitySection = styled.div`
  margin-top: 32px;
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 24px;
  position: relative;
  padding-left: 16px;
  font-family: "CookieRun-Regular", sans-serif;

  &:before {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 4px;
    height: 20px;
    background-color: ${brandColors.primary};
    border-radius: 2px;
  }
`;

const ActivityList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ActivityCard = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const ActivityTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 12px;
  color: #333;
`;

const ActivityLink = styled.a`
  color: ${brandColors.primary};
  text-decoration: none;
  font-size: 14px;
  display: block;
  margin-bottom: 12px;

  &:hover {
    text-decoration: underline;
  }
`;

const ReviewScore = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #666;
`;

const ScoreValue = styled.span`
  color: ${brandColors.primary};
  font-weight: 600;
`;

// 모달 스타일 컴포넌트
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 24px;
  width: 90%;
  max-width: 400px;
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
`;

const ModalTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #333;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
  padding: 4px;
  line-height: 1;

  &:hover {
    color: #333;
  }
`;

const ReviewList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ReviewCard = styled.div`
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 16px;
`;

const ReviewerInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
`;

const ReviewerName = styled.span`
  font-weight: 600;
  color: #333;
`;

const ScoreGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-bottom: 12px;
`;

const ScoreItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ScoreLabel = styled.span`
  font-size: 12px;
  color: #666;
`;

const CommentSection = styled.div`
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #eee;
`;

const CommentLabel = styled.div`
  font-size: 12px;
  color: #666;
  margin-bottom: 4px;
`;

const CommentText = styled.p`
  font-size: 14px;
  color: #333;
  line-height: 1.5;
`;

// 피어리뷰 데이터 타입 정의
interface PeerReview {
  reviewer: string;
  collaborationScore: number;
  technicalScore: number;
  wantToWorkAgain: number;
  averageScore: number;
  comment: string;
}

interface PeerReviewData {
  [key: string]: PeerReview[];
}

// 가상의 사용자 데이터 (실제로는 API에서 가져옴)
const userData = {
  email: "won@example.com",
  nickname: "won",
  position: "백엔드",
  level: "1년",
  introduction: "안녕하세요. 1년차 백엔드 개발자 won입니다.",
  interests: ["Spring", "Java", "MySQL", "Docker"],
};

// 가상의 활동 데이터 (실제로는 API에서 가져옴)
const activityData = {
  projects: [
    {
      id: "1",
      title: "딥톡 SNS 프로젝트",
      link: "/project/1",
      reviewScore: 4.5,
    },
    {
      id: "2",
      title: "포트폴리오 웹사이트",
      link: "/project/2",
      reviewScore: 4.8,
    },
  ],
  studies: [
    {
      id: "1",
      title: "React 스터디",
      link: "/study/1",
      reviewScore: 4.2,
    },
    {
      id: "2",
      title: "TypeScript 마스터",
      link: "/study/2",
      reviewScore: 4.7,
    },
  ],
};

// 가상의 피어리뷰 데이터 (실제로는 API에서 가져옴)
const peerReviewData: PeerReviewData = {
  "1": [
    {
      reviewer: "김개발",
      collaborationScore: 4.5,
      technicalScore: 4.8,
      wantToWorkAgain: 4.7,
      averageScore: 4.65,
      comment:
        "매우 적극적이고 책임감 있게 프로젝트에 참여했습니다. 기술적으로도 많은 기여를 해주셨습니다.",
    },
    {
      reviewer: "이디자인",
      collaborationScore: 4.2,
      technicalScore: 4.0,
      wantToWorkAgain: 4.3,
      averageScore: 4.1,
      comment:
        "팀원들과의 소통이 원활했고, 적극적으로 의견을 제시해주셨습니다.",
    },
  ],
  "2": [
    {
      reviewer: "박프론트",
      collaborationScore: 4.7,
      technicalScore: 4.9,
      wantToWorkAgain: 4.8,
      averageScore: 4.8,
      comment: "기술적 역량이 뛰어나고, 팀원들을 잘 이끌어주셨습니다.",
    },
  ],
};

const MyPage: React.FC = () => {
  const [selectedReview, setSelectedReview] = useState<{
    type: "project" | "study";
    id: string;
    title: string;
  } | null>(null);

  const handleEditClick = () => {
    // 설정 페이지로 이동
    window.location.href = "/settings";
  };

  const handleReviewClick = (
    type: "project" | "study",
    id: string,
    title: string
  ) => {
    setSelectedReview({ type, id, title });
  };

  const handleCloseModal = () => {
    setSelectedReview(null);
  };

  return (
    <PageContainer>
      <ProfileSection>
        <ProfileImage>
          <svg width="60" height="60" viewBox="0 0 24 24" fill="#FFE500">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
          </svg>
          <Badge>K</Badge>
        </ProfileImage>
        <WelcomeMessage>{userData.nickname}님 환영해요.</WelcomeMessage>
      </ProfileSection>

      <InfoSection>
        <InfoRow>
          <InfoLabel>이메일</InfoLabel>
          <InfoValue>{userData.email}</InfoValue>
        </InfoRow>

        <InfoRow>
          <InfoLabel>닉네임</InfoLabel>
          <InfoValue>{userData.nickname}</InfoValue>
        </InfoRow>

        <InfoRow>
          <InfoLabel>직무</InfoLabel>
          <InfoValue>{userData.position}</InfoValue>
        </InfoRow>

        <InfoRow>
          <InfoLabel>경력</InfoLabel>
          <InfoValue>{userData.level}</InfoValue>
        </InfoRow>

        <InfoRow>
          <InfoLabel>자기소개</InfoLabel>
          <InfoValue>{userData.introduction}</InfoValue>
        </InfoRow>

        <InfoRow>
          <InfoLabel>관심분야</InfoLabel>
          <TagsContainer>
            {userData.interests.map((interest, index) => (
              <Tag key={index}>{interest}</Tag>
            ))}
          </TagsContainer>
        </InfoRow>
      </InfoSection>

      <EditButton onClick={handleEditClick}>프로필 수정하기</EditButton>

      <ActivitySection>
        <SectionTitle>참여한 프로젝트</SectionTitle>
        <ActivityList>
          {activityData.projects.map((project) => (
            <ActivityCard key={project.id}>
              <ActivityTitle>{project.title}</ActivityTitle>
              <ActivityLink
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleReviewClick("project", project.id, project.title);
                }}
              >
                피어리뷰 상세보기
              </ActivityLink>
              <ReviewScore>
                피어리뷰 평균 점수:{" "}
                <ScoreValue>{project.reviewScore}/5</ScoreValue>
              </ReviewScore>
            </ActivityCard>
          ))}
        </ActivityList>

        <SectionTitle>참여한 스터디</SectionTitle>
        <ActivityList>
          {activityData.studies.map((study) => (
            <ActivityCard key={study.id}>
              <ActivityTitle>{study.title}</ActivityTitle>
              <ActivityLink
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleReviewClick("study", study.id, study.title);
                }}
              >
                피어리뷰 상세보기
              </ActivityLink>
              <ReviewScore>
                피어리뷰 평균 점수:{" "}
                <ScoreValue>{study.reviewScore}/5</ScoreValue>
              </ReviewScore>
            </ActivityCard>
          ))}
        </ActivityList>
      </ActivitySection>

      {selectedReview && (
        <ModalOverlay onClick={handleCloseModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={handleCloseModal}>&times;</CloseButton>
            <ModalTitle>{selectedReview.title} - 피어리뷰</ModalTitle>
            <ReviewList>
              {peerReviewData[selectedReview.id]?.map(
                (review: PeerReview, index: number) => (
                  <ReviewCard key={index}>
                    <ReviewerInfo>
                      <ReviewerName>{review.reviewer}</ReviewerName>
                    </ReviewerInfo>
                    <ScoreGrid>
                      <ScoreItem>
                        <ScoreLabel>협업 태도</ScoreLabel>
                        <ScoreValue>{review.collaborationScore}/5</ScoreValue>
                      </ScoreItem>
                      <ScoreItem>
                        <ScoreLabel>기술 기여도</ScoreLabel>
                        <ScoreValue>{review.technicalScore}/5</ScoreValue>
                      </ScoreItem>
                      <ScoreItem>
                        <ScoreLabel>평균 점수</ScoreLabel>
                        <ScoreValue>{review.averageScore}/5</ScoreValue>
                      </ScoreItem>
                      <ScoreItem>
                        <ScoreLabel>다시 함께하고 싶은지</ScoreLabel>
                        <ScoreValue>{review.wantToWorkAgain}/5</ScoreValue>
                      </ScoreItem>
                    </ScoreGrid>
                    <CommentSection>
                      <CommentLabel>리뷰 코멘트</CommentLabel>
                      <CommentText>{review.comment}</CommentText>
                    </CommentSection>
                  </ReviewCard>
                )
              )}
            </ReviewList>
          </ModalContent>
        </ModalOverlay>
      )}
    </PageContainer>
  );
};

export default MyPage;
