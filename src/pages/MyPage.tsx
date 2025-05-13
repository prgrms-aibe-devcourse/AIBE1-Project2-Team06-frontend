import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";
import { brandColors } from "../styles/GlobalStyle";
import { fetchAPI } from "../config/apiConfig";
import { showAlert } from "../utils/sweetAlert";

// 페이지 컨테이너
const PageContainer = styled.div`
  max-width: 1200px;
  margin: 32px auto 40px;
  padding: 0 20px;
  display: grid;
  grid-template-columns: 400px 1fr;
  gap: 32px;
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

// 프로젝트/스터디 섹션
const ActivitySection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
`;

const ActivityColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
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
  display: inline-block;
  margin-right: 12px;

  &:hover {
    text-decoration: underline;
  }
`;

const LinkContainer = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
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

// 사용자 프로필 데이터 타입 정의
interface UserProfile {
  nickname: string;
  career: string;
  shortDescription: string;
  profileImageUrl: string | null;
  position: string;
  techStacks: string[];
}

// 포트폴리오 아이템 타입 정의 (프로젝트 또는 스터디)
interface PortfolioItem {
  id: number;
  postId: number;
  postTitle: string;
  postLink: string;
  averageScore: number;
  recruitType: "PROJECT" | "STUDY";
  createAt: string;
}

// 피어리뷰 데이터 타입 정의
interface PeerReview {
  id: number;
  reviewerPublicId: string;
  reviewerNickname: string;
  collaborationScore: number;
  technicalScore: number;
  workAgainScore: number;
  averageScore: number;
  reviewComment: string;
  reviewDate: string;
}

const MyPage: React.FC = () => {
  const [selectedReview, setSelectedReview] = useState<{
    type: "project" | "study";
    id: string;
    title: string;
  } | null>(null);

  const [userData, setUserData] = useState<UserProfile | null>(null);
  const [projects, setProjects] = useState<PortfolioItem[]>([]);
  const [studies, setStudies] = useState<PortfolioItem[]>([]);
  const [reviews, setReviews] = useState<PeerReview[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [portfolioLoading, setPortfolioLoading] = useState<boolean>(true);
  const [reviewsLoading, setReviewsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [portfolioError, setPortfolioError] = useState<string | null>(null);
  const [reviewsError, setReviewsError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);

        const response = await fetchAPI("members/profile/me", {
          method: "GET",
        });

        if (!response.ok) {
          if (response.status === 401) {
            showAlert("로그인이 필요합니다.");
            navigate("/");
            return;
          }
          throw new Error("프로필 정보를 불러오는데 실패했습니다.");
        }

        const data = await response.json();
        console.log("API 응답 데이터:", data);

        // 응답 값이 비어있거나 "UNDEFINED" 문자열일 경우 처리
        const formatValue = (value: string | null | undefined): string => {
          if (
            !value ||
            value === "" ||
            value === "UNDEFINED" ||
            value === "undefined"
          ) {
            return "없음";
          }
          return value;
        };

        // 응답 데이터 유효성 검사 및 기본값 설정
        const safeData = {
          nickname: formatValue(data.nickname),
          career: formatValue(data.career),
          shortDescription: formatValue(data.shortDescription),
          profileImageUrl: data.profileImageUrl,
          position: formatValue(data.position),
          techStacks:
            Array.isArray(data.techStacks) && data.techStacks.length > 0
              ? data.techStacks
              : [],
        };

        console.log("가공된 데이터:", safeData);
        setUserData(safeData);
      } catch (error) {
        console.error("프로필 로딩 오류:", error);
        setError("프로필 정보를 불러오는데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    const fetchPortfolios = async () => {
      try {
        setPortfolioLoading(true);

        // 프로젝트 데이터 가져오기
        const projectResponse = await fetchAPI(
          "portfolios/my?recruitType=PROJECT",
          {
            method: "GET",
          }
        );

        if (!projectResponse.ok) {
          throw new Error("프로젝트 정보를 불러오는데 실패했습니다.");
        }

        const projectData = await projectResponse.json();
        setProjects(projectData);

        // 스터디 데이터 가져오기
        const studyResponse = await fetchAPI(
          "portfolios/my?recruitType=STUDY",
          {
            method: "GET",
          }
        );

        if (!studyResponse.ok) {
          throw new Error("스터디 정보를 불러오는데 실패했습니다.");
        }

        const studyData = await studyResponse.json();
        setStudies(studyData);
      } catch (error) {
        console.error("포트폴리오 로딩 오류:", error);
        setPortfolioError("포트폴리오 정보를 불러오는데 실패했습니다.");
      } finally {
        setPortfolioLoading(false);
      }
    };

    fetchUserProfile();
    fetchPortfolios();
  }, [navigate]);

  const handleReviewClick = async (
    type: "project" | "study",
    id: string,
    title: string
  ) => {
    try {
      setReviewsLoading(true);
      setReviews([]);
      setReviewsError(null);

      const response = await fetchAPI(`portfolios/${id}/reviews`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("피어리뷰 정보를 불러오는데 실패했습니다.");
      }

      const reviewsData = await response.json();
      setReviews(reviewsData);
      setSelectedReview({ type, id, title });
    } catch (error) {
      console.error("피어리뷰 로딩 오류:", error);
      setReviewsError("피어리뷰 정보를 불러오는데 실패했습니다.");
    } finally {
      setReviewsLoading(false);
    }
  };

  const handleCloseModal = () => {
    setSelectedReview(null);
  };

  if (loading) {
    return <div>프로필을 불러오는 중...</div>;
  }

  if (error || !userData) {
    return <div>프로필을 불러오는데 문제가 발생했습니다: {error}</div>;
  }

  return (
    <PageContainer>
      <div>
        <ProfileSection>
          <ProfileImage>
            {userData?.profileImageUrl ? (
              <img
                src={userData.profileImageUrl}
                alt="프로필 이미지"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <svg width="60" height="60" viewBox="0 0 24 24" fill="#FFE500">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
              </svg>
            )}
            <Badge>K</Badge>
          </ProfileImage>
          <WelcomeMessage>{userData?.nickname}님 환영해요.</WelcomeMessage>
        </ProfileSection>

        <InfoSection>
          <InfoRow>
            <InfoLabel>닉네임</InfoLabel>
            <InfoValue>
              {userData?.nickname !== "UNDEFINED" ? userData?.nickname : "없음"}
            </InfoValue>
          </InfoRow>

          <InfoRow>
            <InfoLabel>직무</InfoLabel>
            <InfoValue>
              {userData?.position !== "UNDEFINED" ? userData?.position : "없음"}
            </InfoValue>
          </InfoRow>

          <InfoRow>
            <InfoLabel>경력</InfoLabel>
            <InfoValue>
              {userData?.career !== "UNDEFINED" ? userData?.career : "없음"}
            </InfoValue>
          </InfoRow>

          <InfoRow>
            <InfoLabel>자기소개</InfoLabel>
            <InfoValue>
              {userData?.shortDescription !== "UNDEFINED"
                ? userData?.shortDescription
                : "없음"}
            </InfoValue>
          </InfoRow>

          <InfoRow>
            <InfoLabel>관심분야</InfoLabel>
            <TagsContainer>
              {userData?.techStacks && userData.techStacks.length > 0 ? (
                userData.techStacks.map((tech, index) => (
                  <Tag key={index}>{tech !== "UNDEFINED" ? tech : "없음"}</Tag>
                ))
              ) : (
                <InfoValue>없음</InfoValue>
              )}
            </TagsContainer>
          </InfoRow>
        </InfoSection>
      </div>

      <ActivitySection>
        <ActivityColumn>
          <SectionTitle>참여한 프로젝트</SectionTitle>
          {portfolioLoading ? (
            <div>프로젝트 정보를 불러오는 중...</div>
          ) : portfolioError ? (
            <div>{portfolioError}</div>
          ) : projects.length === 0 ? (
            <div>참여한 프로젝트가 없습니다.</div>
          ) : (
            <ActivityList>
              {projects.map((project) => (
                <ActivityCard key={project.id}>
                  <ActivityTitle>{project.postTitle}</ActivityTitle>
                  <LinkContainer>
                    <ActivityLink
                      href={project.postLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      프로젝트 링크
                    </ActivityLink>
                    <ActivityLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handleReviewClick(
                          "project",
                          project.id.toString(),
                          project.postTitle
                        );
                      }}
                    >
                      피어리뷰 상세보기
                    </ActivityLink>
                  </LinkContainer>
                  <ReviewScore>
                    피어리뷰 평균 점수:{" "}
                    <ScoreValue>{project.averageScore.toFixed(1)}/5</ScoreValue>
                  </ReviewScore>
                </ActivityCard>
              ))}
            </ActivityList>
          )}
        </ActivityColumn>

        <ActivityColumn>
          <SectionTitle>참여한 스터디</SectionTitle>
          {portfolioLoading ? (
            <div>스터디 정보를 불러오는 중...</div>
          ) : portfolioError ? (
            <div>{portfolioError}</div>
          ) : studies.length === 0 ? (
            <div>참여한 스터디가 없습니다.</div>
          ) : (
            <ActivityList>
              {studies.map((study) => (
                <ActivityCard key={study.id}>
                  <ActivityTitle>{study.postTitle}</ActivityTitle>
                  <LinkContainer>
                    <ActivityLink
                      href={study.postLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      스터디 링크
                    </ActivityLink>
                    <ActivityLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handleReviewClick(
                          "study",
                          study.id.toString(),
                          study.postTitle
                        );
                      }}
                    >
                      피어리뷰 상세보기
                    </ActivityLink>
                  </LinkContainer>
                  <ReviewScore>
                    피어리뷰 평균 점수:{" "}
                    <ScoreValue>{study.averageScore.toFixed(1)}/5</ScoreValue>
                  </ReviewScore>
                </ActivityCard>
              ))}
            </ActivityList>
          )}
        </ActivityColumn>
      </ActivitySection>

      {selectedReview && (
        <ModalOverlay onClick={handleCloseModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={handleCloseModal}>&times;</CloseButton>
            <ModalTitle>{selectedReview.title} - 피어리뷰</ModalTitle>
            <ReviewList>
              {reviewsLoading ? (
                <div>피어리뷰를 불러오는 중...</div>
              ) : reviewsError ? (
                <div>{reviewsError}</div>
              ) : reviews.length === 0 ? (
                <div>피어리뷰가 없습니다.</div>
              ) : (
                reviews.map((review) => (
                  <ReviewCard key={review.id}>
                    <ReviewerInfo>
                      <ReviewerName>{review.reviewerNickname}</ReviewerName>
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
                        <ScoreValue>
                          {review.averageScore.toFixed(1)}/5
                        </ScoreValue>
                      </ScoreItem>
                      <ScoreItem>
                        <ScoreLabel>다시 함께하고 싶은지</ScoreLabel>
                        <ScoreValue>{review.workAgainScore}/5</ScoreValue>
                      </ScoreItem>
                    </ScoreGrid>
                    <CommentSection>
                      <CommentLabel>리뷰 코멘트</CommentLabel>
                      <CommentText>{review.reviewComment}</CommentText>
                    </CommentSection>
                  </ReviewCard>
                ))
              )}
            </ReviewList>
          </ModalContent>
        </ModalOverlay>
      )}
    </PageContainer>
  );
};

export default MyPage;
