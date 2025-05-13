import { css, keyframes } from "styled-components";

// 드롭다운 페이드인 효과
export const dropdownFadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px) scaleY(0.9);
  }
  to {
    opacity: 1;
    transform: translateY(0) scaleY(1);
  }
`;

// 드롭다운 페이드아웃 효과
export const dropdownFadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0) scaleY(1);
  }
  to {
    opacity: 0;
    transform: translateY(-10px) scaleY(0.9);
  }
`;

// 드롭다운 애니메이션 CSS
export const dropdownAnimation = css`
  transform-origin: top center;
  animation: ${dropdownFadeIn} 0.25s ease-in-out forwards;
  overflow: hidden;
`;

// 부드러운 전환 효과
export const smoothTransition = css`
  transition: all 0.2s ease-in-out;
`;

// 확장/축소 애니메이션
export const expandContract = {
  expand: keyframes`
    from {
      max-height: 0;
      opacity: 0;
    }
    to {
      max-height: 500px;
      opacity: 1;
    }
  `,
  contract: keyframes`
    from {
      max-height: 500px;
      opacity: 1;
    }
    to {
      max-height: 0;
      opacity: 0;
    }
  `,
};

// 확장 애니메이션 CSS
export const expandAnimation = css`
  animation: ${expandContract.expand} 0.3s ease-in-out forwards;
  overflow: hidden;
`;

// 축소 애니메이션 CSS
export const contractAnimation = css`
  animation: ${expandContract.contract} 0.3s ease-in-out forwards;
  overflow: hidden;
`;
