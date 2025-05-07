import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

interface ProjectCardProps {
  title: string;
  description: string;
  techStack: string[];
  recruitmentStatus: string;
  thumbnail?: string;
  author: string;
}

const CardContainer = styled.div`
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  background-color: white;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
  }
`;

const Thumbnail = styled.div<{ imageUrl?: string }>`
  width: 100%;
  height: 180px;
  background-color: #eee;
  background-image: ${(props) =>
    props.imageUrl ? `url(${props.imageUrl})` : "none"};
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;

  &::after {
    content: "프로젝트 이미지";
    color: #aaa;
    display: ${(props) => (props.imageUrl ? "none" : "block")};
  }
`;

const ContentContainer = styled.div`
  padding: 20px;
`;

const Title = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #333;
`;

const Description = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 16px;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TechStackContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
`;

const TechTag = styled.span`
  background-color: #f0f7ff;
  color: #3498db;
  font-size: 12px;
  font-weight: 500;
  padding: 4px 8px;
  border-radius: 4px;
`;

const StatusBadge = styled.div<{ status: string }>`
  display: inline-block;
  padding: 6px 10px;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 600;
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

const AuthorRow = styled.div`
  margin-top: 18px;
  display: flex;
  align-items: center;
  gap: 8px;
`;
const AuthorAvatar = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #666;
`;
const AuthorName = styled.span`
  font-size: 14px;
  color: #3498db;
  font-weight: 500;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  techStack,
  recruitmentStatus,
  thumbnail,
  author,
}) => {
  return (
    <CardContainer>
      <Thumbnail imageUrl={thumbnail} />
      <ContentContainer>
        <Title>{title}</Title>
        <Description>{description}</Description>
        <TechStackContainer>
          {techStack.map((tech, index) => (
            <TechTag key={index}>{tech}</TechTag>
          ))}
        </TechStackContainer>
        <StatusBadge status={recruitmentStatus}>
          {recruitmentStatus}
        </StatusBadge>
        <AuthorRow>
          <Link
            to="/mypage"
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
            }}
          >
            <AuthorAvatar>🧑</AuthorAvatar>
            <AuthorName>{author}</AuthorName>
          </Link>
        </AuthorRow>
      </ContentContainer>
    </CardContainer>
  );
};

export default ProjectCard;
