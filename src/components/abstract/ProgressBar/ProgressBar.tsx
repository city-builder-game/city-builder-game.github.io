import React, { useState, useEffect } from "react";
import styled, { css, keyframes } from 'styled-components';

const fadeOut = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  height: 24px;
  background-color: #e0e0de;
  border-radius: 50px;
  margin: 10px 0;
  position: relative;
  overflow: hidden;
`;

const ProgressBarFill = styled.div<{ reset?: boolean }>`
  height: 100%;
  position: relative;
  background-color: #F5A623;
  border-radius: 10px;
  ${({ reset }) =>
    reset && css`
      animation: ${fadeOut} 1s;
    `}
`;

const ProgressBarText = styled.div<{ unfilled?: boolean }>`
  position: absolute;
  right: 5px;
  color: white;
  font-weight: bold;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  height: 100%;
  line-height: 100%;
  font-size: min(100%, 24px);
  text-align: center;
  transition: all 0.3s ease-in-out;
  transform: translateX(0);
  ${({ unfilled }) =>
    unfilled && css`
      color: #F5A623;
      right: -5px;
      transform: translateX(100%);
    `}
`;

const ProgressBar = ({ percentage, text }: {
    percentage: number
    text?: string
}) => {
  const [width, setWidth] = useState(0);
  const [shouldReset, setShouldReset] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
        if (percentage < width) {
            setShouldReset(true);
            setWidth(0);
            setTimeout(() => {
                setShouldReset(false);
            }, 1000);
        } else if (percentage > width) {
            setWidth((w) => (Math.min(percentage, w + 1)));
        }
    }, 10);

    return () => {
      clearInterval(timer);
    };
  }, [width, percentage]);

  return (
    <ProgressBarContainer>
        <ProgressBarFill
            reset={shouldReset}
            style={{
                width: `${width}%`,
                transition: shouldReset ? "none" : "width 0.3s ease-in-out",
            }}
        >
            {text && percentage >= width && <ProgressBarText
                    unfilled={width < 20}
            >{text}</ProgressBarText>}
        </ProgressBarFill>
    </ProgressBarContainer>
  );
};

export default ProgressBar;
