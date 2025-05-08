import React, { useState } from "react";
import styled from "styled-components";
import { brandColors } from "../styles/GlobalStyle";
import { useNavigate } from "react-router-dom";

// 섹션 타이틀
const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 700;
  color: ${brandColors.primary};
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: "CookieRun-Regular", sans-serif;
`;

const SectionNumber = styled.span`
  background: ${brandColors.primary};
  color: #fff;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  font-weight: 700;
`;

const FormContainer = styled.div`
  max-width: 800px;
  margin: 40px auto;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  padding: 40px 32px 32px 32px;
`;

const Row = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
`;

const Column = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #222;
`;

const Select = styled.select`
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 15px;
  background: #fafbfc;
  margin-bottom: 0;
`;

const Input = styled.input`
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 15px;
  background: #fafbfc;
`;

const DateInput = styled(Input)`
  width: 100%;
`;

const TextArea = styled.textarea`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 15px;
  min-height: 120px;
  resize: vertical;
  background: #fafbfc;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 32px;
`;

const Button = styled.button<{ primary?: boolean }>`
  padding: 12px 32px;
  border-radius: 6px;
  border: none;
  font-size: 16px;
  font-weight: 600;
  background: ${({ primary }) => (primary ? brandColors.primary : "#f5f5f5")};
  color: ${({ primary }) => (primary ? "#fff" : "#222")};
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: ${({ primary }) =>
      primary ? brandColors.primaryDark : "#ececec"};
  }
`;

const EditorBox = styled.div`
  border: 1px solid #ddd;
  border-radius: 6px;
  background: #fafbfc;
  margin-top: 8px;
`;

const HorizontalRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
`;

const TitleInput = styled(Input)`
  flex: 1;
  margin-bottom: 0;
`;

const ContentTextArea = styled(TextArea)`
  flex: 1;
  margin-bottom: 0;
`;

// SettingPage.tsx에서 가져온 옵션
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

// 진행 방식 enum 매핑
const progressMethodMap: { [key: string]: string } = {
  온라인: "ONLINE",
  오프라인: "OFFLINE",
  "온라인/오프라인": "ALL",
};

// 기간 enum 매핑
const periodMap: { [key: string]: string } = {
  "1개월": "MONTH_1",
  "3개월": "MONTH_3",
  "6개월": "MONTH_6",
  "6개월 이상": "MONTH_6_MORE",
  "기간 미정~6개월 이상": "MONTH_6_MORE",
};

// 연락 방법 enum 매핑
const linkTypeMap: { [key: string]: string } = {
  오픈톡: "KAKAO",
  이메일: "EMAIL",
  구글폼: "GOOGLE",
};

// 구분 enum 매핑
const recruitTypeMap: { [key: string]: string } = {
  스터디: "STUDY",
  프로젝트: "PROJECT",
  "스터디/프로젝트": "PROJECT",
};

const TagSelectContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
  margin-bottom: 8px;
`;
const TagOption = styled.div<{ selected: boolean }>`
  display: inline-flex;
  align-items: center;
  background-color: ${({ selected }) =>
    selected ? brandColors.primaryLight : "#f5f5f5"};
  color: ${({ selected }) => (selected ? brandColors.primaryText : "#555")};
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;
  border: ${({ selected }) =>
    selected ? `1px solid ${brandColors.primary}` : "1px solid transparent"};
  &:hover {
    background-color: ${({ selected }) =>
      selected ? brandColors.primaryLight : "#ebebeb"};
  }
`;
const SelectedTag = styled.div`
  display: inline-flex;
  align-items: center;
  background-color: ${brandColors.primaryLight};
  color: ${brandColors.primaryText};
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 14px;
  margin-right: 8px;
  margin-bottom: 8px;
`;
const RemoveTag = styled.span`
  margin-left: 6px;
  cursor: pointer;
  color: #999;
`;

// 메인 컴포넌트
const RecruitFormPage: React.FC = () => {
  const navigate = useNavigate();
  // 상태 관리 (실제 서비스에서는 useForm 등 라이브러리 사용 권장)
  const [form, setForm] = useState({
    type: "스터디/프로젝트",
    people: "인원 미정~10명 이상",
    method: "온라인/오프라인",
    period: "기간 미정~6개월 이상",
    stack: "프로젝트 사용 스택",
    deadline: "",
    position: "프론트엔드, 백엔드...",
    contact: "카카오톡/메일",
    openChat: "",
    title: "",
    description: "",
  });

  const [selectedStacks, setSelectedStacks] = useState<string[]>([]);
  const [selectedPositions, setSelectedPositions] = useState<string[]>([]);
  const [contactType, setContactType] = useState<string>("오픈톡");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // 입력값 변경 핸들러
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // 태그 토글 함수
  const toggleStack = (tag: string) => {
    setSelectedStacks((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };
  const removeStack = (tag: string) => {
    setSelectedStacks((prev) => prev.filter((t) => t !== tag));
  };
  const togglePosition = (pos: string) => {
    setSelectedPositions((prev) =>
      prev.includes(pos) ? prev.filter((t) => t !== pos) : [...prev, pos]
    );
  };
  const removePosition = (pos: string) => {
    setSelectedPositions((prev) => prev.filter((t) => t !== pos));
  };

  // 등록 버튼 클릭 핸들러
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 필수 값 검증
    if (!form.title.trim()) {
      alert("제목을 입력해주세요.");
      return;
    }

    if (!form.description.trim()) {
      alert("내용을 입력해주세요.");
      return;
    }

    if (!form.deadline) {
      alert("모집 마감일을 선택해주세요.");
      return;
    }

    if (selectedStacks.length === 0) {
      alert("기술 스택을 하나 이상 선택해주세요.");
      return;
    }

    if (selectedPositions.length === 0) {
      alert("모집 포지션을 하나 이상 선택해주세요.");
      return;
    }

    if (!form.openChat.trim()) {
      alert("연락 방법을 입력해주세요.");
      return;
    }

    // 인원 수 변환
    let recruitMember = 0;
    if (form.people === "인원 미정~10명 이상" || form.people === "10+") {
      recruitMember = 10;
    } else {
      recruitMember = parseInt(form.people.replace("명", ""), 10);
    }

    try {
      setIsSubmitting(true);
      setError(null);

      // 기술 스택과 포지션 ID 변환
      const techStackIds = selectedStacks.map((stack) => techStackIdMap[stack]);
      const positionIds = selectedPositions.map(
        (position) => positionIdMap[position]
      );

      // 서버로 보낼 데이터 준비
      const postData = {
        title: form.title,
        content: form.description,
        recruitType: recruitTypeMap[form.type] || "PROJECT",
        recruitMember: recruitMember,
        progressMethod: progressMethodMap[form.method] || "ALL",
        period: periodMap[form.period] || "MONTH_6_MORE",
        deadline: form.deadline,
        linkType: linkTypeMap[contactType] || "KAKAO",
        link: form.openChat,
        techStackIds: techStackIds,
        positionIds: positionIds,
      };

      // 토큰 가져오기
      const token = localStorage.getItem("token");
      if (!token) {
        alert("로그인이 필요합니다.");
        navigate("/");
        return;
      }

      // API 요청
      const response = await fetch("/api/v1/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-USER-ID": "1",
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error(`서버 오류: ${response.status}`);
      }

      const result = await response.json();
      console.log("등록 성공:", result);

      alert("등록이 완료되었습니다!");
      // 등록 후 홈페이지로 이동
      navigate("/");
    } catch (err) {
      console.error("등록 중 오류 발생:", err);
      setError("등록 중 오류가 발생했습니다. 다시 시도해주세요.");
      alert("등록 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <SectionTitle>
          <SectionNumber>1</SectionNumber>
          프로젝트 기본 정보를 입력해주세요.
        </SectionTitle>
        <Row>
          <Column>
            <Label>모집 구분</Label>
            <Select name="type" value={form.type} onChange={handleChange}>
              <option>스터디/프로젝트</option>
              <option>스터디</option>
              <option>프로젝트</option>
            </Select>
          </Column>
          <Column>
            <Label>모집 인원</Label>
            <Select name="people" value={form.people} onChange={handleChange}>
              {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                <option key={num} value={num}>
                  {num}명
                </option>
              ))}
              <option value="10+">10명 이상</option>
            </Select>
          </Column>
        </Row>
        <Row>
          <Column>
            <Label>진행 방식</Label>
            <Select name="method" value={form.method} onChange={handleChange}>
              <option>온라인/오프라인</option>
              <option>온라인</option>
              <option>오프라인</option>
            </Select>
          </Column>
          <Column>
            <Label>진행 기간</Label>
            <Select name="period" value={form.period} onChange={handleChange}>
              <option>기간 미정~6개월 이상</option>
              <option>1개월</option>
              <option>3개월</option>
              <option>6개월</option>
              <option>6개월 이상</option>
            </Select>
          </Column>
        </Row>
        <Row>
          <Column>
            <Label>기술 스택</Label>
            <Select
              value=""
              onChange={(e) => {
                const value = e.target.value;
                if (value && !selectedStacks.includes(value)) {
                  setSelectedStacks([...selectedStacks, value]);
                }
              }}
            >
              <option value="">기술 스택 선택</option>
              {tagOptions
                .filter((tag) => !selectedStacks.includes(tag))
                .map((tag) => (
                  <option key={tag} value={tag}>
                    {tag}
                  </option>
                ))}
            </Select>
            <TagSelectContainer>
              {selectedStacks.map((tag) => (
                <SelectedTag key={tag}>
                  {tag}
                  <RemoveTag onClick={() => removeStack(tag)}>×</RemoveTag>
                </SelectedTag>
              ))}
            </TagSelectContainer>
          </Column>
          <Column>
            <Label>모집 마감일</Label>
            <DateInput
              type="date"
              name="deadline"
              value={form.deadline}
              onChange={handleChange}
            />
          </Column>
        </Row>
        <Row>
          <Column>
            <Label>모집 포지션</Label>
            <Select
              value=""
              onChange={(e) => {
                const value = e.target.value;
                if (value && !selectedPositions.includes(value)) {
                  setSelectedPositions([...selectedPositions, value]);
                }
              }}
            >
              <option value="">포지션 선택</option>
              {positionOptions
                .filter((pos) => !selectedPositions.includes(pos))
                .map((pos) => (
                  <option key={pos} value={pos}>
                    {pos}
                  </option>
                ))}
            </Select>
            <TagSelectContainer>
              {selectedPositions.map((pos) => (
                <SelectedTag key={pos}>
                  {pos}
                  <RemoveTag onClick={() => removePosition(pos)}>×</RemoveTag>
                </SelectedTag>
              ))}
            </TagSelectContainer>
          </Column>
          <Column>
            <Label>연락 방법</Label>
            <Select
              name="contact"
              value={contactType}
              onChange={(e) => setContactType(e.target.value)}
            >
              <option value="오픈톡">오픈톡</option>
              <option value="이메일">이메일</option>
              <option value="구글폼">구글폼</option>
            </Select>
            <Input
              name="openChat"
              value={form.openChat}
              onChange={handleChange}
              placeholder={
                contactType === "오픈톡"
                  ? "오픈 카톡방 링크"
                  : contactType === "이메일"
                  ? "이메일 주소"
                  : "구글 폼 주소"
              }
              style={{ marginTop: 8 }}
            />
          </Column>
        </Row>

        <SectionTitle style={{ marginTop: 32 }}>
          <SectionNumber>2</SectionNumber>
          프로젝트에 대해 소개해주세요.
        </SectionTitle>
        <HorizontalRow>
          <Label style={{ minWidth: 60 }}>제목</Label>
          <TitleInput
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="글 제목을 입력해주세요!"
          />
        </HorizontalRow>
        <HorizontalRow>
          <Label style={{ minWidth: 60, alignSelf: "flex-start" }}>내용</Label>
          <ContentTextArea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="글 내용을 입력해주세요!"
            style={{ minHeight: 120 }}
          />
        </HorizontalRow>
        <ButtonRow>
          <Button type="button" onClick={() => navigate("/teams")}>
            취소
          </Button>
          <Button type="submit" primary disabled={isSubmitting}>
            {isSubmitting ? "등록 중..." : "등록하기"}
          </Button>
        </ButtonRow>
        {error && (
          <div style={{ color: "red", marginTop: "10px" }}>{error}</div>
        )}
      </form>
    </FormContainer>
  );
};

export default RecruitFormPage;
