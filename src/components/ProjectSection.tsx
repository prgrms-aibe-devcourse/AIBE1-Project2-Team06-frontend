import React, { useState } from "react";
import styled from "styled-components";
import { brandColors } from "../styles/GlobalStyle";
import { useNavigate } from "react-router-dom";
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

const CardStats = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 10px;
  color: #999;
  font-size: 12px;
`;

const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const StatusBadge = styled.div<{ status: string }>`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  background-color: ${(props) => {
    switch (props.status) {
      case "모집중":
        return "#e6f7ee";
      case "모집완료":
        return "#ffe9e9";
      case "진행중":
        return "#fff7e6";
      default:
        return "#eee";
    }
  }};
  color: ${(props) => {
    switch (props.status) {
      case "모집중":
        return "#27ae60";
      case "모집완료":
        return "#e74c3c";
      case "진행중":
        return "#f39c12";
      default:
        return "#666";
    }
  }};
`;

const MoreButton = styled.button`
  background-color: white;
  color: #666;
  font-size: 14px;
  font-weight: 500;
  padding: 10px 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: fit-content;
  margin: 24px auto 0;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f8f9fa;
    color: #333;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 32px;
  gap: 4px;
`;

const PageNumber = styled.button<{ active?: boolean }>`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${(props) => (props.active ? "#3498db" : "transparent")};
  color: ${(props) => (props.active ? "white" : "#666")};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  cursor: pointer;
  border: none;

  &:hover {
    background-color: ${(props) => (props.active ? "#3498db" : "#f0f0f0")};
  }
`;

interface ProjectCardItemProps {
  id: number;
  title: string;
  description: string;
  techStack: string[];
  recruitmentStatus: string;
  category: string;
  date?: string;
}

const ProjectCardItem: React.FC<ProjectCardItemProps> = ({
  id,
  title,
  description,
  techStack,
  recruitmentStatus,
  category,
  date = "마감일 | 2025.05.13",
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/project/${id}`);
  };

  return (
    <ProjectCardWrapper onClick={handleClick}>
      <CardHeader>
        <TagCategory>👨‍💻 프로젝트</TagCategory>
        {category === "스터디" && (
          <TagEducation>🎓 따끈따끈 새 글</TagEducation>
        )}
        <HandIcon>🌱</HandIcon>
      </CardHeader>
      <CardContent>
        <CardDate>{date}</CardDate>
        <CardTitle>{title}</CardTitle>
        <CardFilter>
          <FilterButton>전체</FilterButton>
          {category === "프로젝트" && <FilterButton>iOS</FilterButton>}
          {category === "프로젝트" && <FilterButton>디자이너</FilterButton>}
        </CardFilter>
        <CardDivider />
        <CardFooter>
          <AuthorInfo>
            <AuthorAvatar>😺</AuthorAvatar>
            <AuthorName>Blue Cat</AuthorName>
          </AuthorInfo>
          <CardStats>
            <StatItem>
              👍
              <span>7</span>
            </StatItem>
            <StatItem>
              💬
              <span>0</span>
            </StatItem>
          </CardStats>
        </CardFooter>
      </CardContent>
    </ProjectCardWrapper>
  );
};

const ProjectSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("전체");

  // 예시 데이터
  const projects = [
    {
      id: 1,
      title: "마음운동 앱 사이드 프로젝트 팀원 모집합니다(iOS 개발자 모집)",
      description:
        "개발자들이 서로 지식과 경험을 공유하고 함께 성장할 수 있는 커뮤니티 플랫폼을 개발합니다.",
      techStack: ["React", "TypeScript", "Node.js"],
      recruitmentStatus: "모집중",
      category: "프로젝트",
    },
    {
      id: 2,
      title: "헬스케어 모바일 앱 서비스",
      description:
        "사용자의 건강 정보를 관리하고 맞춤형 운동 계획을 제공하는 모바일 앱을 개발합니다.",
      techStack: ["React Native", "Firebase", "Redux"],
      recruitmentStatus: "모집완료",
      category: "프로젝트",
    },
    {
      id: 3,
      title: "간편 결제 시스템 개발",
      description:
        "사용하기 쉬운 결제 시스템과 관리자 대시보드를 제공하는 서비스를 개발합니다.",
      techStack: ["Vue.js", "Spring Boot", "MySQL"],
      recruitmentStatus: "진행중",
      category: "프로젝트",
    },
    {
      id: 4,
      title: "실시간 협업 툴",
      description:
        "팀원들이 실시간으로 협업할 수 있는 문서 편집 및 프로젝트 관리 툴입니다.",
      techStack: ["Angular", "Socket.io", "MongoDB"],
      recruitmentStatus: "모집중",
      category: "프로젝트",
    },
    {
      id: 5,
      title: "인공지능 기반 추천 시스템",
      description:
        "사용자의 취향과 패턴을 분석하여 맞춤형 콘텐츠를 추천하는 시스템을 개발합니다.",
      techStack: ["Python", "TensorFlow", "Django"],
      recruitmentStatus: "모집중",
      category: "스터디",
    },
    {
      id: 6,
      title: "동네 기반 중고거래 서비스",
      description:
        "위치 기반으로 가까운 동네에서 안전하게 중고 물품을 거래할 수 있는 서비스를 개발합니다.",
      techStack: ["Swift", "Kotlin", "AWS"],
      recruitmentStatus: "진행중",
      category: "스터디",
    },
    {
      id: 7,
      title: "React 심화 스터디",
      description:
        "React 고급 기능과 최적화 기법을 함께 학습하는 스터디입니다.",
      techStack: ["React", "JavaScript", "Redux"],
      recruitmentStatus: "모집중",
      category: "스터디",
    },
    {
      id: 8,
      title: "알고리즘 문제 풀이 스터디",
      description: "코딩 테스트 준비를 위한 알고리즘 문제 풀이 스터디입니다.",
      techStack: ["Python", "Java", "C++"],
      recruitmentStatus: "모집중",
      category: "스터디",
    },
  ];

  const filteredProjects = projects.filter((project) => {
    if (activeCategory !== "전체" && project.category !== activeCategory) {
      return false;
    }
    return true;
  });

  return (
    <SectionContainer>
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

        <CardsGrid>
          {filteredProjects.map((project) => (
            <ProjectCardItem
              key={project.id}
              id={project.id}
              title={project.title}
              description={project.description}
              techStack={project.techStack}
              recruitmentStatus={project.recruitmentStatus}
              category={project.category}
            />
          ))}
        </CardsGrid>

        <MoreButton>더 많은 프로젝트 보기</MoreButton>

        <Pagination>
          <PageNumber>1</PageNumber>
          <PageNumber active>2</PageNumber>
          <PageNumber>3</PageNumber>
          <PageNumber>...</PageNumber>
          <PageNumber>10</PageNumber>
        </Pagination>
      </SectionContent>
    </SectionContainer>
  );
};

export default ProjectSection;
