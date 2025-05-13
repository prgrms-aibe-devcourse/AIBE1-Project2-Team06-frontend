import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { brandColors } from "../styles/GlobalStyle";
import { fetchAPI } from "../config/apiConfig";

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

const EmptyMessage = styled.div`
  color: #666;
  font-size: 14px;
  padding: 20px;
  text-align: center;
  background-color: #f9f9f9;
  border-radius: 12px;
`;

// 모달 배경
const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

// 모달 컨테이너
const ModalContainer = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 24px;
  width: 90%;
  max-width: 600px;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
`;

// 모달 헤더
const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid #eee;
`;

// 모달 제목
const ModalTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #333;
`;

// 닫기 버튼
const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;

  &:hover {
    color: #333;
  }
`;

// 리뷰 카드
const ReviewCard = styled.div`
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;

  &:last-child {
    margin-bottom: 0;
  }
`;

// 리뷰어 정보
const ReviewerInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
`;

// 리뷰어 이름
const ReviewerName = styled.div`
  font-weight: 600;
  font-size: 16px;
  color: #333;
`;

// 리뷰 날짜
const ReviewDate = styled.div`
  font-size: 14px;
  color: #666;
`;

// 점수 컨테이너
const ScoreContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 12px;
`;

// 점수 항목
const ScoreItem = styled.div`
  display: flex;
  flex-direction: column;
`;

// 점수 라벨
const ScoreLabel = styled.div`
  font-size: 12px;
  color: #666;
  margin-bottom: 4px;
`;

// 점수
const Score = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: ${brandColors.primary};
`;

// 평균 점수
const AverageScore = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: ${brandColors.primary};
  margin-bottom: 12px;
`;

// 코멘트
const Comment = styled.div`
  font-size: 14px;
  line-height: 1.5;
  color: #333;
  white-space: pre-line;
`;

// 리뷰 로딩
const ReviewLoading = styled.div`
  text-align: center;
  padding: 20px;
  color: #666;
`;

interface UserProfile {
  nickname: string;
  career: string;
  shortDescription: string;
  profileImageUrl: string | null;
  position: string;
  techStacks: string[];
}

interface PortfolioItem {
  id: number;
  publicId: string;
  postId: number;
  postTitle: string;
  postLink: string;
  averageScore: number;
  recruitType: "PROJECT" | "STUDY";
  createAt: string;
}

interface Review {
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

const ProfilePage: React.FC = () => {
  const { publicId } = useParams<{ publicId: string }>();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [projects, setProjects] = useState<PortfolioItem[]>([]);
  const [studies, setStudies] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [portfolioLoading, setPortfolioLoading] = useState({
    projects: true,
    studies: true,
  });
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedPortfolio, setSelectedPortfolio] =
    useState<PortfolioItem | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await fetchAPI(
          `members/profile/public-id/${publicId}`,
          {
            method: "GET",
          }
        );

        if (!response.ok) {
          throw new Error("프로필을 불러오는데 실패했습니다.");
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
        setProfile(safeData);
      } catch (err) {
        console.error("프로필 로딩 오류:", err);
        setError(
          err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다"
        );
      } finally {
        setLoading(false);
      }
    };

    const fetchPortfolioItems = async (recruitType: "PROJECT" | "STUDY") => {
      try {
        setPortfolioLoading((prev) => ({
          ...prev,
          [recruitType === "PROJECT" ? "projects" : "studies"]: true,
        }));

        const response = await fetchAPI(
          `portfolios/${publicId}?recruitType=${recruitType}`,
          {
            method: "GET",
          }
        );

        if (!response.ok) {
          throw new Error(
            `${
              recruitType === "PROJECT" ? "프로젝트" : "스터디"
            } 정보를 불러오는데 실패했습니다.`
          );
        }

        const data = await response.json();
        console.log(`${recruitType} 데이터:`, data);

        if (recruitType === "PROJECT") {
          setProjects(data);
        } else {
          setStudies(data);
        }
      } catch (err) {
        console.error(`${recruitType} 로딩 오류:`, err);
        // 오류 발생해도 빈 배열로 설정하여 UI에서 처리
        if (recruitType === "PROJECT") {
          setProjects([]);
        } else {
          setStudies([]);
        }
      } finally {
        setPortfolioLoading((prev) => ({
          ...prev,
          [recruitType === "PROJECT" ? "projects" : "studies"]: false,
        }));
      }
    };

    if (publicId) {
      fetchProfile();
      fetchPortfolioItems("PROJECT");
      fetchPortfolioItems("STUDY");
    }
  }, [publicId]);

  const handleReviewClick = async (portfolioItem: PortfolioItem) => {
    setSelectedPortfolio(portfolioItem);
    setShowReviewModal(true);
    setReviewsLoading(true);

    try {
      const response = await fetchAPI(
        `portfolios/${publicId}/${portfolioItem.id}/reviews`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error("피어리뷰를 불러오는데 실패했습니다.");
      }

      const data = await response.json();
      console.log("피어리뷰 데이터:", data);
      setReviews(data);
    } catch (err) {
      console.error("피어리뷰 로딩 오류:", err);
      setReviews([]);
    } finally {
      setReviewsLoading(false);
    }
  };

  const closeModal = () => {
    setShowReviewModal(false);
    setSelectedPortfolio(null);
    setReviews([]);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return <div>프로필을 불러오는 중...</div>;
  }

  if (error || !profile) {
    return <div>프로필을 불러오는데 문제가 발생했습니다: {error}</div>;
  }

  return (
    <PageContainer>
      <div>
        <ProfileSection>
          <ProfileImage>
            {profile?.profileImageUrl ? (
              <img
                src={profile.profileImageUrl}
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
          <WelcomeMessage>{profile?.nickname}님의 프로필</WelcomeMessage>
        </ProfileSection>

        <InfoSection>
          <InfoRow>
            <InfoLabel>닉네임</InfoLabel>
            <InfoValue>
              {profile?.nickname !== "UNDEFINED" ? profile?.nickname : "없음"}
            </InfoValue>
          </InfoRow>

          <InfoRow>
            <InfoLabel>직무</InfoLabel>
            <InfoValue>
              {profile?.position !== "UNDEFINED" ? profile?.position : "없음"}
            </InfoValue>
          </InfoRow>

          <InfoRow>
            <InfoLabel>경력</InfoLabel>
            <InfoValue>
              {profile?.career !== "UNDEFINED" ? profile?.career : "없음"}
            </InfoValue>
          </InfoRow>

          <InfoRow>
            <InfoLabel>자기소개</InfoLabel>
            <InfoValue>
              {profile?.shortDescription !== "UNDEFINED"
                ? profile?.shortDescription
                : "없음"}
            </InfoValue>
          </InfoRow>

          <InfoRow>
            <InfoLabel>관심분야</InfoLabel>
            <TagsContainer>
              {profile?.techStacks && profile.techStacks.length > 0 ? (
                profile.techStacks.map((tech, index) => (
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
          <ActivityList>
            {portfolioLoading.projects ? (
              <div>프로젝트 정보를 불러오는 중...</div>
            ) : projects.length > 0 ? (
              projects.map((project) => (
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
                        handleReviewClick(project);
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
              ))
            ) : (
              <EmptyMessage>참여한 프로젝트가 없습니다.</EmptyMessage>
            )}
          </ActivityList>
        </ActivityColumn>

        <ActivityColumn>
          <SectionTitle>참여한 스터디</SectionTitle>
          <ActivityList>
            {portfolioLoading.studies ? (
              <div>스터디 정보를 불러오는 중...</div>
            ) : studies.length > 0 ? (
              studies.map((study) => (
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
                        handleReviewClick(study);
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
              ))
            ) : (
              <EmptyMessage>참여한 스터디가 없습니다.</EmptyMessage>
            )}
          </ActivityList>
        </ActivityColumn>
      </ActivitySection>

      {showReviewModal && selectedPortfolio && (
        <ModalBackdrop onClick={closeModal}>
          <ModalContainer onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>{selectedPortfolio.postTitle} 피어리뷰</ModalTitle>
              <CloseButton onClick={closeModal}>&times;</CloseButton>
            </ModalHeader>

            {reviewsLoading ? (
              <ReviewLoading>피어리뷰 정보를 불러오는 중...</ReviewLoading>
            ) : reviews.length > 0 ? (
              reviews.map((review) => (
                <ReviewCard key={review.id}>
                  <ReviewerInfo>
                    <ReviewerName>{review.reviewerNickname}</ReviewerName>
                    <ReviewDate>{formatDate(review.reviewDate)}</ReviewDate>
                  </ReviewerInfo>

                  <ScoreContainer>
                    <ScoreItem>
                      <ScoreLabel>협업 능력</ScoreLabel>
                      <Score>{review.collaborationScore}</Score>
                    </ScoreItem>
                    <ScoreItem>
                      <ScoreLabel>기술 역량</ScoreLabel>
                      <Score>{review.technicalScore}</Score>
                    </ScoreItem>
                    <ScoreItem>
                      <ScoreLabel>재협업 의사</ScoreLabel>
                      <Score>{review.workAgainScore}</Score>
                    </ScoreItem>
                  </ScoreContainer>

                  <AverageScore>
                    평균: {review.averageScore.toFixed(1)}/5
                  </AverageScore>

                  <Comment>{review.reviewComment}</Comment>
                </ReviewCard>
              ))
            ) : (
              <EmptyMessage>등록된 피어리뷰가 없습니다.</EmptyMessage>
            )}
          </ModalContainer>
        </ModalBackdrop>
      )}
    </PageContainer>
  );
};

export default ProfilePage;
