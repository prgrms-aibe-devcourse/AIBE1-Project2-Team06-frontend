import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const LoginContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 80px 20px;
  background-color: #f8f9fa;
`;

const LoginCard = styled.div`
  width: 100%;
  max-width: 450px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 40px;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: #333;
  margin-bottom: 24px;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #555;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #3498db;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 12px 16px;
  background-color: #3498db;
  color: white;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 600;
  margin-top: 8px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2980b9;
  }
`;

const OauthButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 24px;
`;

const OauthButton = styled.button<{ bgColor: string }>`
  width: 100%;
  padding: 12px 16px;
  background-color: ${(props) => props.bgColor};
  color: white;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.9;
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: 24px 0;

  &::before,
  &::after {
    content: "";
    flex: 1;
    height: 1px;
    background-color: #ddd;
  }

  span {
    padding: 0 12px;
    color: #888;
    font-size: 14px;
  }
`;

const BottomText = styled.div`
  text-align: center;
  margin-top: 24px;
  font-size: 14px;
  color: #666;

  a {
    color: #3498db;
    font-weight: 600;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const ErrorMessage = styled.div`
  color: #e74c3c;
  font-size: 14px;
  margin-top: 4px;
`;

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError("이메일과 비밀번호를 모두 입력해주세요.");
      return;
    }

    // 로그인 로직 구현 (API 요청 등)
    console.log("로그인 시도:", { email, password });

    // 임시 로그인 성공 처리
    alert("로그인 성공!");
  };

  return (
    <LoginContainer>
      <LoginCard>
        <Title>Eum 로그인</Title>
        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <Label htmlFor="email">이메일</Label>
            <Input
              id="email"
              type="email"
              placeholder="이메일을 입력하세요"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </InputGroup>
          <InputGroup>
            <Label htmlFor="password">비밀번호</Label>
            <Input
              id="password"
              type="password"
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </InputGroup>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <Button type="submit">로그인</Button>
        </Form>

        <Divider>
          <span>또는</span>
        </Divider>

        <OauthButtons>
          <OauthButton bgColor="#4267B2">페이스북으로 로그인</OauthButton>
          <OauthButton bgColor="#DB4437">구글로 로그인</OauthButton>
          <OauthButton bgColor="#000000">깃허브로 로그인</OauthButton>
        </OauthButtons>

        <BottomText>
          계정이 없으신가요? <Link to="/register">회원가입</Link>
        </BottomText>
      </LoginCard>
    </LoginContainer>
  );
};

export default LoginPage;
