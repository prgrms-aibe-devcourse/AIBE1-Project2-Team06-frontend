import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { brandColors } from "../styles/GlobalStyle";
import { useNavigate, useParams } from "react-router-dom";
import { fetchAPI } from "../config/apiConfig";

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

// 포지션 옵션
const positionOptions: string[] = [
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

// 기술 스택 옵션
const tagOptions: string[] = [
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

// 태그 선택 스타일 컴포넌트 추가
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
const RemoveTag = styled.span`
  margin-left: 6px;
  cursor: pointer;
  color: #999;
`;

// 태그 스타일(선택된 값 표시용)
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

const linkTypeMap: { [key: string]: string } = {
  오픈톡: "KAKAO",
  이메일: "EMAIL",
  구글폼: "GOOGLE",
};

const RecruitEditPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState({
    type: "스터디/프로젝트",
    people: "1명",
    title: "",
    content: "",
    position: [] as string[],
    techStack: [] as string[],
    progressMethod: "",
    period: "",
    contactMethod: "",
    contactDetail: "",
    startDate: "",
    endDate: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [originalPositions, setOriginalPositions] = useState<any[]>([]);

  useEffect(() => {
    const fetchRecruitData = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const response = await fetchAPI(`posts/${id}`, {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error("모집글 데이터를 가져오는데 실패했습니다.");
        }

        const data = await response.json();
        console.log("불러온 모집글 데이터:", data);

        setOriginalPositions(data.positions || []);

        let peopleValue =
          data.recruitMember >= 10 ? "10명 이상" : `${data.recruitMember}명`;
        let typeValue =
          data.recruitType === "STUDY"
            ? "스터디"
            : data.recruitType === "PROJECT"
            ? "프로젝트"
            : "스터디/프로젝트";

        setFormData({
          type: typeValue,
          people: peopleValue,
          title: data.title,
          content: data.content,
          position: data.positions.map((pos: any) => pos.name),
          techStack: data.techStacks.map((tech: any) => tech.name),
          progressMethod:
            data.progressMethod === "ALL"
              ? "온라인/오프라인"
              : data.progressMethod === "ONLINE"
              ? "온라인"
              : "오프라인",
          period:
            data.period === "MONTH_1"
              ? "1개월"
              : data.period === "MONTH_3"
              ? "3개월"
              : data.period === "MONTH_6"
              ? "6개월"
              : "6개월 이상",
          contactMethod:
            data.linkType === "KAKAO"
              ? "오픈톡"
              : data.linkType === "EMAIL"
              ? "이메일"
              : data.linkType === "GOOGLE"
              ? "구글폼"
              : "기타",
          contactDetail: data.link,
          startDate: new Date().toISOString().split("T")[0],
          endDate: data.deadline,
        });
      } catch (error) {
        console.error("모집글 데이터 로딩 오류:", error);
        setError("모집글 정보를 불러오는데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecruitData();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleStack = (tag: string) => {
    setFormData((prev) => ({
      ...prev,
      techStack: prev.techStack.includes(tag)
        ? prev.techStack.filter((t) => t !== tag)
        : [...prev.techStack, tag],
    }));
  };

  const removeStack = (tag: string) => {
    setFormData((prev) => ({
      ...prev,
      techStack: prev.techStack.filter((t) => t !== tag),
    }));
  };

  const togglePosition = (pos: string) => {
    setFormData((prev) => ({
      ...prev,
      position: prev.position.includes(pos)
        ? prev.position.filter((p) => p !== pos)
        : [...prev.position, pos],
    }));
  };

  const removePosition = (pos: string) => {
    setFormData((prev) => ({
      ...prev,
      position: prev.position.filter((p) => p !== pos),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const requestData = {
        title: formData.title,
        content: formData.content,
        recruitType:
          formData.type === "스터디"
            ? "STUDY"
            : formData.type === "프로젝트"
            ? "PROJECT"
            : "PROJECT",
        recruitMember:
          formData.people === "10명 이상"
            ? 10
            : parseInt(formData.people.replace("명", ""), 10),
        progressMethod: progressMethodMap[formData.progressMethod],
        period: periodMap[formData.period],
        deadline: formData.endDate,
        linkType: linkTypeMap[formData.contactMethod],
        link: formData.contactDetail,
        techStackIds: formData.techStack.map((tech) => techStackIdMap[tech]),
        positionIds: formData.position.map((pos) => {
          const originalPosition = originalPositions.find(
            (p) => p.name === pos
          );
          if (originalPosition) {
            return originalPosition.id;
          }
          return positionIdMap[pos];
        }),
      };

      console.log("PUT 요청 데이터:", requestData);

      const response = await fetchAPI(`posts/${id}`, {
        method: "PUT",
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error("모집글 수정에 실패했습니다.");
      }

      alert("모집글이 성공적으로 수정되었습니다.");
      navigate(`/project/${id}`);
    } catch (error) {
      console.error("모집글 수정에 실패했습니다:", error);
      alert("모집글 수정에 실패했습니다.");
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
            <Select
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
            >
              <option>스터디/프로젝트</option>
              <option>스터디</option>
              <option>프로젝트</option>
            </Select>
          </Column>
          <Column>
            <Label>모집 인원</Label>
            <Select
              name="people"
              value={formData.people}
              onChange={handleChange}
              required
            >
              {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                <option key={num} value={`${num}명`}>
                  {num}명
                </option>
              ))}
              <option value="10명 이상">10명 이상</option>
            </Select>
          </Column>
        </Row>
        <Row>
          <Column>
            <Label>진행 방식</Label>
            <Select
              name="progressMethod"
              value={formData.progressMethod}
              onChange={handleChange}
              required
            >
              <option>온라인/오프라인</option>
              <option>온라인</option>
              <option>오프라인</option>
            </Select>
          </Column>
          <Column>
            <Label>진행 기간</Label>
            <Select
              name="period"
              value={formData.period}
              onChange={handleChange}
              required
            >
              <option>1개월</option>
              <option>3개월</option>
              <option>6개월</option>
              <option>6개월 이상</option>
              <option>기간 미정~6개월 이상</option>
            </Select>
          </Column>
        </Row>
        <Row>
          <Column>
            <Label>기술 스택</Label>
            <Select
              name="techStackSelect"
              value=""
              onChange={(e) => {
                const value = e.target.value;
                if (value && !formData.techStack.includes(value)) {
                  setFormData((prev) => ({
                    ...prev,
                    techStack: [...prev.techStack, value],
                  }));
                }
              }}
            >
              <option value="" disabled>
                기술 스택 선택
              </option>
              {tagOptions.map((tag) => (
                <option
                  key={tag}
                  value={tag}
                  disabled={formData.techStack.includes(tag)}
                >
                  {tag}
                </option>
              ))}
            </Select>
            <div style={{ marginTop: "8px" }}>
              {formData.techStack.map((tag) => (
                <SelectedTag key={tag}>
                  {tag}
                  <RemoveTag onClick={() => removeStack(tag)}>×</RemoveTag>
                </SelectedTag>
              ))}
            </div>
          </Column>
          <Column>
            <Label>모집 마감일</Label>
            <Input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              required
            />
          </Column>
        </Row>
        <Row>
          <Column>
            <Label>모집 포지션</Label>
            <Select
              name="positionSelect"
              value=""
              onChange={(e) => {
                const value = e.target.value;
                if (value && !formData.position.includes(value)) {
                  setFormData((prev) => ({
                    ...prev,
                    position: [...prev.position, value],
                  }));
                }
              }}
            >
              <option value="" disabled>
                포지션 선택
              </option>
              {positionOptions.map((pos) => (
                <option
                  key={pos}
                  value={pos}
                  disabled={formData.position.includes(pos)}
                >
                  {pos}
                </option>
              ))}
            </Select>
            <div style={{ marginTop: "8px" }}>
              {formData.position.map((pos) => (
                <SelectedTag key={pos}>
                  {pos}
                  <RemoveTag onClick={() => removePosition(pos)}>×</RemoveTag>
                </SelectedTag>
              ))}
            </div>
          </Column>
          <Column>
            <Label>연락 방법</Label>
            <Select
              name="contactMethod"
              value={formData.contactMethod}
              onChange={handleChange}
              required
            >
              <option value="오픈톡">오픈톡</option>
              <option value="이메일">이메일</option>
              <option value="구글폼">구글폼</option>
            </Select>
            <Input
              type="text"
              name="contactDetail"
              value={formData.contactDetail}
              onChange={handleChange}
              placeholder="연락처를 입력해주세요"
              required
              style={{ marginTop: "8px" }}
            />
          </Column>
        </Row>
        <SectionTitle>
          <SectionNumber>2</SectionNumber>
          프로젝트에 대해 소개해주세요.
        </SectionTitle>
        <Row>
          <Column>
            <Label>제목</Label>
            <Input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="글 제목을 입력해주세요!"
              required
            />
          </Column>
        </Row>
        <Row>
          <Column>
            <Label>내용</Label>
            <TextArea
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="글 내용을 입력해주세요!"
              required
            />
          </Column>
        </Row>
        <ButtonRow>
          <Button type="button" onClick={() => navigate(-1)}>
            취소
          </Button>
          <Button type="submit" primary>
            수정하기
          </Button>
        </ButtonRow>
      </form>
    </FormContainer>
  );
};

export default RecruitEditPage;
