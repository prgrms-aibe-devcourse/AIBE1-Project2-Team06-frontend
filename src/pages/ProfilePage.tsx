import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { brandColors } from "../styles/GlobalStyle";

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

interface UserProfile {
  nickname: string;
  career: string;
  shortDescription: string;
  profileImageUrl: string | null;
  position: string;
  techStacks: string[];
}

// 가상의 활동 데이터 (실제로는 API에서 가져옴)
const activityData = {
  projects: [
    {
      id: "1",
      title: "딥톡 SNS 프로젝트",
      link: "/project/1",
      reviewScore: 4.5,
      projectLink: "https://github.com/team/deeptalk",
    },
    {
      id: "2",
      title: "포트폴리오 웹사이트",
      link: "/project/2",
      reviewScore: 4.8,
      projectLink: "https://github.com/user/portfolio",
    },
  ],
  studies: [
    {
      id: "1",
      title: "React 스터디",
      link: "/study/1",
      reviewScore: 4.2,
      studyLink: "https://github.com/study/react-study",
    },
    {
      id: "2",
      title: "TypeScript 마스터",
      link: "/study/2",
      reviewScore: 4.7,
      studyLink: "https://github.com/study/typescript-master",
    },
  ],
};

const ProfilePage: React.FC = () => {
  const { publicId } = useParams<{ publicId: string }>();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:8080/api/v1/members/profile/public-id/${publicId}`
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

    if (publicId) {
      fetchProfile();
    }
  }, [publicId]);

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
            {activityData.projects.map((project) => (
              <ActivityCard key={project.id}>
                <ActivityTitle>{project.title}</ActivityTitle>
                <LinkContainer>
                  <ActivityLink
                    href={project.projectLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    프로젝트 링크
                  </ActivityLink>
                </LinkContainer>
                <ReviewScore>
                  피어리뷰 평균 점수:{" "}
                  <ScoreValue>{project.reviewScore}/5</ScoreValue>
                </ReviewScore>
              </ActivityCard>
            ))}
          </ActivityList>
        </ActivityColumn>

        <ActivityColumn>
          <SectionTitle>참여한 스터디</SectionTitle>
          <ActivityList>
            {activityData.studies.map((study) => (
              <ActivityCard key={study.id}>
                <ActivityTitle>{study.title}</ActivityTitle>
                <LinkContainer>
                  <ActivityLink
                    href={study.studyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    스터디 링크
                  </ActivityLink>
                </LinkContainer>
                <ReviewScore>
                  피어리뷰 평균 점수:{" "}
                  <ScoreValue>{study.reviewScore}/5</ScoreValue>
                </ReviewScore>
              </ActivityCard>
            ))}
          </ActivityList>
        </ActivityColumn>
      </ActivitySection>
    </PageContainer>
  );
};

export default ProfilePage;
