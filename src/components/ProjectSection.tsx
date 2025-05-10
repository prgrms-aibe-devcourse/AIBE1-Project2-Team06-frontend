import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { brandColors } from "../styles/GlobalStyle";
import { useNavigate, Link } from "react-router-dom";
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

interface PostResponse {
  content: Post[];
  pageable: {
    pageNumber: number;
    pageSize: number;
  };
  totalPages: number;
  totalElements: number;
  last: boolean;
  first: boolean;
  empty: boolean;
}

const ProjectSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("전체");
  const [currentPage, setCurrentPage] = useState<number>(0); // API에서는 0부터 시작
  const [posts, setPosts] = useState<Post[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const projectsPerPage = 8;

  // API로부터 프로젝트 데이터 가져오기
  const fetchPosts = async () => {
    try {
      setIsLoading(true);

      let url = `/api/v1/posts?page=${currentPage}&size=${projectsPerPage}`;

      // 카테고리 필터링이 필요한 경우 URL 수정
      if (activeCategory !== "전체") {
        const recruitType = activeCategory === "프로젝트" ? "PROJECT" : "STUDY";
        url += `&recruitType=${recruitType}`;
      }

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("서버에서 데이터를 가져오는데 실패했습니다.");
      }

      const data: PostResponse = await response.json();
      setPosts(data.content);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("프로젝트 데이터를 가져오는 중 오류 발생:", error);
      // 오류 발생 시 빈 배열로 초기화
      setPosts([]);
    } finally {
      setIsLoading(false);
    }
  };

  // 페이지 또는 카테고리 변경 시 데이터 가져오기
  useEffect(() => {
    fetchPosts();
  }, [currentPage, activeCategory]);

  // 카테고리 변경 시 페이지를 0으로 리셋
  useEffect(() => {
    setCurrentPage(0);
  }, [activeCategory]);

  // 페이지 변경 함수
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber - 1); // API는 0부터 시작하므로 1을 빼줌
    // 페이지 상단으로 스크롤
    window.scrollTo({
      top: document.getElementById("project-section")?.offsetTop || 0,
      behavior: "smooth",
    });
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

  return (
    <SectionContainer id="project-section">
      <SectionContent>
        <SectionHeader>
          <Title>Eum과 함께하는 프로젝트</Title>
          <Description>
            다양한 개발자들이 함께하는 흥미로운 프로젝트들을 살펴보세요.
          </Description>
        </SectionHeader>

        <CategoryTabs>
          <CategoryTab
            active={activeCategory === "전체"}
            onClick={() => setActiveCategory("전체")}
          >
            전체
          </CategoryTab>
          <CategoryTab
            active={activeCategory === "프로젝트"}
            onClick={() => setActiveCategory("프로젝트")}
          >
            프로젝트
          </CategoryTab>
          <CategoryTab
            active={activeCategory === "스터디"}
            onClick={() => setActiveCategory("스터디")}
          >
            스터디
          </CategoryTab>
        </CategoryTabs>

        {isLoading ? (
          <div style={{ textAlign: "center", padding: "40px 0" }}>
            데이터를 불러오는 중...
          </div>
        ) : posts.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px 0" }}>
            해당하는 프로젝트가 없습니다.
          </div>
        ) : (
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
        )}

        {totalPages > 0 && <Pagination>{renderPageNumbers()}</Pagination>}
      </SectionContent>
    </SectionContainer>
  );
};

export default ProjectSection;
