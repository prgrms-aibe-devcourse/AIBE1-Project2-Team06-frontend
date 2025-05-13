import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { brandColors } from "../styles/GlobalStyle";
import { dropdownFadeIn, smoothTransition } from "../styles/animations";

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: Option[];
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const SelectContainer = styled.div`
  position: relative;
  width: 100%;
`;

const SelectButton = styled.button`
  width: 100%;
  padding: 8px 16px;
  border-radius: 20px;
  border: 1px solid #ddd;
  background: #fff;
  font-size: 15px;
  text-align: left;
  cursor: pointer;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${smoothTransition}

  &:hover, &:focus {
    border-color: ${brandColors.primary};
    box-shadow: 0 0 0 2px ${brandColors.primaryLight}30;
  }

  &:after {
    content: "";
    width: 10px;
    height: 10px;
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23333'%3e%3cpath d='M7 10l5 5 5-5z'/%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    margin-left: 8px;
    transition: transform 0.2s ease;
  }
`;

const DropdownMenu = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: calc(100% + 5px);
  left: 0;
  width: 100%;
  max-height: ${({ isOpen }) => (isOpen ? "200px" : "0")};
  overflow-y: auto;
  background-color: white;
  border-radius: 8px;
  z-index: 10;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  visibility: ${({ isOpen }) => (isOpen ? "visible" : "hidden")};
  transform-origin: top center;
  transition: max-height 0.3s ease, opacity 0.2s ease, visibility 0.2s;
  animation: ${({ isOpen }) =>
    isOpen ? `${dropdownFadeIn} 0.25s ease-in-out` : "none"};

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: #ddd;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #ccc;
  }
`;

const DropdownItem = styled.div`
  padding: 8px 16px;
  cursor: pointer;
  ${smoothTransition}

  &:hover {
    background-color: ${brandColors.primaryLight}30;
    color: ${brandColors.primary};
  }

  &:first-child {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }

  &:last-child {
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }
`;

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  placeholder = "선택하세요",
  value,
  onChange,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (selectedValue: string) => {
    onChange(selectedValue);
    setIsOpen(false);
  };

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // 선택된 옵션의 라벨 찾기
  const selectedOption = options.find((option) => option.value === value);
  const displayText = selectedOption ? selectedOption.label : placeholder;

  return (
    <SelectContainer ref={containerRef} className={className}>
      <SelectButton
        onClick={handleToggle}
        style={{
          borderColor: isOpen ? brandColors.primary : "#ddd",
          boxShadow: isOpen
            ? `0 0 0 2px ${brandColors.primaryLight}30`
            : "none",
        }}
      >
        {displayText}
      </SelectButton>
      <DropdownMenu isOpen={isOpen}>
        {options.map((option) => (
          <DropdownItem
            key={option.value}
            onClick={() => handleSelect(option.value)}
          >
            {option.label}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </SelectContainer>
  );
};

export default CustomSelect;
