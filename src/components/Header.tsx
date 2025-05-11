import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { brandColors } from "../styles/GlobalStyle";
import LoginModal from "./LoginModal";

const HeaderContainer = styled.header`
  width: 100%;
  height: 64px;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  background-color: white;
  z-index: 100;
`;

const HeaderContent = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: ${brandColors.primary};
  font-family: "CookieRun-Regular", sans-serif;
`;

const Navigation = styled.nav`
  display: flex;
  gap: 32px;
  align-items: center;
`;

const NavItem = styled.span`
  font-size: 16px;
  color: #333;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    color: ${brandColors.secondary};
  }
`;

// 프로필 아이콘
const ProfileIcon = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: 2px solid ${brandColors.primary};
  position: relative;
`;

// 사용자 메뉴 드롭다운
const UserMenu = styled.div`
  position: absolute;
  top: 45px;
  right: 0;
  width: 180px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 8px 0;
  z-index: 1000;
`;

const MenuItem = styled.div`
  padding: 10px 16px;
  font-size: 14px;
  color: #333;
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5;
  }
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
  HARMONY: "조화형",
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
  HARMONY:
    "조화와 균형을 중시하며, 팀원들 간의 조화로운 관계를 유지하기 위해 노력합니다. 독립적인 작업 스타일과 팀워크 사이에서 균형을 찾아가며, 갈등을 최소화하고 팀의 전체적인 목표 달성을 위해 협력하는 성향을 가지고 있습니다.",
};

// 컬처핏 질문 데이터
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

// 컬처핏 답변 매핑 (서버 필드명으로 변환)
const cultureFitFieldMapping = {
  "1. 협업 스타일": "collaborationStyle",
  "2. 일정과 마감에 대한 태도": "deadlineAttitude",
  "3. 문제 발생 시 대처 방식": "problemSolvingApproach",
  "4. 의사소통 방식": "communicationStyle",
  "5. 갈등 상황에서의 태도": "conflictResolution",
  "6. 업무 분배에 대한 생각": "tackDistribution",
};

const Header: React.FC = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // 컬처핏 상태
  const [isCultureFitOpen, setIsCultureFitOpen] = useState(false);
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

  // 로그인 상태 확인
  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem("token");
      if (!!token !== isLoggedIn) {
        setIsLoggedIn(!!token);
        console.log("로그인 상태 변경:", !!token);
      }
    };

    // 페이지 접속 시마다 확인
    checkLoginStatus();

    // 로컬 스토리지 변경 이벤트 리스너 추가
    window.addEventListener("storage", checkLoginStatus);

    // 로그인 이벤트 처리
    const handleLoginEvent = () => {
      console.log("로그인 이벤트 감지");
      checkLoginStatus();
    };

    // 커스텀 이벤트 리스너 추가
    window.addEventListener("login-success", handleLoginEvent);

    // 주기적으로 확인 (1초마다)
    const intervalId = setInterval(checkLoginStatus, 1000);

    // 컴포넌트가 언마운트될 때 이벤트 리스너와 인터벌 제거
    return () => {
      window.removeEventListener("storage", checkLoginStatus);
      window.removeEventListener("login-success", handleLoginEvent);
      clearInterval(intervalId);
    };
  }, [location.pathname, isLoggedIn]); // location과 로그인 상태 변경 시 확인

  const handleLoginClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLoginModalOpen(true);
  };

  const handleProfileClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMyPageClick = () => {
    setIsMenuOpen(false);
    navigate("/mypage");
  };

  const handleSettingsClick = () => {
    setIsMenuOpen(false);
    navigate("/settings");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setIsMenuOpen(false);
    navigate("/");
  };

  // 컬처핏 모달 열기
  const handleOpenCultureFit = () => {
    setCultureStep(0);
    setCultureAnswers(
      Array(cultureFitQuestions.length).fill(null) as (string | null)[]
    );
    setIsCultureFitOpen(true);
  };

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

      // 토큰 가져오기
      const token = localStorage.getItem("token");
      if (!token) {
        alert("로그인이 필요합니다.");
        return;
      }

      // API 호출
      const response = await fetch(
        "http://localhost:8080/api/v1/culture-fit/preview",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(cultureFitData),
        }
      );

      if (!response.ok) {
        throw new Error(`서버 오류: ${response.status}`);
      }

      const result = await response.json();
      console.log("컬처핏 결과:", result);

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

  return (
    <>
      <HeaderContainer>
        <HeaderContent>
          <Link to="/">
            <Logo>Eum</Logo>
          </Link>
          <Navigation>
            <Link to="/teams">
              <NavItem>팀원 모집</NavItem>
            </Link>
            {isLoggedIn && (
              <NavItem onClick={handleOpenCultureFit}>나의 컬처핏</NavItem>
            )}
            {isLoggedIn ? (
              <ProfileIcon onClick={handleProfileClick}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill={brandColors.primary}
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                </svg>
                {isMenuOpen && (
                  <UserMenu>
                    <MenuItem onClick={handleMyPageClick}>마이페이지</MenuItem>
                    <MenuItem onClick={handleSettingsClick}>설정</MenuItem>
                    <MenuItem onClick={handleLogout}>로그아웃</MenuItem>
                  </UserMenu>
                )}
              </ProfileIcon>
            ) : (
              <NavItem onClick={handleLoginClick}>로그인</NavItem>
            )}
          </Navigation>
        </HeaderContent>
      </HeaderContainer>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => {
          setIsLoginModalOpen(false);
          // 모달이 닫힐 때 로그인 상태 다시 확인
          const token = localStorage.getItem("token");
          setIsLoggedIn(!!token);
        }}
      />

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
    </>
  );
};

export default Header;
