import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { brandColors } from "../styles/GlobalStyle";
import { useNavigate, Link } from "react-router-dom";
import { fetchAPI } from "../config/apiConfig";
// import { FaThumbsUp } from 'react-icons/fa';
// import { GoComment } from 'react-icons/go';

const SectionContainer = styled.section`
  width: 100%;
  padding: 60px 20px;
  display: flex;
  justify-content: center;
  background-color: #fff;
`;

const SectionContent = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const SectionHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 12px;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #333;
  font-family: "CookieRun-Regular", sans-serif;
`;

const Description = styled.p`
  font-size: 15px;
  color: #666;
  line-height: 1.5;
  font-family: "CookieRun-Regular", sans-serif;
`;

const CategoryTabs = styled.div`
  display: flex;
  border-bottom: 1px solid #eee;
  margin-bottom: 20px;
`;

const CategoryTab = styled.button<{ active?: boolean }>`
  padding: 12px 16px;
  font-size: 15px;
  font-weight: ${(props) => (props.active ? "600" : "400")};
  color: ${(props) => (props.active ? "#333" : "#888")};
  background: none;
  border: none;
  border-bottom: 2px solid
    ${(props) => (props.active ? "#3498db" : "transparent")};
  cursor: pointer;

  &:hover {
    color: #3498db;
  }
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const ProjectCardWrapper = styled.div`
  border: 1px solid #eaeaea;
  border-radius: 16px;
  overflow: hidden;
  background-color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const CardHeader = styled.div`
  padding: 12px 16px;
  display: flex;
  gap: 8px;
`;

const TagCategory = styled.div`
  background-color: ${brandColors.primaryLight};
  color: ${brandColors.primaryText};
  font-size: 12px;
  padding: 4px 10px;
  border-radius: 30px;
  font-weight: 500;
  display: flex;
  align-items: center;
`;

const TagEducation = styled.div`
  background-color: #fff0f0;
  color: #ff9999;
  font-size: 12px;
  padding: 4px 10px;
  border-radius: 30px;
  font-weight: 500;
  display: flex;
  align-items: center;
`;

const HandIcon = styled.div`
  margin-left: auto;
  color: ${brandColors.primary};
  font-size: 20px;
`;

const CardContent = styled.div`
  padding: 0 16px 16px;
`;

const CardDate = styled.div`
  font-size: 12px;
  color: #999;
  margin-bottom: 4px;
`;

const CardTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #333;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  line-height: 1.4;
  height: 22px;
  font-family: "CookieRun-Regular", sans-serif;
`;

const CardFilter = styled.div`
  margin-top: 12px;
  display: flex;
  gap: 6px;
`;

const FilterButton = styled.button`
  padding: 3px 10px;
  background: none;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 12px;
  color: #666;
  cursor: pointer;

  &:hover {
    background-color: #f8f8f8;
  }
`;

const CardDivider = styled.div`
  height: 1px;
  background-color: #eee;
  margin: 12px 0;
`;

const CardFooter = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const AuthorAvatar = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: #666;
`;

const AuthorName = styled.span`
  font-size: 13px;
  color: #333;
  font-weight: 500;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 32px;
  gap: 4px;
`;

const PageNumber = styled.button<{ active?: boolean }>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${(props) =>
    props.active ? brandColors.primary : "transparent"};
  color: ${(props) => (props.active ? "white" : "#666")};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  cursor: pointer;
  border: none;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${(props) =>
      props.active ? brandColors.primary : brandColors.primaryLight};
    color: ${(props) => (props.active ? "white" : brandColors.primaryText)};
  }
`;

const FilterBar = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
  flex-wrap: wrap;
`;

// 카테고리 버튼 스타일 컴포넌트 추가
const CategoryButtonContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
`;

const CategoryButton = styled.button<{ active: boolean }>`
  padding: 8px 20px;
  background-color: ${({ active }) =>
    active ? brandColors.primary : "transparent"};
  color: ${({ active }) => (active ? "white" : "#666")};
  border: 1px solid ${({ active }) => (active ? brandColors.primary : "#ddd")};
  border-radius: 20px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: "CookieRun-Regular", sans-serif;

  &:hover {
    background-color: ${({ active }) =>
      active ? brandColors.primary : "#f0f0f0"};
  }
`;

const FilterSelect = styled.select`
  padding: 8px 16px;
  border-radius: 20px;
  border: 1px solid #ddd;
  background: #fff;
  font-size: 15px;
`;

// ToggleButton 컴포넌트 다시 추가
const ToggleButton = styled.button<{ active: boolean }>`
  padding: 8px 16px;
  border-radius: 20px;
  border: 1.5px solid ${({ active }) => (active ? "#00bfae" : "#ddd")};
  background: ${({ active }) => (active ? "#e6fcfa" : "#fff")};
  color: ${({ active }) => (active ? "#00bfae" : "#333")};
  font-weight: 500;
  cursor: pointer;
`;

// 검색창 스타일 컴포넌트 추가
const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto; // 오른쪽 정렬
`;

const SearchInput = styled.input`
  padding: 8px 16px;
  border-radius: 20px;
  border: 1px solid #ddd;
  background: #f5f5f5;
  font-size: 15px;
  width: 250px;
  &:focus {
    outline: none;
    border-color: ${brandColors.primary};
    background: #fff;
  }
`;

const SearchIcon = styled.div`
  margin-left: -32px;
  color: #999;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

interface ProjectCardItemProps {
  id: number;
  publicId: string;
  title: string;
  description?: string;
  techStacks?: { id: number; name: string }[];
  positions?: { id: number; name: string }[];
  recruitType: string;
  deadline?: string;
  period?: string;
  progressMethod?: string;
  nickname: string;
}

const ProjectCardItem: React.FC<ProjectCardItemProps> = ({
  id,
  publicId,
  title,
  description,
  techStacks = [],
  positions = [],
  recruitType,
  deadline,
  period,
  progressMethod,
  nickname,
}) => {
  const navigate = useNavigate();
  const formattedDeadline = deadline
    ? `마감일 | ${deadline.split("-").join(".")}`
    : "";

  const handleClick = () => {
    navigate(`/project/${id}`);
  };

  const handleProfileClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/profile/${publicId}`);
  };

  return (
    <ProjectCardWrapper onClick={handleClick}>
      <CardHeader>
        <TagCategory>
          {recruitType === "PROJECT" ? "👨‍💻 프로젝트" : "🎓 스터디"}
        </TagCategory>
        <HandIcon>🌱</HandIcon>
      </CardHeader>
      <CardContent>
        <CardDate>{formattedDeadline}</CardDate>
        <CardTitle>{title}</CardTitle>
        <CardFilter>
          {positions.slice(0, 3).map((position, index) => (
            <FilterButton key={index}>{position.name}</FilterButton>
          ))}
        </CardFilter>
        <CardDivider />
        <CardFooter>
          <AuthorInfo
            style={{ cursor: "pointer" }}
            onClick={handleProfileClick}
          >
            <AuthorAvatar>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#8ED11E">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"></path>
              </svg>
            </AuthorAvatar>
            <AuthorName>{nickname}</AuthorName>
          </AuthorInfo>
        </CardFooter>
      </CardContent>
    </ProjectCardWrapper>
  );
};

// 프로젝트 API 응답 타입 정의
interface TechStack {
  id: number;
  name: string;
}

interface Position {
  id: number;
  name: string;
}

interface Post {
  id: number;
  publicId: string;
  nickname: string;
  userId: number;
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

interface PageInfo {
  pageNumber: number;
  pageSize: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

interface PostResponse {
  content: Post[];
  pageable: PageInfo;
  totalPages: number;
  totalElements: number;
  last: boolean;
  first: boolean;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  numberOfElements: number;
  empty: boolean;
}

// 필터 옵션 상수
const techStackOptions = [
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

const progressMethodOptions = ["온라인", "오프라인", "온라인/오프라인"];

// 진행 방식 enum 매핑
const progressMethodMap: { [key: string]: string } = {
  온라인: "ONLINE",
  오프라인: "OFFLINE",
  "온라인/오프라인": "ALL",
};

const cultureFitOptions = [
  { value: "PRACTICAL", label: "실용주의형" },
  { value: "DEMOCRATIC", label: "민주주의형" },
  { value: "AUTONOMOUS", label: "자율주의형" },
  { value: "COLLABORATIVE", label: "협업주의형" },
  { value: "STRUCTURED", label: "체계주의형" },
  { value: "FLEXIBLE", label: "유연주의형" },
  { value: "COMMUNICATIVE", label: "소통중시형" },
];

const ProjectSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("전체");
  const [currentPage, setCurrentPage] = useState<number>(0); // API에서는 0부터 시작
  const [posts, setPosts] = useState<Post[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [totalElements, setTotalElements] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const projectsPerPage = 8;
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);
  const [selectedPosition, setSelectedPosition] = useState("");
  const [selectedProgress, setSelectedProgress] = useState("");
  const [selectedCulture, setSelectedCulture] = useState("");
  const [showRecruitingOnly, setShowRecruitingOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // 기술 스택 ID를 찾는 함수
  const getTechStackId = (techName: string): number | undefined => {
    const techStack = Object.entries(techStackIdMap).find(
      ([name]) => name === techName
    );
    return techStack ? techStack[1] : undefined;
  };

  // 포지션 ID를 찾는 함수
  const getPositionId = (positionName: string): number | undefined => {
    const position = Object.entries(positionIdMap).find(
      ([name]) => name === positionName
    );
    return position ? position[1] : undefined;
  };

  // API로부터 프로젝트 데이터 가져오기
  const fetchPosts = async () => {
    try {
      setIsLoading(true);

      // 기본 URL 및 쿼리 파라미터
      let url = `posts?page=${currentPage}&size=${projectsPerPage}`;

      // 필터 요청 객체 생성
      const filterParams: any = {};

      // 검색어 추가
      if (searchQuery.trim()) {
        filterParams.keyword = searchQuery.trim();
      }

      // 카테고리 필터링 (전체/프로젝트/스터디)
      if (activeCategory !== "전체") {
        filterParams.recruitType =
          activeCategory === "프로젝트" ? "PROJECT" : "STUDY";
      }

      // 진행 방식 필터링
      if (selectedProgress) {
        filterParams.progressMethod = progressMethodMap[selectedProgress] || "";
      }

      // 컬처핏 필터링
      if (selectedCulture) {
        filterParams.cultureFit = selectedCulture;
      }

      // 포지션 필터링
      if (selectedPosition) {
        const positionId = getPositionId(selectedPosition);
        if (positionId) {
          filterParams.positionId = positionId;
        }
      }

      // 기술 스택 필터링
      if (selectedTechs.length > 0) {
        const techStackIds = selectedTechs
          .map(getTechStackId)
          .filter((id): id is number => id !== undefined);

        if (techStackIds.length > 0) {
          filterParams.techStackIds = techStackIds;
        }
      }

      // 모집 중만 보기 필터
      if (showRecruitingOnly) {
        filterParams.status = "RECRUITING";
      }

      // 필터 파라미터 URL에 추가
      Object.entries(filterParams).forEach(([key, value], index) => {
        if (Array.isArray(value)) {
          // 배열 값은 각각 별도의 파라미터로 추가
          value.forEach((item: any) => {
            url += `&${key}=${encodeURIComponent(item)}`;
          });
        } else {
          url += `&${key}=${encodeURIComponent(value as string)}`;
        }
      });

      console.log("요청 URL:", url);

      const response = await fetchAPI(url, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("서버에서 데이터를 가져오는데 실패했습니다.");
      }

      const data: PostResponse = await response.json();
      setPosts(data.content);
      setTotalPages(data.totalPages);
      setTotalElements(data.totalElements);
    } catch (error) {
      console.error("프로젝트 데이터를 가져오는 중 오류 발생:", error);
      // 오류 발생 시 빈 배열로 초기화
      setPosts([]);
      setTotalPages(0);
      setTotalElements(0);
    } finally {
      setIsLoading(false);
    }
  };

  // 드롭다운 onChange 핸들러
  const handleTechSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value && !selectedTechs.includes(value)) {
      // 기술 스택 선택 시 페이지 초기화
      setCurrentPage(0);
      setSelectedTechs([...selectedTechs, value]);
    }
    // 드롭다운을 다시 "기술 스택"으로 초기화
    e.target.selectedIndex = 0;
  };

  // 태그 제거 핸들러
  const handleRemoveTech = (tech: string) => {
    // 기술 스택 태그 제거 시 페이지 초기화
    setCurrentPage(0);
    setSelectedTechs(selectedTechs.filter((t) => t !== tech));
  };

  // 포지션 변경 핸들러
  const handlePositionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // 포지션 변경 시 페이지 초기화
    setCurrentPage(0);
    setSelectedPosition(e.target.value);
  };

  // 진행 방식 변경 핸들러
  const handleProgressChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // 진행 방식 변경 시 페이지 초기화
    setCurrentPage(0);
    setSelectedProgress(e.target.value);
  };

  // 컬처핏 변경 핸들러
  const handleCultureChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // 컬처핏 변경 시 페이지 초기화
    setCurrentPage(0);
    setSelectedCulture(e.target.value);
  };

  // 모집 중만 보기 토글 핸들러
  const handleRecruitingToggle = () => {
    // 모집 중만 보기 토글 시 페이지 초기화
    setCurrentPage(0);
    setShowRecruitingOnly((prev) => !prev);
  };

  // 검색어 입력 핸들러
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // 엔터 키 누를 때 검색 실행
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // 검색 실행 함수
  const handleSearch = () => {
    // 검색 시 첫 페이지로 이동
    setCurrentPage(0);
    fetchPosts();
  };

  // 필터 변경 시 데이터 새로고침
  useEffect(() => {
    fetchPosts();
  }, [
    currentPage,
    activeCategory,
    selectedProgress,
    selectedCulture,
    selectedPosition,
    showRecruitingOnly,
  ]);

  // 기술 스택 필터 변경 시 데이터 새로고침 (디바운스 처리)
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchPosts();
    }, 300);

    return () => clearTimeout(timer);
  }, [selectedTechs]);

  // 카테고리 변경 핸들러 함수
  const handleCategoryChange = (category: string) => {
    // 카테고리가 변경되면 페이지를 0으로 초기화
    setCurrentPage(0);
    setActiveCategory(category);
  };

  // 페이지 번호 생성
  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPageDisplay = 5;

    // API에서 페이지는 0부터 시작하지만, UI에서는 1부터 시작하므로 조정
    const displayCurrentPage = currentPage + 1;

    if (totalPages <= maxPageDisplay) {
      // 페이지가 5개 이하면 모든 페이지 번호 표시
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <PageNumber
            key={i}
            active={i === displayCurrentPage}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </PageNumber>
        );
      }
    } else {
      // 페이지가 5개 초과일 때 처리
      // 항상 현재 페이지, 첫 페이지, 마지막 페이지는 표시
      // 그 외에는 현재 페이지 주변의 페이지만 표시

      // 첫 페이지 표시
      pageNumbers.push(
        <PageNumber
          key={1}
          active={1 === displayCurrentPage}
          onClick={() => handlePageChange(1)}
        >
          1
        </PageNumber>
      );

      // 현재 페이지가 4보다 크면 "..." 표시
      if (displayCurrentPage > 3) {
        pageNumbers.push(
          <PageNumber
            key="ellipsis1"
            onClick={() => handlePageChange(Math.floor(displayCurrentPage / 2))}
          >
            ...
          </PageNumber>
        );
      }

      // 현재 페이지 주변의 페이지 표시
      const startPage = Math.max(2, displayCurrentPage - 1);
      const endPage = Math.min(totalPages - 1, displayCurrentPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        if (i !== 1 && i !== totalPages) {
          // 첫 페이지와 마지막 페이지는 이미 표시됨
          pageNumbers.push(
            <PageNumber
              key={i}
              active={i === displayCurrentPage}
              onClick={() => handlePageChange(i)}
            >
              {i}
            </PageNumber>
          );
        }
      }

      // 현재 페이지가 totalPages-3보다 작으면 "..." 표시
      if (displayCurrentPage < totalPages - 2) {
        pageNumbers.push(
          <PageNumber
            key="ellipsis2"
            onClick={() =>
              handlePageChange(
                Math.floor((displayCurrentPage + totalPages) / 2)
              )
            }
          >
            ...
          </PageNumber>
        );
      }

      // 마지막 페이지 표시
      pageNumbers.push(
        <PageNumber
          key={totalPages}
          active={totalPages === displayCurrentPage}
          onClick={() => handlePageChange(totalPages)}
        >
          {totalPages}
        </PageNumber>
      );
    }

    return pageNumbers;
  };

  // 페이지 변경 함수
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber - 1); // API는 0부터 시작하므로 1을 빼줌
    // 페이지 상단으로 스크롤
    window.scrollTo({
      top: document.getElementById("project-section")?.offsetTop || 0,
      behavior: "smooth",
    });
  };

  return (
    <SectionContainer id="project-section">
      <SectionContent>
        <SectionHeader>
          <Title>Eum과 함께하는 프로젝트</Title>
          <Description>
            다양한 개발자들이 함께하는 흥미로운 프로젝트들을 살펴보세요.
          </Description>
        </SectionHeader>

        {/* 상단 카테고리 버튼 - styled-components로 교체 */}
        <CategoryButtonContainer>
          <CategoryButton
            active={activeCategory === "전체"}
            onClick={() => handleCategoryChange("전체")}
          >
            전체
          </CategoryButton>
          <CategoryButton
            active={activeCategory === "프로젝트"}
            onClick={() => handleCategoryChange("프로젝트")}
          >
            프로젝트
          </CategoryButton>
          <CategoryButton
            active={activeCategory === "스터디"}
            onClick={() => handleCategoryChange("스터디")}
          >
            스터디
          </CategoryButton>
        </CategoryButtonContainer>

        {/* 필터 바 */}
        <FilterBar>
          <FilterSelect onChange={handleTechSelect}>
            <option value="">기술 스택</option>
            {techStackOptions
              .filter((opt) => !selectedTechs.includes(opt))
              .map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
          </FilterSelect>
          <FilterSelect
            value={selectedPosition}
            onChange={handlePositionChange}
          >
            <option value="">포지션</option>
            {positionOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </FilterSelect>
          <FilterSelect
            value={selectedProgress}
            onChange={handleProgressChange}
          >
            <option value="">진행 방식</option>
            {progressMethodOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </FilterSelect>
          <FilterSelect value={selectedCulture} onChange={handleCultureChange}>
            <option value="">컬처핏</option>
            {cultureFitOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </FilterSelect>
          <ToggleButton
            active={showRecruitingOnly}
            onClick={handleRecruitingToggle}
          >
            👀 모집 중만 보기
          </ToggleButton>

          {/* 검색창 추가 */}
          <SearchContainer>
            <SearchInput
              placeholder="제목, 글 내용을 검색해보세요."
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyPress={handleKeyPress}
            />
            <SearchIcon onClick={handleSearch}>🔍</SearchIcon>
          </SearchContainer>
        </FilterBar>

        {/* 선택된 기술 스택 태그 표시 */}
        <div
          style={{
            display: "flex",
            gap: "8px",
            flexWrap: "wrap",
            marginBottom: "16px",
          }}
        >
          {selectedTechs.map((tech) => (
            <span
              key={tech}
              style={{
                display: "inline-flex",
                alignItems: "center",
                background: "#e6fcfa",
                color: "#00bfae",
                borderRadius: "16px",
                padding: "4px 12px",
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              {tech}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveTech(tech);
                }}
                style={{
                  marginLeft: "6px",
                  background: "none",
                  border: "none",
                  color: "#00bfae",
                  fontWeight: "bold",
                  cursor: "pointer",
                  fontSize: "16px",
                }}
                aria-label={`${tech} 제거`}
              >
                ×
              </button>
            </span>
          ))}
        </div>

        {isLoading ? (
          <div style={{ textAlign: "center", padding: "40px 0" }}>
            데이터를 불러오는 중...
          </div>
        ) : posts.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px 0" }}>
            해당하는 프로젝트가 없습니다.
          </div>
        ) : (
          <>
            <div
              style={{ marginBottom: "12px", fontSize: "14px", color: "#666" }}
            >
              총 {totalElements}개의 프로젝트
            </div>
            <CardsGrid>
              {posts.map((post) => (
                <ProjectCardItem
                  key={post.id}
                  id={post.id}
                  publicId={post.publicId}
                  title={post.title}
                  description={post.content}
                  techStacks={post.techStacks}
                  positions={post.positions}
                  recruitType={post.recruitType}
                  deadline={post.deadline}
                  period={post.period}
                  progressMethod={post.progressMethod}
                  nickname={post.nickname}
                />
              ))}
            </CardsGrid>
          </>
        )}

        {totalPages > 0 && <Pagination>{renderPageNumbers()}</Pagination>}
      </SectionContent>
    </SectionContainer>
  );
};

export default ProjectSection;
