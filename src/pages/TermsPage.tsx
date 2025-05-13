import React from "react";
import styled from "styled-components";
import { brandColors } from "../styles/GlobalStyle";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  max-width: 800px;
  margin: 40px auto;
  padding: 0 20px;
`;

const Header = styled.div`
  margin-bottom: 30px;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 8px;
  color: ${brandColors.primary};
`;

const LastUpdated = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 20px;
`;

const Section = styled.section`
  margin-bottom: 30px;
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 15px;
  color: ${brandColors.secondary};
`;

const Paragraph = styled.p`
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 15px;
  color: #333;
`;

const List = styled.ul`
  margin-left: 20px;
  margin-bottom: 15px;
`;

const ListItem = styled.li`
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 8px;
  color: #333;
`;

const BackButton = styled.button`
  padding: 8px 16px;
  background-color: ${brandColors.primary};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 20px;

  &:hover {
    background-color: ${brandColors.secondary};
  }
`;

const TermsPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Header>
        <Title>이용약관</Title>
        <LastUpdated>최종 수정일: 2025년 5월 13일</LastUpdated>
      </Header>

      <Section>
        <SectionTitle>1. 서비스 이용 계약</SectionTitle>
        <Paragraph>
          본 약관은 Eum(이하 "회사")이 제공하는 모든 서비스(이하 "서비스")를
          이용함에 있어 회사와 이용자 간의 권리, 의무 및 책임사항을 규정함을
          목적으로 합니다.
        </Paragraph>
        <Paragraph>
          회사는 본 약관을 회사 웹사이트에 게시하며, 이용자가 본 약관에
          동의함으로써 서비스 이용 계약이 성립됩니다.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>2. 서비스 이용</SectionTitle>
        <Paragraph>
          회사는 프로젝트 및 팀원 모집 중개 플랫폼으로, 이용자 간의 자유로운
          프로젝트 참여 및 모집을 지원합니다.
        </Paragraph>
        <Paragraph>회사는 다음과 같은 서비스를 제공합니다:</Paragraph>
        <List>
          <ListItem>프로젝트 정보 게시 및 조회 서비스</ListItem>
          <ListItem>팀원 모집 및 지원 서비스</ListItem>
          <ListItem>커뮤니티 이용 서비스</ListItem>
          <ListItem>기타 회사가 정하는 서비스</ListItem>
        </List>
      </Section>

      <Section>
        <SectionTitle>3. 이용자의 의무</SectionTitle>
        <Paragraph>이용자는 다음 행위를 해서는 안 됩니다:</Paragraph>
        <List>
          <ListItem>
            타인의 정보 도용 또는 회사가 정한 정보 외의 정보 기재
          </ListItem>
          <ListItem>
            회사가 제공하는 서비스를 이용하여 얻은 정보를 회사의 사전 승낙 없이
            복제, 유통, 상업적 이용하는 행위
          </ListItem>
          <ListItem>타인의 명예를 훼손하거나 불이익을 주는 행위</ListItem>
          <ListItem>
            회사의 저작권, 제3자의 저작권 등 기타 권리를 침해하는 행위
          </ListItem>
          <ListItem>
            공공질서 및 미풍양속에 위반되는 내용의 정보, 문장, 도형, 음성 등을
            타인에게 유포하는 행위
          </ListItem>
          <ListItem>범죄와 결부된다고 객관적으로 판단되는 행위</ListItem>
          <ListItem>기타 관계법령에 위배되는 행위</ListItem>
        </List>
      </Section>

      <Section>
        <SectionTitle>4. 서비스 제공의 중단</SectionTitle>
        <Paragraph>
          회사는 컴퓨터 등 정보통신설비의 보수점검, 교체 및 고장, 통신두절 등의
          사유가 발생한 경우에는 서비스의 제공을 일시적으로 중단할 수 있습니다.
        </Paragraph>
        <Paragraph>
          회사는 제1항의 사유로 서비스의 제공이 일시적으로 중단됨으로 인하여
          이용자 또는 제3자가 입은 손해에 대하여 배상합니다. 단, 회사가 고의
          또는 과실이 없음을 입증하는 경우에는 그러하지 아니합니다.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>5. 회원가입 및 계정 관리</SectionTitle>
        <Paragraph>
          서비스 이용을 위해 이용자는 회원가입을 통해 계정을 생성해야 합니다.
          회원가입 시 제공한 정보는 정확하고 최신의 정보여야 합니다.
        </Paragraph>
        <Paragraph>
          회원은 개인정보 및 계정 정보에 변동사항이 있을 경우 즉시 수정해야
          합니다. 정보 미업데이트로 인한 불이익은 회원 본인의 책임입니다.
        </Paragraph>
        <Paragraph>
          회원은 자신의 계정과 비밀번호를 안전하게 관리해야 하며, 이를 제3자에게
          양도하거나 대여할 수 없습니다. 계정 도용이나 무단 사용을 발견한 경우
          즉시 회사에 통지해야 합니다.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>6. 약관의 변경</SectionTitle>
        <Paragraph>
          회사는 필요한 경우 약관을 변경할 수 있으며, 변경된 약관은 웹사이트에
          공지함으로써 효력이 발생합니다.
        </Paragraph>
        <Paragraph>
          회사는 약관을 변경할 경우 적용일자 및 변경사유를 명시하여 현행 약관과
          함께 웹사이트에 최소 7일 이전에 공지합니다.
        </Paragraph>
        <Paragraph>
          이용자가 변경된 약관에 동의하지 않을 경우 서비스 이용을 중단하고
          이용계약을 해지할 수 있습니다.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>7. 분쟁해결 및 관할법원</SectionTitle>
        <Paragraph>
          서비스 이용과 관련하여 회사와 이용자 간에 발생한 분쟁은 우선 쌍방 간의
          합의에 의해 해결하도록 노력합니다.
        </Paragraph>
        <Paragraph>
          분쟁이 원만하게 해결되지 않을 경우 관련 법령에 따라 서울중앙지방법원을
          제1심 관할법원으로 합니다.
        </Paragraph>
      </Section>

      <BackButton onClick={() => navigate(-1)}>
        이전 페이지로 돌아가기
      </BackButton>
    </Container>
  );
};

export default TermsPage;
