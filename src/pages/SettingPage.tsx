import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { brandColors } from "../styles/GlobalStyle";
import { fetchAPI } from "../config/apiConfig";
import {
  showAlert,
  showSuccess,
  showError,
  showConfirm,
} from "../utils/sweetAlert";

// 전체 컨테이너
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

// 입력 필드 컨테이너
const FormField = styled.div`
  margin-bottom: 20px;
  width: 100%;
`;

// 필드 라벨
const Label = styled.label`
  display: block;
  font-size: 14px;
  margin-bottom: 8px;
  color: #555;
  font-weight: 500;

  &::after {
    content: " *";
    color: #e74c3c;
  }
`;

// 텍스트 입력
const TextInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: #3498db;
  }
`;

// 드롭다운 컨테이너
const SelectContainer = styled.div`
  position: relative;
  width: 100%;
`;

// 드롭다운 선택
const Select = styled.div`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;

  &:after {
    content: ">";
    transform: rotate(90deg);
    color: #999;
  }
`;

// 드롭다운 메뉴
const DropdownMenu = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-top: 4px;
  z-index: 10;
  display: ${(props) => (props.isOpen ? "block" : "none")};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

// 드롭다운 아이템
const DropdownItem = styled.div`
  padding: 12px 16px;
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5;
  }
`;

// 라디오 버튼 그룹
const RadioGroup = styled.div`
  display: flex;
  align-items: center;
  margin-top: 4px;
`;

// 라디오 옵션
const RadioOption = styled.div`
  display: flex;
  align-items: center;
  margin-right: 16px;
`;

// 라디오 버튼 커스텀 스타일링
const RadioButton = styled.input`
  margin-right: 4px;
`;

// 텍스트 영역
const TextArea = styled.textarea`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  min-height: 100px;
  resize: none;

  &:focus {
    outline: none;
    border-color: #3498db;
  }
`;

// 태그 선택 영역
const TagsSection = styled.div`
  margin-bottom: 20px;
`;

// 태그 목록 컨테이너
const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
  margin-bottom: 16px;
`;

// 선택된 태그
const SelectedTag = styled.div`
  display: inline-flex;
  align-items: center;
  background-color: ${brandColors.primaryLight};
  color: ${brandColors.primaryText};
  padding: 4px 12px;
  border-radius: 20px;
  margin-right: 8px;
  margin-bottom: 8px;
  font-size: 14px;
`;

// 선택 가능한 태그
const TagOption = styled.div<{ isSelected: boolean }>`
  display: inline-flex;
  align-items: center;
  background-color: ${(props) =>
    props.isSelected ? brandColors.primaryLight : "#f5f5f5"};
  color: ${(props) => (props.isSelected ? brandColors.primaryText : "#555")};
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;
  border: ${(props) =>
    props.isSelected
      ? `1px solid ${brandColors.primary}`
      : "1px solid transparent"};

  &:hover {
    background-color: ${(props) =>
      props.isSelected ? brandColors.primaryLight : "#ebebeb"};
  }
`;

// 태그 삭제 버튼
const RemoveTag = styled.span`
  margin-left: 6px;
  cursor: pointer;
  color: #999;
`;

// 태그 섹션 토글 버튼
const ToggleTagsButton = styled.button`
  background: none;
  border: none;
  color: ${brandColors.secondary};
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-top: 8px;

  &::before {
    content: "${(props) => (props.className === "expanded" ? "−" : "+")}";
    margin-right: 4px;
    font-size: 16px;
  }
`;

// 제출 버튼
const SubmitButton = styled.button`
  width: 100%;
  padding: 14px;
  background-color: ${brandColors.primary};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 20px;

  &:hover {
    background-color: ${brandColors.primaryDark};
  }
`;

// 취소 링크
const CancelLink = styled.div`
  text-align: center;
  color: #7f8c8d;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

// 포지션 ID 매핑 객체
const positionIdMap: { [key: string]: number } = {
  프론트엔드: 1,
  백엔드: 2,
  디자이너: 3,
  IOS: 4,
  안드로이드: 5,
  데브옵스: 6,
  PM: 7,
  기획자: 8,
  마케터: 9,
};

// 기술 스택 ID 매핑 객체
const techStackIdMap: { [key: string]: number } = {
  JavaScript: 1,
  TypeScript: 2,
  React: 3,
  Vue: 4,
  Nodejs: 5,
  Spring: 6,
  Java: 7,
  Nextjs: 8,
  Nestjs: 9,
  Express: 10,
  Go: 11,
  C: 12,
  Python: 13,
  Django: 14,
  Swift: 15,
  Kotlin: 16,
  MySQL: 17,
  MongoDB: 18,
  PHP: 19,
  GraphQL: 20,
  Firebase: 21,
  ReactNative: 22,
  Unity: 23,
  Flutter: 24,
  AWS: 25,
  Kubernetes: 26,
  Docker: 27,
  Git: 28,
  Figma: 29,
  Zeplin: 30,
  Jest: 31,
  Svelte: 32,
};

// 사용자 프로필 데이터 타입 정의
interface UserProfile {
  nickname: string;
  career: string;
  shortDescription: string;
  profileImageUrl: string | null;
  position: string;
  techStacks: string[];
}

const SettingPage: React.FC = () => {
  const navigate = useNavigate();

  // 상태 관리
  const [nickname, setNickname] = useState("");
  const [position, setPosition] = useState("");
  const [level, setLevel] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [showTagOptions, setShowTagOptions] = useState(false);

  // API 로딩 상태
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  // 드롭다운 상태
  const [isPositionOpen, setIsPositionOpen] = useState(false);
  const [isLevelOpen, setIsLevelOpen] = useState(false);

  // 직무 옵션
  const positionOptions = [
    "프론트엔드",
    "백엔드",
    "디자이너",
    "IOS",
    "안드로이드",
    "데브옵스",
    "PM",
    "기획자",
    "마케터",
  ];

  // 경력 옵션
  const levelOptions = [
    "신입",
    "0년",
    "1년",
    "2년",
    "3년",
    "4년",
    "5년",
    "6년",
    "7년",
    "8년",
    "9년",
    "10년 이상",
  ];

  // 관심분야 태그 목록
  const tagOptions = [
    "JavaScript",
    "TypeScript",
    "React",
    "Vue",
    "Nodejs",
    "Spring",
    "Java",
    "Nextjs",
    "Nestjs",
    "Express",
    "Go",
    "C",
    "Python",
    "Django",
    "Swift",
    "Kotlin",
    "MySQL",
    "MongoDB",
    "PHP",
    "GraphQL",
    "Firebase",
    "ReactNative",
    "Unity",
    "Flutter",
    "AWS",
    "Kubernetes",
    "Docker",
    "Git",
    "Figma",
    "Zeplin",
    "Jest",
    "Svelte",
  ];

  // 드롭다운 바깥 클릭 감지를 위한 refs
  const positionRef = useRef<HTMLDivElement>(null);
  const levelRef = useRef<HTMLDivElement>(null);

  // 선택한 프로필 공개 여부
  const [isPublic, setIsPublic] = useState(true);

  // API로 사용자 프로필 데이터 가져오기
  useEffect(() => {
    const fetchProfileData = async () => {
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
        console.log("Fetched profile data:", data);

        // 응답 값이 비어있거나 "UNDEFINED" 문자열일 경우 처리
        const formatValue = (value: string | null | undefined): string => {
          if (
            !value ||
            value === "" ||
            value === "UNDEFINED" ||
            value === "undefined"
          ) {
            return "";
          }
          return value;
        };

        // 폼 데이터에 API 응답 반영
        setNickname(formatValue(data.nickname));
        setPosition(formatValue(data.position));
        setLevel(formatValue(data.career));
        setIntroduction(formatValue(data.shortDescription));

        // 태그 설정
        if (Array.isArray(data.techStacks) && data.techStacks.length > 0) {
          setTags(data.techStacks);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        setError("프로필 정보를 불러오는데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [navigate]);

  // 폼 제출 처리
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 입력 값 검증
    if (!nickname.trim()) {
      showAlert("닉네임을 입력해주세요.");
      return;
    }

    if (!position) {
      showAlert("직무를 선택해주세요.");
      return;
    }

    if (!level) {
      showAlert("경력을 선택해주세요.");
      return;
    }

    // 태그 없으면 경고만 표시하고 진행 (필수가 아닐 수 있으므로)
    if (tags.length === 0) {
      const result = await showConfirm(
        "관심분야가 선택되지 않았습니다. 계속 진행하시겠습니까?"
      );
      if (!result.isConfirmed) return;
    }

    try {
      setIsSaving(true);
      setSaveSuccess(false);

      // 포지션 ID와 기술스택 ID 변환
      const positionId = positionIdMap[position] || 0;
      const techStackIds = tags
        .map((tag) => techStackIdMap[tag] || 0)
        .filter((id) => id > 0);

      // 요청 데이터 구성
      const profileData = {
        nickname,
        career: level,
        shortDescription: introduction,
        positionId,
        techStackIds,
      };

      console.log("프로필 저장 요청 데이터:", profileData);

      const response = await fetchAPI("members/profile", {
        method: "PUT",
        body: JSON.stringify(profileData),
      });

      if (!response.ok) {
        console.error("응답 상태:", response.status);
        const errorData = await response.text();
        console.error("에러 응답:", errorData);
        throw new Error("프로필 저장에 실패했습니다");
      }

      console.log("프로필 저장 성공!");
      setSaveSuccess(true);

      // 성공 메시지 표시 후 홈으로 이동
      showSuccess("프로필이 성공적으로 저장되었습니다!");
      navigate("/mypage");
    } catch (err) {
      console.error("프로필 저장 오류:", err);
      showError(
        err instanceof Error
          ? err.message
          : "프로필 저장 중 오류가 발생했습니다"
      );
    } finally {
      setIsSaving(false);
    }
  };

  // 태그 토글 (추가/제거)
  const toggleTag = (tag: string) => {
    if (tags.includes(tag)) {
      setTags(tags.filter((t) => t !== tag));
    } else {
      setTags([...tags, tag]);
    }
  };

  // 태그 삭제
  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  // 드롭다운 바깥 클릭 감지를 위한 이벤트 핸들러
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        positionRef.current &&
        !positionRef.current.contains(event.target as Node)
      ) {
        setIsPositionOpen(false);
      }
      if (
        levelRef.current &&
        !levelRef.current.contains(event.target as Node)
      ) {
        setIsLevelOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // 취소 처리
  const handleCancel = () => {
    // 사용자에게 확인
    showConfirm("변경 사항이 저장되지 않습니다. 홈으로 이동하시겠습니까?").then(
      (result) => {
        if (result.isConfirmed) {
          navigate("/");
        }
      }
    );
  };

  if (loading) {
    return <div>프로필을 불러오는 중...</div>;
  }

  if (error) {
    return <div>프로필을 불러오는데 문제가 발생했습니다: {error}</div>;
  }

  return (
    <PageContainer>
      <ProfileSection>
        <ProfileImage>
          <svg width="60" height="60" viewBox="0 0 24 24" fill="#FFE500">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
          </svg>
          <Badge>K</Badge>
        </ProfileImage>
        <WelcomeMessage>{nickname}님 환영해요.</WelcomeMessage>
      </ProfileSection>

      <form onSubmit={handleSubmit}>
        <FormField>
          <Label htmlFor="nickname">닉네임</Label>
          <TextInput
            id="nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="닉네임을 입력해주세요"
          />
        </FormField>

        <FormField>
          <Label htmlFor="position">직무</Label>
          <SelectContainer ref={positionRef}>
            <Select onClick={() => setIsPositionOpen(!isPositionOpen)}>
              {position || "직무를 선택해주세요"}
            </Select>
            <DropdownMenu isOpen={isPositionOpen}>
              {positionOptions.map((option) => (
                <DropdownItem
                  key={option}
                  onClick={() => {
                    setPosition(option);
                    setIsPositionOpen(false);
                  }}
                >
                  {option}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </SelectContainer>
        </FormField>

        <FormField>
          <Label>소속</Label>
          <RadioGroup>
            <RadioOption>
              <RadioButton
                type="radio"
                id="public"
                name="visibility"
                checked={isPublic}
                onChange={() => setIsPublic(true)}
              />
              <label htmlFor="public">공개</label>
            </RadioOption>
            <RadioOption>
              <RadioButton
                type="radio"
                id="private"
                name="visibility"
                checked={!isPublic}
                onChange={() => setIsPublic(false)}
              />
              <label htmlFor="private">비공개</label>
            </RadioOption>
          </RadioGroup>
          <TextInput
            placeholder="소속을 입력해주세요(ex: 회사 직장, 대학 대학교...)"
            style={{ marginTop: "8px" }}
          />
        </FormField>

        <FormField>
          <Label htmlFor="level">경력</Label>
          <SelectContainer ref={levelRef}>
            <Select onClick={() => setIsLevelOpen(!isLevelOpen)}>
              {level || "경력을 선택해주세요"}
            </Select>
            <DropdownMenu isOpen={isLevelOpen}>
              {levelOptions.map((option) => (
                <DropdownItem
                  key={option}
                  onClick={() => {
                    setLevel(option);
                    setIsLevelOpen(false);
                  }}
                >
                  {option}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </SelectContainer>
        </FormField>

        <FormField>
          <Label htmlFor="introduction">자기소개</Label>
          <TextArea
            id="introduction"
            value={introduction}
            onChange={(e) => setIntroduction(e.target.value)}
            placeholder="자기소개를 입력해주세요"
          />
        </FormField>

        <TagsSection>
          <Label>관심분야</Label>
          <TagsContainer>
            {tags.map((tag) => (
              <SelectedTag key={tag}>
                {tag} <RemoveTag onClick={() => removeTag(tag)}>×</RemoveTag>
              </SelectedTag>
            ))}
          </TagsContainer>

          <ToggleTagsButton
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setShowTagOptions(!showTagOptions);
            }}
            className={showTagOptions ? "expanded" : ""}
            type="button"
          >
            {showTagOptions ? "관심분야 접기" : "관심분야 펼치기"}
          </ToggleTagsButton>

          {showTagOptions && (
            <TagsContainer>
              {tagOptions.map((option) => (
                <TagOption
                  key={option}
                  isSelected={tags.includes(option)}
                  onClick={() => toggleTag(option)}
                >
                  {option}
                </TagOption>
              ))}
            </TagsContainer>
          )}
        </TagsSection>

        <SubmitButton type="submit" disabled={isSaving}>
          {isSaving ? "저장 중..." : "프로필 저장"}
        </SubmitButton>
        <CancelLink onClick={handleCancel}>취소</CancelLink>
      </form>
    </PageContainer>
  );
};

export default SettingPage;
