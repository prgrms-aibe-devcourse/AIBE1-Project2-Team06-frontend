import { createGlobalStyle } from "styled-components";

// 브랜드 컬러 변수 정의
export const brandColors = {
  primary: "#8ED11E", // 메인 연두색
  primaryDark: "#75B10D", // 더 진한 연두색
  primaryLight: "#F0FFDD", // 연한 연두색 배경
  primaryText: "#5A8700", // 연두색 글자색
  secondary: "#6CA723", // 중간 톤의 연두색
};

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'CookieRun-Regular';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/CookieRun-Regular.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'CookieRun-Regular', 'Noto Sans KR', sans-serif;
    color: #333;
    line-height: 1.5;
    padding-top: 64px; /* 헤더 높이만큼 여백 추가 */
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    background: none;
    border: none;
    cursor: pointer;
  }

  ul, ol {
    list-style: none;
  }

  /* 기본 버튼 스타일 */
  .btn {
    background-color: ${brandColors.primary};
    color: white;
    padding: 8px 16px;
    border-radius: 4px;
    font-weight: 600;

    &:hover {
      background-color: ${brandColors.primaryDark};
    }
  }

  /* 버튼 스타일링 */
  button.primary {
    background-color: ${brandColors.primary};
    color: white;
    
    &:hover {
      background-color: ${brandColors.primaryDark};
    }
  }

  /* 링크 스타일링 */
  a.primary {
    color: ${brandColors.primaryText};
    
    &:hover {
      color: ${brandColors.primaryDark};
    }
  }
`;

export default GlobalStyle;
