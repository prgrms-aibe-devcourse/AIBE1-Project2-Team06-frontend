import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { useParams, useNavigate, Link as RouterLink } from "react-router-dom";
import { brandColors } from "../styles/GlobalStyle";
import { fetchAPI } from "../config/apiConfig";

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

const DateText = styled.span`
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

const DangerButton = styled(Button)`
  background-color: #ff4444;
  color: #fff;
  border: 1px solid #ff4444;
  &:hover {
    background-color: #d32f2f;
    border-color: #d32f2f;
  }
`;

const CompleteButton = styled(Button)`
  background-color: #1976d2;
  color: #fff;
  border: 1px solid #1976d2;
  &:hover {
    background-color: #115293;
    border-color: #115293;
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
  width: 480px;
  max-height: 520px;
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
  margin-bottom: 8px;
`;
const QuestionTitle = styled.div`
  font-size: 17px;
  font-weight: 600;
  margin-bottom: 4px;
`;
const QuestionSubtitle = styled.div`
  font-size: 15px;
  color: #666;
  margin-bottom: 16px;
`;
const AnswerList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 32px;
`;
const AnswerOption = styled.label<{ selected?: boolean }>`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid
    ${(props) => (props.selected ? brandColors.primary : "#ddd")};
  background-color: ${(props) =>
    props.selected ? `${brandColors.primaryLight}30` : "white"};
  font-size: 15px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${(props) =>
      props.selected ? `${brandColors.primaryLight}30` : "#f8f8f8"};
  }
`;
const RadioInput = styled.input`
  margin-right: 12px;
  accent-color: ${brandColors.primary};
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
    q: "1. 협업 스타일",
    subq: "당신은 어떤 협업 방식을 선호하나요?",
    a: [
      "혼자 일한 후 결과를 공유하는 방식",
      "함께 브레인스토밍하고 의견을 자주 나누는 방식",
      "각자 역할이 명확하게 나뉜 분업형",
    ],
  },
  {
    q: "2. 일정과 마감에 대한 태도",
    subq: "마감일이 다가올 때 당신의 작업 스타일은 어떤가요?",
    a: [
      "미리 계획하고 일찍 끝내려고 한다",
      "적절히 분배하며 마감일을 맞춘다",
      "압박이 있어야 집중이 잘 된다",
    ],
  },
  {
    q: "3. 문제 발생 시 대처 방식",
    subq: "프로젝트 중 문제가 생기면 어떤 방식으로 해결하려 하나요?",
    a: [
      "먼저 스스로 고민한 뒤 해결책을 공유한다",
      "팀원들과 바로 논의하여 해결한다",
      "리더나 책임자에게 먼저 알린다",
    ],
  },
  {
    q: "4. 의사소통 방식",
    subq: "팀 내 소통에서 당신의 성향은?",
    a: [
      "자주 의견을 나누고 회의도 자주 있는 걸 선호",
      "필요한 경우에만 간결히 소통",
      "비동기(댓글, 슬랙 등) 중심의 소통을 선호",
    ],
  },
  {
    q: "5. 갈등 상황에서의 태도",
    subq: "팀원과 의견이 다를 때 어떤 편인가요?",
    a: [
      "설득하거나 내 의견을 끝까지 관철하려 한다",
      "서로 타협점을 찾으려 한다",
      "조용히 수긍하고 따른다",
    ],
  },
  {
    q: "6. 업무 분배에 대한 생각",
    subq: "당신은 어떤 방식의 업무 분배를 선호하나요?",
    a: [
      "능력에 따라 효율적으로 배분",
      "모두가 고르게 분담",
      "자발적으로 맡고 싶은 일을 고르게 한다",
    ],
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

// 검색 결과를 위한 인터페이스 추가
interface SearchResult {
  nickname: string;
}

// 프로젝트 데이터 인터페이스
interface TechStack {
  id: number;
  name: string;
}

interface Position {
  id: number;
  name: string;
}

interface ProjectDetailData {
  id: number;
  publicId: string;
  nickname: string;
  title: string;
  content: string;
  recruitType: string;
  recruitMember: number;
  progressMethod: string;
  period: string;
  deadline: string;
  linkType: string;
  link: string;
  cultureFit: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  techStacks: TechStack[];
  positions: Position[];
}

const TeamModalContent = styled(ModalContent)`
  width: 440px;
  height: 420px;
`;

// 컬처핏 답변 매핑 (서버 필드명으로 변환)
const cultureFitFieldMapping = {
  "1. 협업 스타일": "collaborationStyle",
  "2. 일정과 마감에 대한 태도": "deadlineAttitude",
  "3. 문제 발생 시 대처 방식": "problemSolvingApproach",
  "4. 의사소통 방식": "communicationStyle",
  "5. 갈등 상황에서의 태도": "conflictResolution",
  "6. 업무 분배에 대한 생각": "tackDistribution",
};

// 컬처핏 타입 인터페이스
interface CultureFitResult {
  cultureFitType: string;
}

// 컬처핏 제출 답변 인터페이스
interface CultureFitSubmission {
  collaborationStyle: string;
  deadlineAttitude: string;
  problemSolvingApproach: string;
  communicationStyle: string;
  conflictResolution: string;
  tackDistribution: string;
}

// 컬처핏 타입 설명
const cultureFitTypeDescription: { [key: string]: string } = {
  PRACTICAL: "실용주의형",
  DEMOCRATIC: "민주주의형",
  AUTONOMOUS: "자율주의형",
  COLLABORATIVE: "협업주의형",
  STRUCTURED: "체계주의형",
  FLEXIBLE: "유연주의형",
  COMMUNICATIVE: "소통중시형",
};

// 컬처핏 타입 상세 설명
const cultureFitTypeDetailDescription: { [key: string]: string } = {
  PRACTICAL:
    "당신은 효율성과 실용성을 중시하며, 명확한 역할 분담과 능력에 따른 효율적인 업무 배분을 선호합니다. 문제가 생겼을 때는 스스로 고민한 뒤 해결책을 공유하는 방식으로 일하며, 팀원들과의 소통도 중요시합니다. 갈등이 있을 때는 타협점을 찾으려 노력하는 합리적인 성향을 가지고 있습니다.",
  DEMOCRATIC:
    "모두의 의견을 존중하고 고르게 업무를 분담하는 것을 중요시합니다. 모든 결정은 팀원들의 동의를 바탕으로 이루어지며, 개인보다는 팀의 화합을 우선시합니다.",
  AUTONOMOUS:
    "독립적으로 일하는 것을 선호하며, 자신만의 공간과 시간을 통해 결과물을 만들어내는 것을 좋아합니다. 불필요한 소통보다는 각자의 전문성을 발휘하여 업무를 진행하는 방식을 선호합니다.",
  COLLABORATIVE:
    "긴밀한 협력과 지속적인 소통을 통해 함께 문제를 해결하는 것을 중요시합니다. 팀원들과 브레인스토밍하고 아이디어를 나누며 발전시키는 과정을 즐깁니다.",
  STRUCTURED:
    "체계적인 계획과 일정 관리를 중요시하며, 명확한 프로세스를 따라 프로젝트를 진행합니다. 계획대로 차근차근 일을 진행하는 것을 선호합니다.",
  FLEXIBLE:
    "상황에 따라 유연하게 대처하며, 변화와 새로운 아이디어를 수용하는 것을 선호합니다. 엄격한 규칙보다는 자유로운 환경에서 창의성을 발휘하는 것을 중요시합니다.",
  COMMUNICATIVE:
    "자주 의견을 나누고 소통하는 것을 중요시합니다. 팀원들과 충분한 대화를 통해 프로젝트를 진행하며, 열린 소통으로 문제를 해결하는 것을 선호합니다. 자유로운 의견 교환과 활발한 회의 문화를 지향합니다.",
};

// 팀원 정보 인터페이스 추가
interface TeamMember {
  id: number;
  postId: number;
  memberId: number;
  publicId: string;
  nickname: string;
  isOwner: boolean;
  createdAt: string;
}

const Input = styled.input`
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 15px;
  background: #fafbfc;
`;

const ProjectDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [teamMembers, setTeamMembers] = useState<string[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [projectData, setProjectData] = useState<ProjectDetailData | null>(
    null
  );

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
    Array(cultureFitQuestions.length).fill(null) as (string | null)[]
  );
  const [showResultModal, setShowResultModal] = useState(false);
  const [cultureResult, setCultureResult] = useState<CultureFitResult | null>(
    null
  );
  const [cultureSubmission, setCultureSubmission] =
    useState<CultureFitSubmission | null>(null);

  // 팀원 정보 인터페이스 추가
  const [existingTeamMembers, setExistingTeamMembers] = useState<TeamMember[]>(
    []
  );

  // 추가된 상태
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);
  const [githubLink, setGithubLink] = useState("");

  // 프로젝트 데이터 가져오기
  useEffect(() => {
    const fetchProjectData = async () => {
      if (!id) return;

      try {
        setLoading(true);
        setError(null);

        const response = await fetchAPI(`posts/${id}`, {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error(`서버 오류: ${response.status}`);
        }

        const data = await response.json();
        setProjectData(data);

        // 팀원 정보 초기화 (실제로는 팀원 정보도 API에서 가져와야 함)
        setTeamMembers([]);
      } catch (err) {
        console.error("프로젝트 데이터 로딩 중 오류:", err);
        setError("프로젝트 정보를 불러오는데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjectData();
  }, [id]);

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

  // 진행 방식 표시
  const renderProgressMethod = (method: string) => {
    switch (method) {
      case "ONLINE":
        return "온라인";
      case "OFFLINE":
        return "오프라인";
      case "ALL":
        return "온라인/오프라인";
      default:
        return "온라인/오프라인";
    }
  };

  // 기간 표시
  const renderPeriod = (period: string) => {
    switch (period) {
      case "MONTH_1":
        return "1개월";
      case "MONTH_3":
        return "3개월";
      case "MONTH_6":
        return "6개월";
      case "MONTH_6_MORE":
        return "6개월 이상";
      default:
        return "기간 미정";
    }
  };

  // 연락 방법 표시
  const renderLinkType = (linkType: string) => {
    switch (linkType) {
      case "KAKAO":
        return "오픈톡";
      case "EMAIL":
        return "이메일";
      case "GOOGLE":
        return "구글폼";
      default:
        return "오픈톡";
    }
  };

  // 구분 표시
  const renderRecruitType = (type: string) => {
    switch (type) {
      case "STUDY":
        return "스터디";
      case "PROJECT":
        return "프로젝트";
      default:
        return "프로젝트";
    }
  };

  // 날짜 포맷팅
  const formatDate = (dateString: string) => {
    try {
      // JavaScript의 기본 Date 객체 사용
      const jsDate = new Date(dateString);
      return `${jsDate.getFullYear()}.${String(jsDate.getMonth() + 1).padStart(
        2,
        "0"
      )}.${String(jsDate.getDate()).padStart(2, "0")}`;
    } catch (error) {
      console.error("날짜 변환 오류:", error);
      return dateString;
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  // 닉네임 검색 함수
  const searchMembers = async () => {
    if (searchKeyword.trim() === "") {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    try {
      const response = await fetchAPI(`members/profile/${searchKeyword}`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("검색 결과를 가져오는데 실패했습니다.");
      }

      const data = await response.json();

      if (data && !teamMembers.includes(data.nickname)) {
        setSearchResults([{ nickname: data.nickname }]);
        setShowResults(true);
      } else {
        setSearchResults([]);
        setShowResults(false);
      }
    } catch (error) {
      console.error("검색 중 오류 발생:", error);
      alert("검색 중 오류가 발생했습니다. 다시 시도해주세요.");
      setSearchResults([]);
      setShowResults(false);
    }
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

  // 팀원 저장 함수
  const saveTeamMembers = async () => {
    if (!id) {
      alert("프로젝트 ID가 없습니다.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      const response = await fetchAPI(`posts/${id}/members`, {
        method: "POST",
        body: JSON.stringify({
          postId: parseInt(id),
          nicknames: teamMembers,
        }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          alert("인증이 필요합니다. 다시 로그인해주세요.");
          return;
        }
        throw new Error("팀원 정보 저장에 실패했습니다.");
      }

      alert("팀원 정보가 성공적으로 저장되었습니다.");
      setIsTeamModalOpen(false);
    } catch (error) {
      console.error("팀원 정보 저장 중 오류 발생:", error);
      alert("팀원 정보 저장 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  // 피어리뷰 제출
  const handleReviewSubmit = async () => {
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

    // 리뷰 대상 id 찾기
    const reviewee = existingTeamMembers.find(
      (m) => m.nickname === selectedTeamMember
    );
    if (!reviewee) {
      alert("리뷰 대상 팀원 정보를 찾을 수 없습니다.");
      return;
    }

    if (!reviewee.publicId) {
      alert("리뷰 대상 팀원의 publicId가 없습니다.");
      return;
    }

    // 리뷰 데이터 생성
    const reviewData = {
      postId: Number(id),
      revieweeUserId: reviewee.publicId,
      collaborationScore: collaborationRating,
      technicalScore: technicalRating,
      workAgainScore: reCollaborationRating,
      reviewComment: reviewComment,
    };

    console.log("피어리뷰 요청 데이터:", reviewData);

    try {
      const response = await fetchAPI("peer-reviews", {
        method: "POST",
        body: JSON.stringify(reviewData),
      });
      if (!response.ok) throw new Error("리뷰 제출 실패");
      alert(`${selectedTeamMember}님에 대한 피어 리뷰가 제출되었습니다.`);
      // 폼 초기화
      setSelectedTeamMember("");
      setCollaborationRating(null);
      setTechnicalRating(null);
      setReCollaborationRating(null);
      setReviewComment("");
      setIsPeerReviewModalOpen(false);
    } catch (e) {
      alert("리뷰 제출 중 오류가 발생했습니다.");
    }
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
  const handleCultureSubmit = async () => {
    // 모든 질문에 답했는지 확인
    if (cultureAnswers.some((answer) => answer === null)) {
      alert("모든 질문에 답변해주세요.");
      return;
    }

    try {
      // API 요청 데이터 준비
      const cultureFitData: { [key: string]: string } = {};

      // 답변 데이터를 서버 포맷으로 변환
      cultureFitQuestions.forEach((question, index) => {
        const fieldName =
          cultureFitFieldMapping[
            question.q as keyof typeof cultureFitFieldMapping
          ];
        if (fieldName && cultureAnswers[index]) {
          cultureFitData[fieldName] = cultureAnswers[index] as string;
        }
      });

      // API 호출
      const response = await fetchAPI(`culture-fit/${id}/recommend`, {
        method: "POST",
        body: JSON.stringify(cultureFitData),
      });

      if (!response.ok) {
        throw new Error(`서버 오류: ${response.status}`);
      }

      const result = await response.json();
      console.log("컬처핏 등록 성공:", result);

      // 결과 저장 및 결과 모달 표시
      // API 응답 형식이 문자열이면 객체로 변환
      let resultData: CultureFitResult;
      if (typeof result === "string") {
        resultData = { cultureFitType: result };
      } else {
        resultData = result;
      }

      setCultureResult(resultData);
      setCultureSubmission({
        collaborationStyle: cultureFitData.collaborationStyle || "",
        deadlineAttitude: cultureFitData.deadlineAttitude || "",
        problemSolvingApproach: cultureFitData.problemSolvingApproach || "",
        communicationStyle: cultureFitData.communicationStyle || "",
        conflictResolution: cultureFitData.conflictResolution || "",
        tackDistribution: cultureFitData.tackDistribution || "",
      });

      setIsCultureFitOpen(false);
      setShowResultModal(true);

      // 폼 상태 초기화
      setCultureStep(0);
      setCultureAnswers(
        Array(cultureFitQuestions.length).fill(null) as (string | null)[]
      );
    } catch (error) {
      console.error("컬처핏 등록 중 오류:", error);
      alert("컬처핏 등록 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  // 팀원 목록 가져오기
  const fetchTeamMembers = async () => {
    if (!id) return;

    try {
      const response = await fetchAPI(`posts/${id}/members`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("팀원 정보를 가져오는데 실패했습니다.");
      }

      const data: TeamMember[] = await response.json();
      setExistingTeamMembers(data);
      // 기존 팀원들의 닉네임을 teamMembers 상태에도 설정
      setTeamMembers(data.map((member) => member.nickname));
    } catch (error) {
      console.error("팀원 정보 로딩 중 오류 발생:", error);
      alert("팀원 정보를 불러오는데 실패했습니다.");
    }
  };

  // 팀원 관리 모달이 열릴 때 팀원 목록 가져오기
  const handleTeamModalOpen = () => {
    setIsTeamModalOpen(true);
    fetchTeamMembers();
  };

  const handleDelete = async () => {
    if (!window.confirm("정말로 이 프로젝트를 삭제하시겠습니까?")) return;
    if (!id) return;

    try {
      const response = await fetchAPI(`posts/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("삭제 실패");
      alert("삭제가 완료되었습니다.");
      navigate("/");
    } catch (e) {
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  const handleComplete = async () => {
    if (!id) return;

    try {
      const response = await fetchAPI(`posts/${id}/complete`, {
        method: "PATCH",
        body: JSON.stringify({ githubLink }),
      });
      if (!response.ok) throw new Error("모집 완료 처리 실패");
      alert("모집이 완료되었습니다.");
      setIsCompleteModalOpen(false);
      window.location.reload();
    } catch (e) {
      alert("모집 완료 처리 중 오류가 발생했습니다.");
    }
  };

  if (loading) {
    return (
      <PageContainer>
        <div>로딩 중...</div>
      </PageContainer>
    );
  }

  if (error || !projectData) {
    return (
      <PageContainer>
        <div>
          {error || "프로젝트 정보를 불러오는데 실패했습니다."}
          <Button onClick={handleGoBack} style={{ marginTop: "16px" }}>
            뒤로 가기
          </Button>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <TitleSection>
        <Title>{projectData.title}</Title>
        <MetaInfo>
          <RouterLink
            to={`/profile/${projectData.publicId}`}
            style={{ textDecoration: "none" }}
          >
            <Author style={{ cursor: "pointer" }}>
              <AuthorAvatar>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#8ED11E">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"></path>
                </svg>
              </AuthorAvatar>
              <AuthorName>{projectData.nickname}</AuthorName>
            </Author>
          </RouterLink>
          <DateText>{formatDate(projectData.createdAt)}</DateText>
        </MetaInfo>
      </TitleSection>

      <InfoTable>
        <div>
          <InfoRow>
            <InfoLabel>모집 구분</InfoLabel>
            <InfoValue>{renderRecruitType(projectData.recruitType)}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>모집 인원</InfoLabel>
            <InfoValue>{projectData.recruitMember}명</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>연락 방법</InfoLabel>
            <InfoValue>
              <Link href={projectData.link} target="_blank">
                {renderLinkType(projectData.linkType)}
              </Link>
            </InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>모집 포지션</InfoLabel>
            <InfoValue>
              {projectData.positions.map((position, index) => (
                <Tag key={index}>{position.name}</Tag>
              ))}
            </InfoValue>
          </InfoRow>
        </div>

        <div>
          <InfoRow>
            <InfoLabel>진행 방식</InfoLabel>
            <InfoValue>
              {renderProgressMethod(projectData.progressMethod)}
            </InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>모집 마감</InfoLabel>
            <InfoValue>{projectData.deadline}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>예상 기간</InfoLabel>
            <InfoValue>{renderPeriod(projectData.period)}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>사용 언어</InfoLabel>
            <InfoValue>
              {projectData.techStacks.map((tech, index) => (
                <Tag key={index}>{tech.name}</Tag>
              ))}
            </InfoValue>
          </InfoRow>
        </div>
      </InfoTable>

      {/* 팀원 관리/피어리뷰 버튼 */}
      <ButtonGroup>
        <Button onClick={handleGoBack}>목록으로</Button>
        <ButtonRightGroup>
          <Button onClick={() => navigate(`/recruits/edit/${id}`)}>
            수정하기
          </Button>
          <Button onClick={handleTeamModalOpen}>팀원 관리</Button>
          <Button
            onClick={() => {
              fetchTeamMembers();
              setIsPeerReviewModalOpen(true);
            }}
          >
            피어리뷰 작성
          </Button>
          <Button primary onClick={() => setIsCultureFitOpen(true)}>
            컬처핏 등록
          </Button>
          <CompleteButton onClick={() => setIsCompleteModalOpen(true)}>
            모집 완료
          </CompleteButton>
          <DangerButton onClick={handleDelete}>삭제</DangerButton>
        </ButtonRightGroup>
      </ButtonGroup>

      <ContentSection>
        <SectionTitle>프로젝트 소개</SectionTitle>
        <Content>{projectData.content}</Content>
      </ContentSection>

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
                      key={user.nickname}
                      onClick={() => addTeamMember(user.nickname)}
                    >
                      {user.nickname}
                    </SearchResultItem>
                  ))}
                </SearchResults>
              </TeamSearchContainer>
            </div>
            <div>
              {teamMembers.map((member, index) => {
                const existingMember = existingTeamMembers.find(
                  (m) => m.nickname === member
                );
                return (
                  <TeamMemberTag key={index}>
                    {member}
                    {existingMember?.isOwner && (
                      <span
                        style={{
                          marginLeft: "4px",
                          fontSize: "12px",
                          color: "#666",
                        }}
                      >
                        (팀장)
                      </span>
                    )}
                    {!existingMember?.isOwner && (
                      <RemoveButton onClick={() => removeTeamMember(member)}>
                        ×
                      </RemoveButton>
                    )}
                  </TeamMemberTag>
                );
              })}
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
                  {existingTeamMembers.map((member) => (
                    <option key={member.memberId} value={member.nickname}>
                      {member.nickname}
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

      {/* 컬처핏 등록 모달 */}
      {isCultureFitOpen && (
        <ModalOverlay onClick={() => setIsCultureFitOpen(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalClose onClick={() => setIsCultureFitOpen(false)}>
              &times;
            </ModalClose>
            <ModalTitle>컬처핏 등록</ModalTitle>
            <Question>
              <QuestionTitle>
                {cultureFitQuestions[cultureStep].q}
              </QuestionTitle>
              <QuestionSubtitle>
                {cultureFitQuestions[cultureStep].subq}
              </QuestionSubtitle>
            </Question>
            <AnswerList>
              {cultureFitQuestions[cultureStep].a.map((answer, index) => (
                <AnswerOption
                  key={index}
                  selected={cultureAnswers[cultureStep] === answer}
                  onClick={() => handleCultureAnswer(answer)}
                >
                  <RadioInput
                    type="radio"
                    name={`question-${cultureStep}`}
                    checked={cultureAnswers[cultureStep] === answer}
                    onChange={() => handleCultureAnswer(answer)}
                  />
                  {answer}
                </AnswerOption>
              ))}
            </AnswerList>
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
                  disabled={!cultureAnswers[cultureStep]}
                  onClick={() => setCultureStep(cultureStep + 1)}
                >
                  다음
                </ModalButtonRight>
              ) : (
                <ModalButtonRight
                  type="button"
                  disabled={!cultureAnswers[cultureStep]}
                  onClick={handleCultureSubmit}
                >
                  제출
                </ModalButtonRight>
              )}
            </ModalButtonGroup>
          </ModalContent>
        </ModalOverlay>
      )}

      {/* 컬처핏 결과 모달 */}
      {showResultModal && cultureResult && cultureSubmission && (
        <ModalOverlay onClick={() => setShowResultModal(false)}>
          <ModalContent
            onClick={(e) => e.stopPropagation()}
            style={{ maxHeight: "600px", width: "600px" }}
          >
            <ModalClose onClick={() => setShowResultModal(false)}>
              &times;
            </ModalClose>
            <ModalTitle>컬처핏 결과</ModalTitle>

            <div style={{ marginBottom: "24px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "16px",
                }}
              >
                <h3
                  style={{
                    fontSize: "20px",
                    color: brandColors.primary,
                    margin: 0,
                  }}
                >
                  당신의 컬처핏 유형:
                </h3>
                <span
                  style={{
                    fontWeight: "bold",
                    fontSize: "20px",
                    marginLeft: "12px",
                    color: brandColors.primaryDark,
                  }}
                >
                  {cultureFitTypeDescription[cultureResult.cultureFitType] ||
                    cultureResult.cultureFitType}
                </span>
              </div>
              <div
                style={{
                  fontSize: "15px",
                  lineHeight: "1.6",
                  marginBottom: "20px",
                  background: `${brandColors.primaryLight}30`,
                  padding: "16px",
                  borderRadius: "8px",
                }}
              >
                <p>
                  {cultureFitTypeDetailDescription[
                    cultureResult.cultureFitType
                  ] || ""}
                </p>
                <p
                  style={{ marginTop: "8px", fontSize: "13px", color: "#666" }}
                >
                  문화 유형 코드: {cultureResult.cultureFitType}
                </p>
              </div>

              <h4
                style={{
                  fontSize: "17px",
                  marginTop: "24px",
                  marginBottom: "16px",
                }}
              >
                제출한 답변 정보
              </h4>
              <div
                style={{
                  background: "#f9f9f9",
                  padding: "16px",
                  borderRadius: "8px",
                }}
              >
                <p>
                  <strong>협업 스타일:</strong>{" "}
                  {cultureSubmission.collaborationStyle}
                </p>
                <p>
                  <strong>일정과 마감에 대한 태도:</strong>{" "}
                  {cultureSubmission.deadlineAttitude}
                </p>
                <p>
                  <strong>문제 발생 시 대처 방식:</strong>{" "}
                  {cultureSubmission.problemSolvingApproach}
                </p>
                <p>
                  <strong>의사소통 방식:</strong>{" "}
                  {cultureSubmission.communicationStyle}
                </p>
                <p>
                  <strong>갈등 상황에서의 태도:</strong>{" "}
                  {cultureSubmission.conflictResolution}
                </p>
                <p>
                  <strong>업무 분배에 대한 생각:</strong>{" "}
                  {cultureSubmission.tackDistribution}
                </p>
              </div>
            </div>

            <ModalButton
              onClick={() => setShowResultModal(false)}
              style={{ display: "block", margin: "20px auto 0" }}
            >
              확인
            </ModalButton>
          </ModalContent>
        </ModalOverlay>
      )}

      {/* 모집 완료 모달 */}
      {isCompleteModalOpen && (
        <ModalOverlay onClick={() => setIsCompleteModalOpen(false)}>
          <ModalContent
            onClick={(e) => e.stopPropagation()}
            style={{ width: 400 }}
          >
            <ModalClose onClick={() => setIsCompleteModalOpen(false)}>
              &times;
            </ModalClose>
            <ModalTitle>모집 완료 처리</ModalTitle>
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontWeight: 500, fontSize: 15 }}>
                깃허브 링크
              </label>
              <Input
                type="text"
                value={githubLink}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setGithubLink(e.target.value)
                }
                placeholder="프로젝트 깃허브 링크를 입력하세요"
                style={{ marginTop: 8, width: "100%" }}
              />
            </div>
            <Button primary style={{ width: "100%" }} onClick={handleComplete}>
              제출하기
            </Button>
          </ModalContent>
        </ModalOverlay>
      )}
    </PageContainer>
  );
};

export default ProjectDetailPage;
