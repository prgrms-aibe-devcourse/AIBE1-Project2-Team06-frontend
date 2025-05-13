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

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
`;

const TableHead = styled.thead`
  background-color: #f5f5f5;
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #ddd;
`;

const TableHeader = styled.th`
  padding: 12px;
  text-align: left;
  font-weight: 600;
`;

const TableCell = styled.td`
  padding: 12px;
  text-align: left;
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

const PrivacyPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Header>
        <Title>개인정보처리방침</Title>
        <LastUpdated>최종 수정일: 2025년 5월 13일</LastUpdated>
      </Header>

      <Section>
        <SectionTitle>1. 개인정보의 처리 목적</SectionTitle>
        <Paragraph>
          Eum(이하 '회사')은 다음의 목적을 위하여 개인정보를 처리합니다.
          처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며,
          이용 목적이 변경되는 경우에는 「개인정보 보호법」 제18조에 따라 별도의
          동의를 받는 등 필요한 조치를 이행할 예정입니다.
        </Paragraph>
        <List>
          <ListItem>
            회원 가입 및 관리: 회원제 서비스 제공에 따른 본인 식별·인증,
            회원자격 유지·관리, 서비스 부정이용 방지, 각종 고지·통지 등을
            목적으로 개인정보를 처리합니다.
          </ListItem>
          <ListItem>
            서비스 제공: 프로젝트 게시, 팀원 모집, 지원서 제출, 커뮤니티 활동
            등의 서비스 제공과 관련한 목적으로 개인정보를 처리합니다.
          </ListItem>
          <ListItem>
            마케팅 및 광고에의 활용: 신규 서비스 개발 및 맞춤 서비스 제공,
            이벤트 및 광고성 정보 제공 및 참여기회 제공, 서비스의 유효성 확인,
            접속빈도 파악 등을 목적으로 개인정보를 처리합니다.
          </ListItem>
        </List>
      </Section>

      <Section>
        <SectionTitle>2. 개인정보의 처리 및 보유 기간</SectionTitle>
        <Paragraph>
          회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보
          수집 시에 동의받은 개인정보 보유·이용기간 내에서 개인정보를
          처리·보유합니다.
        </Paragraph>
        <Paragraph>
          각각의 개인정보 처리 및 보유 기간은 다음과 같습니다:
        </Paragraph>
        <List>
          <ListItem>회원 가입 및 관리: 회원 탈퇴 시까지</ListItem>
          <ListItem>
            재화 또는 서비스 제공: 서비스 공급완료 및 요금결제·정산 완료시까지
          </ListItem>
          <ListItem>
            다만, 관계 법령 위반에 따른 수사·조사 등이 진행중인 경우에는 해당
            수사·조사 종료 시까지
          </ListItem>
          <ListItem>
            또한, 관계 법령의 규정에 의하여 보존할 필요가 있는 경우 회사는
            아래와 같이 관계 법령에서 정한 일정한 기간 동안 회원정보를
            보관합니다:
            <List>
              <ListItem>
                서비스 이용 기록, 접속 로그, 접속 IP 정보: 3개월
                (통신비밀보호법)
              </ListItem>
              <ListItem>
                계약 또는 청약철회 등에 관한 기록: 5년 (전자상거래법)
              </ListItem>
              <ListItem>
                대금결제 및 재화 등의 공급에 관한 기록: 5년 (전자상거래법)
              </ListItem>
              <ListItem>
                소비자의 불만 또는 분쟁처리에 관한 기록: 3년 (전자상거래법)
              </ListItem>
            </List>
          </ListItem>
        </List>
      </Section>

      <Section>
        <SectionTitle>3. 개인정보의 제3자 제공</SectionTitle>
        <Paragraph>
          회사는 정보주체의 별도 동의가 있거나 법률의 특별한 규정 등 「개인정보
          보호법」 제17조 및 제18조에 해당하는 경우에만 개인정보를 제3자에게
          제공합니다.
        </Paragraph>
        <Paragraph>
          현재 회사는 이용자의 개인정보를 제3자에게 제공하고 있지 않습니다. 향후
          개인정보 제3자 제공이 필요한 경우, 별도의 동의를 받은 후 진행할
          것입니다.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>4. 개인정보처리 위탁</SectionTitle>
        <Paragraph>
          회사는 원활한 개인정보 업무처리를 위하여 다음과 같이 개인정보
          처리업무를 위탁하고 있습니다.
        </Paragraph>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>위탁받는 자(수탁자)</TableHeader>
              <TableHeader>위탁하는 업무의 내용</TableHeader>
            </TableRow>
          </TableHead>
          <tbody>
            <TableRow>
              <TableCell>AWS(Amazon Web Services, Inc.)</TableCell>
              <TableCell>서비스 인프라 제공 및 데이터 저장</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>○○○○ 결제대행사</TableCell>
              <TableCell>결제 대행 서비스</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>○○○○ 메일링 서비스</TableCell>
              <TableCell>이메일 발송 서비스</TableCell>
            </TableRow>
          </tbody>
        </Table>
        <Paragraph>
          회사는 위탁계약 체결 시 「개인정보 보호법」 제26조에 따라 위탁업무
          수행목적 외 개인정보 처리금지, 기술적·관리적 보호조치, 재위탁 제한,
          수탁자에 대한 관리·감독, 손해배상 등 책임에 관한 사항을 계약서 등
          문서에 명시하고, 수탁자가 개인정보를 안전하게 처리하는지를 감독하고
          있습니다.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>
          5. 정보주체와 법정대리인의 권리·의무 및 그 행사방법
        </SectionTitle>
        <Paragraph>
          정보주체는 회사에 대해 언제든지 개인정보 열람·정정·삭제·처리정지 요구
          등의 권리를 행사할 수 있습니다.
        </Paragraph>
        <Paragraph>
          권리 행사는 회사에 대해 「개인정보 보호법」 시행령 제41조제1항에 따라
          서면, 전자우편, 모사전송(FAX) 등을 통하여 하실 수 있으며 회사는 이에
          대해 지체 없이 조치하겠습니다.
        </Paragraph>
        <Paragraph>
          권리 행사는 정보주체의 법정대리인이나 위임을 받은 자 등 대리인을
          통하여 하실 수도 있습니다. 이 경우 "개인정보 처리 방법에 관한
          고시(제2020-7호)" 별지 제11호 서식에 따른 위임장을 제출하셔야 합니다.
        </Paragraph>
        <Paragraph>
          개인정보 열람 및 처리정지 요구는 「개인정보 보호법」 제35조 제4항,
          제37조 제2항에 의하여 정보주체의 권리가 제한될 수 있습니다.
        </Paragraph>
        <Paragraph>
          개인정보의 정정 및 삭제 요구는 다른 법령에서 그 개인정보가 수집
          대상으로 명시되어 있는 경우에는 그 삭제를 요구할 수 없습니다.
        </Paragraph>
        <Paragraph>
          회사는 정보주체 권리에 따른 열람의 요구, 정정·삭제의 요구, 처리정지의
          요구 시 열람 등 요구를 한 자가 본인이거나 정당한 대리인인지를
          확인합니다.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>6. 개인정보의 안전성 확보 조치</SectionTitle>
        <Paragraph>
          회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고
          있습니다:
        </Paragraph>
        <List>
          <ListItem>
            관리적 조치: 내부관리계획 수립·시행, 정기적 직원 교육 등
          </ListItem>
          <ListItem>
            기술적 조치: 개인정보처리시스템 등의 접근권한 관리, 접근통제시스템
            설치, 고유식별정보 등의 암호화, 보안프로그램 설치
          </ListItem>
          <ListItem>물리적 조치: 전산실, 자료보관실 등의 접근통제</ListItem>
        </List>
      </Section>

      <Section>
        <SectionTitle>
          7. 개인정보 자동 수집 장치의 설치·운영 및 거부에 관한 사항
        </SectionTitle>
        <Paragraph>
          회사는 이용자에게 개별적인 맞춤서비스를 제공하기 위해 이용정보를
          저장하고 수시로 불러오는 '쿠키(cookie)'를 사용합니다.
        </Paragraph>
        <Paragraph>
          쿠키는 웹사이트를 운영하는데 이용되는 서버(http)가 이용자의 컴퓨터
          브라우저에게 보내는 소량의 정보이며 이용자 컴퓨터의 하드디스크에
          저장되기도 합니다.
        </Paragraph>
        <Paragraph>
          쿠키의 사용목적: 이용자가 방문한 각 서비스와 웹 사이트들에 대한 방문
          및 이용형태, 인기 검색어, 보안접속 여부, 등을 파악하여 이용자에게
          최적화된 정보 제공을 위해 사용됩니다.
        </Paragraph>
        <Paragraph>
          쿠키의 설치·운영 및 거부: 웹브라우저 상단의 도구{">"}인터넷 옵션{">"}
          개인정보 메뉴의 옵션 설정을 통해 쿠키 저장을 거부할 수 있습니다.
        </Paragraph>
        <Paragraph>
          쿠키 저장을 거부할 경우 맞춤형 서비스 이용에 어려움이 발생할 수
          있습니다.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>8. 개인정보 보호책임자</SectionTitle>
        <Paragraph>
          회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와
          관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이
          개인정보 보호책임자를 지정하고 있습니다.
        </Paragraph>
        <List>
          <ListItem>
            개인정보 보호책임자: 이름(○○○), 직책(○○○), 연락처(이메일, 전화번호)
          </ListItem>
          <ListItem>
            개인정보 보호 담당부서: 부서명(○○○), 담당자(○○○), 연락처(이메일,
            전화번호)
          </ListItem>
        </List>
        <Paragraph>
          정보주체께서는 회사의 서비스를 이용하시면서 발생한 모든 개인정보 보호
          관련 문의, 불만처리, 피해구제 등에 관한 사항을 개인정보 보호책임자 및
          담당부서로 문의하실 수 있습니다. 회사는 정보주체의 문의에 대해 지체
          없이 답변 및 처리해드릴 것입니다.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>9. 개인정보 열람청구</SectionTitle>
        <Paragraph>
          정보주체는 「개인정보 보호법」 제35조에 따른 개인정보의 열람 청구를
          아래의 부서에 할 수 있습니다. 회사는 정보주체의 개인정보 열람청구가
          신속하게 처리되도록 노력하겠습니다.
        </Paragraph>
        <List>
          <ListItem>
            개인정보 열람청구 접수·처리 부서: 부서명(○○○), 담당자(○○○),
            연락처(이메일, 전화번호)
          </ListItem>
        </List>
      </Section>

      <Section>
        <SectionTitle>10. 권익침해 구제방법</SectionTitle>
        <Paragraph>
          정보주체는 개인정보침해로 인한 구제를 받기 위하여
          개인정보분쟁조정위원회, 한국인터넷진흥원 개인정보침해신고센터 등에
          분쟁해결이나 상담 등을 신청할 수 있습니다. 이 밖에 기타 개인정보침해의
          신고, 상담에 대하여는 아래의 기관에 문의하시기 바랍니다.
        </Paragraph>
        <List>
          <ListItem>
            개인정보분쟁조정위원회: (국번없이) 1833-6972 (www.kopico.go.kr)
          </ListItem>
          <ListItem>
            개인정보침해신고센터: (국번없이) 118 (privacy.kisa.or.kr)
          </ListItem>
          <ListItem>대검찰청: (국번없이) 1301 (www.spo.go.kr)</ListItem>
          <ListItem>경찰청: (국번없이) 182 (ecrm.cyber.go.kr)</ListItem>
        </List>
        <Paragraph>
          「개인정보보호법」제35조(개인정보의 열람), 제36조(개인정보의
          정정·삭제), 제37조(개인정보의 처리정지 등)의 규정에 의한 요구에 대
          하여 공공기관의 장이 행한 처분 또는 부작위로 인하여 권리 또는 이익의
          침해를 받은 자는 행정심판법이 정하는 바에 따라 행정심판을 청구할 수
          있습니다.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>11. 개인정보 처리방침 변경</SectionTitle>
        <Paragraph>
          이 개인정보처리방침은 2025년 5월 13일부터 적용됩니다.
        </Paragraph>
      </Section>

      <BackButton onClick={() => navigate(-1)}>
        이전 페이지로 돌아가기
      </BackButton>
    </Container>
  );
};

export default PrivacyPage;
