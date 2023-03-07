import React from "react";
import styled from 'styled-components';

const CardContainer = styled.div<{
  isDragged: boolean;
  isOver: boolean;
}>`
  padding: 5px;
  margin: 5px;
  border-radius: 5px;
  height: 30px;
  width: 200px;
  z-index: ${({ isDragged }) => (isDragged ? 2 : 1)};
  box-shadow: ${({ isDragged }) => isDragged ? "0 4px 8px rgba(0, 0, 0, 0.2)" : "0 1px 2px rgba(0, 0, 0, 0.2)"};
  background: ${({ isDragged, isOver }) => isDragged ? "#F5A623" : isOver ? "#FFC947" : "white"};
`

const Card = ({
  content,
  isDragged,
  isOver,
  onDragStart,
  onDragEnd,
  onDragOver,
  onDragLeave,
}: {
  content: string;
  isDragged: boolean;
  isOver: boolean;
  onDragStart: () => void;
  onDragEnd: () => void;
  onDragOver: () => void;
  onDragLeave: () => void;
}) => {

  return (
    <CardContainer
      draggable
      isDragged={isDragged}
      isOver={isOver}
      onMouseDown={() => onDragStart()}
      onMouseUp={() => onDragEnd()}
      onTouchEnd={() => onDragEnd()}
      onDragEnd={() => onDragEnd()}
      onDragOver={(event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        onDragOver();
      }}
      onDragLeave={onDragLeave}
    >
      {content}
    </CardContainer>
  );
};

export default Card;