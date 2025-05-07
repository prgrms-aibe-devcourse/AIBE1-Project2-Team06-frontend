import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { useParams, useNavigate, Link as RouterLink } from "react-router-dom";
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
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-top: 40px;
  margin-bottom: 32px;
`;

const ButtonRightGroup = styled.div`
  display: flex;
  gap: 12px;
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

// 피어리뷰 스타일 컴포넌트
const PeerReviewSection = styled.div`
  margin-bottom: 40px;
`;

const ReviewForm = styled.div`
  background-color: #f9f9f9;
  padding: 24px;
  border-radius: 12px;
  margin-top: 20px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  font-weight: 500;
  margin-bottom: 8px;
  font-size: 15px;
`;

const Select = styled.select`
  width: 100%;
  max-width: 300px;
  padding: 10px 14px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E");
  background-position: right 10px center;
  background-repeat: no-repeat;
  background-size: 20px 20px;

  &:focus {
    outline: none;
    border-color: ${brandColors.primary};
  }
`;

const RatingGroup = styled.div`
  margin-bottom: 16px;
`;

const RatingLabel = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;

  span:first-child {
    font-weight: 500;
  }

  span:last-child {
    color: #666;
    font-size: 14px;
  }
`;

const RatingContainer = styled.div`
  display: flex;
  gap: 8px;
`;

const RatingOption = styled.button<{ selected?: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  border: 1px solid ${(props) => (props.selected ? "transparent" : "#ddd")};
  background-color: ${(props) =>
    props.selected ? brandColors.primary : "white"};
  color: ${(props) => (props.selected ? "white" : "#333")};
  font-weight: ${(props) => (props.selected ? "600" : "normal")};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${(props) =>
      props.selected ? brandColors.primary : "#f0f0f0"};
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  min-height: 120px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: ${brandColors.primary};
  }
`;

const SubmitButton = styled(Button)`
  margin-top: 16px;
`;

// 컬처핏 모달 스타일
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
`;
const ModalContent = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 32px 28px 24px 28px;
  width: 420px;
  height: 380px;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.15);
  position: relative;
  overflow-y: auto;
`;
const ModalTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 24px;
  color: ${brandColors.primary};
`;
const ModalClose = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  font-size: 24px;
  color: #888;
  cursor: pointer;
`;
const Question = styled.div`
  font-size: 17px;
  font-weight: 600;
  margin-bottom: 24px;
`;
const AnswerList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 32px;
`;
const AnswerOption = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 15px;
  cursor: pointer;
`;
const ModalButton = styled.button`
  padding: 10px 28px;
  border-radius: 6px;
  border: none;
  font-size: 16px;
  font-weight: 600;
  background: ${brandColors.primary};
  color: #fff;
  cursor: pointer;
  margin-top: 8px;
  &:hover {
    background: ${brandColors.primaryDark};
  }
`;

const AnswerTextArea = styled.textarea`
  width: 100%;
  min-height: 80px;
  padding: 10px 14px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 15px;
  resize: vertical;
  margin-bottom: 32px;
  &:focus {
    outline: none;
    border-color: ${brandColors.primary};
  }
`;

const ModalButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
`;
const ModalButtonLeft = styled(ModalButton)`
  margin-top: 0;
  margin-right: auto;
`;
const ModalButtonRight = styled(ModalButton)`
  margin-top: 0;
  margin-left: auto;
`;

const cultureFitQuestions = [
  {
    q: "당신은 어떤 협업 방식을 선호하나요?",
    a: ["각자 역할이 명확하게 나뉜 분업형", "함께 논의하며 유연하게 진행"],
  },
  {
    q: "마감일이 다가올 때 당신의 작업 스타일은 어떤가요?",
    a: ["압박이 있어야 집중이 잘 된다", "미리미리 끝내놓는 편"],
  },
  {
    q: "프로젝트 중 문제가 생기면 어떤 방식으로 해결하려 하나요?",
    a: ["팀원들과 바로 논의하여 해결한다", "혼자 먼저 고민해보고 공유"],
  },
  {
    q: "팀 내 소통에서 당신의 성향은?",
    a: [
      "자주 의견을 나누고 회의도 자주 있는 걸 선호",
      "필요할 때만 소통하는 걸 선호",
    ],
  },
  {
    q: "팀원과 의견이 다를 때 어떤 편인가요?",
    a: ["서로 타협점을 찾으려 한다", "내 주장을 끝까지 관철하려 한다"],
  },
  {
    q: "당신은 어떤 방식의 업무 분배를 선호하나요?",
    a: ["능력에 따라 효율적으로 배분", "동등하게 나누는 걸 선호"],
  },
];

// 가상의 사용자 데이터 (실제로는 API에서 가져옴)
const mockUsers = [
  { id: "1", nickname: "서주원", email: "juwon@example.com" },
  { id: "2", nickname: "nanOsilver", email: "nano@example.com" },
  { id: "3", nickname: "jungmyung16", email: "jungmyung@example.com" },
  { id: "4", nickname: "송창욱", email: "chang@example.com" },
  { id: "5", nickname: "김시용", email: "siyong@example.com" },
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
  team_members: ["서주원", "송창욱"],
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

const TeamModalContent = styled(ModalContent)`
  width: 440px;
  height: 420px;
`;

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

  // 피어리뷰 상태
  const [selectedTeamMember, setSelectedTeamMember] = useState<string>("");
  const [collaborationRating, setCollaborationRating] = useState<number | null>(
    null
  );
  const [technicalRating, setTechnicalRating] = useState<number | null>(null);
  const [reCollaborationRating, setReCollaborationRating] = useState<
    number | null
  >(null);
  const [reviewComment, setReviewComment] = useState<string>("");

  // 컬처핏 상태
  const [isCultureFitOpen, setIsCultureFitOpen] = useState(false);
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [isPeerReviewModalOpen, setIsPeerReviewModalOpen] = useState(false);
  const [cultureStep, setCultureStep] = useState(0);
  const [cultureAnswers, setCultureAnswers] = useState<(string | null)[]>(
    Array(cultureFitQuestions.length).fill(null)
  );

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

  // 피어리뷰 제출
  const handleReviewSubmit = () => {
    if (!selectedTeamMember) {
      alert("평가할 팀원을 선택해주세요.");
      return;
    }

    if (
      collaborationRating === null ||
      technicalRating === null ||
      reCollaborationRating === null
    ) {
      alert("모든 평가 항목을 선택해주세요.");
      return;
    }

    if (!reviewComment.trim()) {
      alert("리뷰 코멘트를 입력해주세요.");
      return;
    }

    // 리뷰 데이터 생성
    const reviewData = {
      teamMember: selectedTeamMember,
      ratings: {
        collaboration: collaborationRating,
        technical: technicalRating,
        reCollaboration: reCollaborationRating,
      },
      comment: reviewComment,
    };

    // 실제로는 API를 호출하여 서버에 리뷰 데이터 저장
    console.log("리뷰 데이터:", reviewData);
    alert(`${selectedTeamMember}님에 대한 피어 리뷰가 제출되었습니다.`);

    // 폼 초기화
    setSelectedTeamMember("");
    setCollaborationRating(null);
    setTechnicalRating(null);
    setReCollaborationRating(null);
    setReviewComment("");
  };

  // 숫자 범위 배열 생성 함수
  const rangeArray = (start: number, end: number) =>
    Array.from({ length: end - start + 1 }, (_, i) => start + i);

  // 컬처핏 답변 선택
  const handleCultureAnswer = (answer: string) => {
    const updated = [...cultureAnswers];
    updated[cultureStep] = answer;
    setCultureAnswers(updated);
  };
  // 컬처핏 제출
  const handleCultureSubmit = () => {
    setIsCultureFitOpen(false);
    alert(
      "컬처핏 답변이 제출되었습니다!\n" +
        cultureFitQuestions
          .map((q, i) => `${i + 1}. ${q.q}\n- ${cultureAnswers[i]}`)
          .join("\n")
    );
    setCultureStep(0);
    setCultureAnswers(Array(cultureFitQuestions.length).fill(null));
  };

  return (
    <PageContainer>
      <TitleSection>
        <Title>{projectData.title}</Title>
        <MetaInfo>
          <RouterLink to="/mypage" style={{ textDecoration: "none" }}>
            <Author style={{ cursor: "pointer" }}>
              <AuthorAvatar>🧑</AuthorAvatar>
              <AuthorName>{projectData.author}</AuthorName>
            </Author>
          </RouterLink>
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

      {/* 팀원 관리/피어리뷰 버튼 */}
      <ButtonGroup>
        <Button onClick={handleGoBack}>{"<"}</Button>
        <ButtonRightGroup>
          <Button onClick={() => setIsTeamModalOpen(true)}>팀원 관리</Button>
          <Button onClick={() => setIsPeerReviewModalOpen(true)}>
            피어리뷰 작성
          </Button>
          <Button primary onClick={() => setIsCultureFitOpen(true)}>
            컬처핏 등록
          </Button>
        </ButtonRightGroup>
      </ButtonGroup>

      {/* 팀원 관리 모달 */}
      {isTeamModalOpen && (
        <ModalOverlay onClick={() => setIsTeamModalOpen(false)}>
          <TeamModalContent onClick={(e) => e.stopPropagation()}>
            <ModalClose onClick={() => setIsTeamModalOpen(false)}>
              &times;
            </ModalClose>
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
                <SearchResults
                  hidden={!showResults || searchResults.length === 0}
                >
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
          </TeamModalContent>
        </ModalOverlay>
      )}

      {/* 피어리뷰 작성 모달 */}
      {isPeerReviewModalOpen && (
        <ModalOverlay onClick={() => setIsPeerReviewModalOpen(false)}>
          <ModalContent
            style={{ width: "600px", height: "540px" }}
            onClick={(e) => e.stopPropagation()}
          >
            <ModalClose onClick={() => setIsPeerReviewModalOpen(false)}>
              &times;
            </ModalClose>
            <SectionTitle>피어 리뷰 작성</SectionTitle>
            <ReviewForm>
              <FormGroup>
                <Label>리뷰 대상 선택</Label>
                <Select
                  value={selectedTeamMember}
                  onChange={(e) => setSelectedTeamMember(e.target.value)}
                >
                  <option value="">평가할 팀원을 선택하세요</option>
                  {teamMembers.map((member, index) => (
                    <option key={index} value={member}>
                      {member}
                    </option>
                  ))}
                </Select>
              </FormGroup>
              <FormGroup>
                <Label>평가 항목</Label>
                <RatingGroup>
                  <RatingLabel>
                    <span>협업 태도</span>
                    <span>
                      평가:{" "}
                      {collaborationRating !== null ? collaborationRating : "-"}
                      /5
                    </span>
                  </RatingLabel>
                  <RatingContainer>
                    {rangeArray(0, 5).map((rating) => (
                      <RatingOption
                        key={rating}
                        selected={collaborationRating === rating}
                        onClick={() => setCollaborationRating(rating)}
                      >
                        {rating}
                      </RatingOption>
                    ))}
                  </RatingContainer>
                </RatingGroup>
                <RatingGroup>
                  <RatingLabel>
                    <span>기술 기여도</span>
                    <span>
                      평가: {technicalRating !== null ? technicalRating : "-"}/5
                    </span>
                  </RatingLabel>
                  <RatingContainer>
                    {rangeArray(0, 5).map((rating) => (
                      <RatingOption
                        key={rating}
                        selected={technicalRating === rating}
                        onClick={() => setTechnicalRating(rating)}
                      >
                        {rating}
                      </RatingOption>
                    ))}
                  </RatingContainer>
                </RatingGroup>
                <RatingGroup>
                  <RatingLabel>
                    <span>다시 함께 하고 싶은지 여부</span>
                    <span>
                      평가:{" "}
                      {reCollaborationRating !== null
                        ? reCollaborationRating
                        : "-"}
                      /5
                    </span>
                  </RatingLabel>
                  <RatingContainer>
                    {rangeArray(0, 5).map((rating) => (
                      <RatingOption
                        key={rating}
                        selected={reCollaborationRating === rating}
                        onClick={() => setReCollaborationRating(rating)}
                      >
                        {rating}
                      </RatingOption>
                    ))}
                  </RatingContainer>
                </RatingGroup>
              </FormGroup>
              <FormGroup>
                <Label>리뷰 코멘트</Label>
                <TextArea
                  placeholder="팀원에 대한 솔직한 피드백을 작성해주세요."
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                />
              </FormGroup>
              <SubmitButton primary onClick={handleReviewSubmit}>
                리뷰 제출하기
              </SubmitButton>
            </ReviewForm>
          </ModalContent>
        </ModalOverlay>
      )}

      <ContentSection>
        <SectionTitle>프로젝트 소개</SectionTitle>
        <Content>{projectData.description}</Content>
      </ContentSection>

      {/* 컬처핏 등록 모달 (기존과 동일) */}
      {isCultureFitOpen && (
        <ModalOverlay onClick={() => setIsCultureFitOpen(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalClose onClick={() => setIsCultureFitOpen(false)}>
              &times;
            </ModalClose>
            <ModalTitle>컬처핏 등록</ModalTitle>
            <Question>{cultureFitQuestions[cultureStep].q}</Question>
            <AnswerTextArea
              value={cultureAnswers[cultureStep] || ""}
              onChange={(e) => handleCultureAnswer(e.target.value)}
              placeholder="답변을 입력해주세요."
            />
            <ModalButtonGroup>
              <ModalButtonLeft
                type="button"
                disabled={cultureStep === 0}
                onClick={() => setCultureStep(cultureStep - 1)}
              >
                이전
              </ModalButtonLeft>
              {cultureStep < cultureFitQuestions.length - 1 ? (
                <ModalButtonRight
                  type="button"
                  disabled={
                    !cultureAnswers[cultureStep] ||
                    !cultureAnswers[cultureStep]?.trim()
                  }
                  onClick={() => setCultureStep(cultureStep + 1)}
                >
                  다음
                </ModalButtonRight>
              ) : (
                <ModalButtonRight
                  type="button"
                  disabled={
                    !cultureAnswers[cultureStep] ||
                    !cultureAnswers[cultureStep]?.trim()
                  }
                  onClick={handleCultureSubmit}
                >
                  제출
                </ModalButtonRight>
              )}
            </ModalButtonGroup>
          </ModalContent>
        </ModalOverlay>
      )}
    </PageContainer>
  );
};

export default ProjectDetailPage;
