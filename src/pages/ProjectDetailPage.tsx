import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { brandColors } from "../styles/GlobalStyle";

// 페이지 컨테이너
const PageContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 40px auto;
  padding: 0 20px;
`;

// 상단 제목 영역
const TitleSection = styled.div`
  margin-bottom: 32px;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 16px;
  line-height: 1.4;
  font-family: "CookieRun-Regular", sans-serif;
`;

const MetaInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
`;

const Author = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const AuthorAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: #666;
`;

const AuthorName = styled.span`
  font-size: 14px;
  font-weight: 500;
`;

const Date = styled.span`
  font-size: 14px;
  color: #777;
`;

// 정보 테이블 영역
const InfoTable = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  margin-bottom: 40px;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  padding: 24px 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const InfoRow = styled.div`
  display: flex;
  margin-bottom: 16px;
`;

const InfoLabel = styled.div`
  flex: 0 0 120px;
  font-weight: 500;
  color: #666;
`;

const InfoValue = styled.div`
  flex: 1;
  color: #333;
`;

const Link = styled.a`
  color: ${brandColors.primaryText};
  text-decoration: underline;

  &:hover {
    color: ${brandColors.primary};
  }
`;

const Tag = styled.span`
  display: inline-block;
  background-color: ${brandColors.primaryLight};
  color: ${brandColors.primaryText};
  padding: 4px 12px;
  border-radius: 30px;
  font-size: 13px;
  margin-right: 8px;
  margin-bottom: 8px;
`;

// 프로젝트 소개 영역
const ContentSection = styled.div`
  margin-bottom: 40px;
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

const Content = styled.div`
  font-size: 15px;
  line-height: 1.8;
  color: #444;
  white-space: pre-wrap;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 40px;
`;

const Button = styled.button<{ primary?: boolean }>`
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  background-color: ${(props) =>
    props.primary ? brandColors.primary : "white"};
  color: ${(props) => (props.primary ? "white" : "#666")};
  border: 1px solid ${(props) => (props.primary ? brandColors.primary : "#ddd")};

  &:hover {
    background-color: ${(props) =>
      props.primary ? brandColors.primaryDark : "#f8f8f8"};
  }
`;

// 팀원 관리 스타일 컴포넌트
const TeamSection = styled.div`
  margin-bottom: 40px;
`;

const TeamSearchContainer = styled.div`
  margin-bottom: 20px;
`;

const SearchInput = styled.input`
  padding: 10px 16px;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 14px;
  width: 300px;
  margin-right: 10px;

  &:focus {
    outline: none;
    border-color: ${brandColors.primary};
  }
`;

const SearchButton = styled.button`
  padding: 10px 16px;
  border-radius: 8px;
  background-color: ${brandColors.primary};
  color: white;
  border: none;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${brandColors.primaryDark};
  }
`;

const SaveButton = styled(Button)`
  margin-top: 16px;
  margin-bottom: 30px;
`;

const TeamMemberTag = styled(Tag)`
  display: inline-flex;
  align-items: center;
  padding: 6px 12px;
  margin-right: 10px;
  margin-bottom: 10px;
`;

const RemoveButton = styled.span`
  margin-left: 8px;
  font-size: 14px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    color: #ff4444;
  }
`;

const SearchResults = styled.div`
  margin-top: 10px;
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #eee;
  border-radius: 8px;
  display: ${(props) => (props.hidden ? "none" : "block")};
`;

const SearchResultItem = styled.div`
  padding: 10px 16px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  transition: background-color 0.2s;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: #f8f8f8;
  }
`;

// 가상의 사용자 데이터 (실제로는 API에서 가져옴)
const mockUsers = [
  { id: "1", nickname: "서주원", email: "juwon@example.com" },
  { id: "2", nickname: "nanOsilver", email: "nano@example.com" },
  { id: "3", nickname: "jungmyung16", email: "jungmyung@example.com" },
  { id: "4", nickname: "홍창욱", email: "chang@example.com" },
  { id: "5", nickname: "김시용", email: "siyong@example.com" },
  { id: "6", nickname: "홍창욱", email: "hong@example.com" },
];

// 프로젝트 데이터에 팀원 정보 추가
const projectData = {
  id: "1",
  title: "[절찬리 모집] 기존 SNS문화를 바꾸고 싶다면 지원해주세요!",
  author: "Jaeyeong",
  date: "2025.05.02",
  category: "프로젝트",
  position: "인원 미정",
  apply_method: "사이트 내정",
  deadline: "2025.05.16",
  duration: "4개월",
  tech_stack: ["React", "TypeScript", "Node.js", "MongoDB"],
  team_members: ["서주원", "홍창욱"],
  description: `딥톡이라는 SNS를 왜 만들려고 하나요?


오랜 기간 동안 기존 SNS의 문화와 맞지 않는 유저들을 포착해 왔고, 저 역시 현재 주류 SNS 문화에 대해서 염증을 많이 느껴 온 사람입니다. 저희 딥톡은 해당 제품으로 새로운 SNS 문화를 만들고, 이를 필요로 하는 사람들에게 좋은 안식처가 되려고 합니다.


딥톡을 필요로 하는 사람은 누구일까요?


현재 이야기를 하는 공간에서 충분한 안전함을 못 느끼는 유저
자신이 올린 포스팅 글이 다른 SNS/커뮤니티에 무단으로 사용되는 경험을 겪은
자신이 올린 글이 다른 유저들에게 무분별한 비난을 받거나, 조롱을 받았던 경험이 있는
현재 사용하고 있는 SNS의 댓글, 인용, 글(콘텐츠)의 내용이 내가 지향하는 문화와 맞지 않는


X(트위터)를 주로 사용하지만, X의 운영 방식에 동의를 하지 않는 유저
음란물 등 유해할 수 있는 콘텐츠에 대한 X의 명백한 방치
AI의 침범을 받고 싶지 않은
AI 사용으로 인용, 댓글 등 기능에 대한 불편함


딥톡이 찾고 있는 분


X(트위터), 각종 커뮤니티를 깊게 사용해본 경험이 있고, 현재도 활발히 사용을 하고 있어요.
저희 딥톡을 같이 날카롭게 기획하고 발전시킬 분이 필요해요.
X(트위터)를 활용해서 트위터 문화에 맞는 마케팅을 할 수 있어요.
프로젝트 경험이 없어도, 해당 제품을 발전시킬 수 있고 딥톡이 타켓하고 있는 문화에 대한 이해도가 높아요.


프로젝트 경험이 없어도, 해당 제품을 발전시킬 수 있는 자신이 있고 딥톡이 타깃하고 있는 문화에 대해 이해가 높으시다면, 편하게 지원 부탁드립니다!`,
};

const ProjectDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchResults, setSearchResults] = useState<typeof mockUsers>([]);
  const [showResults, setShowResults] = useState(false);
  const [teamMembers, setTeamMembers] = useState<string[]>(
    projectData.team_members || []
  );
  const searchRef = useRef<HTMLDivElement>(null);

  // 검색 결과 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleGoBack = () => {
    navigate(-1);
  };

  // 닉네임 검색 함수
  const searchMembers = () => {
    if (searchKeyword.trim() === "") {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    const filtered = mockUsers.filter(
      (user) =>
        user.nickname.toLowerCase().includes(searchKeyword.toLowerCase()) &&
        !teamMembers.includes(user.nickname)
    );

    setSearchResults(filtered);
    setShowResults(true);
  };

  // 엔터 키 처리
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      searchMembers();
    }
  };

  // 팀원 추가
  const addTeamMember = (nickname: string) => {
    if (!teamMembers.includes(nickname)) {
      setTeamMembers([...teamMembers, nickname]);
    }
    setSearchKeyword("");
    setSearchResults([]);
    setShowResults(false);
  };

  // 팀원 제거
  const removeTeamMember = (nickname: string) => {
    setTeamMembers(teamMembers.filter((member) => member !== nickname));
  };

  // 팀원 저장 (실제로는 API 호출)
  const saveTeamMembers = () => {
    // API 호출 로직 추가 예정
    alert(`팀원 변경사항이 저장되었습니다: ${teamMembers.join(", ")}`);
  };

  return (
    <PageContainer>
      <TitleSection>
        <Title>{projectData.title}</Title>
        <MetaInfo>
          <Author>
            <AuthorAvatar>🧑</AuthorAvatar>
            <AuthorName>{projectData.author}</AuthorName>
          </Author>
          <Date>{projectData.date}</Date>
        </MetaInfo>
      </TitleSection>

      <InfoTable>
        <div>
          <InfoRow>
            <InfoLabel>모집 구분</InfoLabel>
            <InfoValue>{projectData.category}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>프로젝트</InfoLabel>
            <InfoValue>딥톡 SNS</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>모집 인원</InfoLabel>
            <InfoValue>{projectData.position}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>연락 방법</InfoLabel>
            <InfoValue>
              <Link href="https://open.kakao.com" target="_blank">
                오픈톡
              </Link>
            </InfoValue>
          </InfoRow>
        </div>

        <div>
          <InfoRow>
            <InfoLabel>지원 방식</InfoLabel>
            <InfoValue>{projectData.apply_method}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>모집 마감</InfoLabel>
            <InfoValue>{projectData.deadline}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>예상 기간</InfoLabel>
            <InfoValue>{projectData.duration}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>사용 언어</InfoLabel>
            <InfoValue>
              {projectData.tech_stack.map((tech, index) => (
                <Tag key={index}>{tech}</Tag>
              ))}
            </InfoValue>
          </InfoRow>
        </div>
      </InfoTable>

      <TeamSection>
        <SectionTitle>팀원 관리</SectionTitle>
        <div ref={searchRef}>
          <TeamSearchContainer>
            <SearchInput
              type="text"
              placeholder="닉네임으로 팀원 검색..."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <SearchButton onClick={searchMembers}>검색</SearchButton>

            <SearchResults hidden={!showResults || searchResults.length === 0}>
              {searchResults.map((user) => (
                <SearchResultItem
                  key={user.id}
                  onClick={() => addTeamMember(user.nickname)}
                >
                  {user.nickname} ({user.email})
                </SearchResultItem>
              ))}
            </SearchResults>
          </TeamSearchContainer>
        </div>

        <div>
          {teamMembers.map((member, index) => (
            <TeamMemberTag key={index}>
              {member}
              <RemoveButton onClick={() => removeTeamMember(member)}>
                ×
              </RemoveButton>
            </TeamMemberTag>
          ))}
        </div>

        {teamMembers.length > 0 && (
          <SaveButton primary onClick={saveTeamMembers}>
            팀원 정보 저장
          </SaveButton>
        )}
      </TeamSection>

      <ContentSection>
        <SectionTitle>프로젝트 소개</SectionTitle>
        <Content>{projectData.description}</Content>
      </ContentSection>

      <ButtonGroup>
        <Button onClick={handleGoBack}>목록으로</Button>
      </ButtonGroup>
    </PageContainer>
  );
};

export default ProjectDetailPage;
