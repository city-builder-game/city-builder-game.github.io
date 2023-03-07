import React, { useState } from "react";
import styled from 'styled-components';
import Card from "../Card/Card";

const CardListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  padding: 5px;
`;

interface ICard {
  id: string;
  content: string;
}

const initialCards: ICard[] = [
  { id: "card-1", content: "Card 1" },
  { id: "card-2", content: "Card 2" },
  { id: "card-3", content: "Card 3" },
  { id: "card-4", content: "" },
  { id: "card-5", content: "" },
  { id: "card-6", content: "" },
];

const CardList = () => {
  const [cards, setCards] = useState<ICard[]>(initialCards);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [indicatorIndex, setIndicatorIndex] = useState<number | null>(null);

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragEnd = (index: number) => {
    if (draggedIndex !== null && indicatorIndex !== null) {
      // Swaps cards at draggedIndex and indicatorIndex
      setCards(prevCards => {
        const newCards = prevCards.slice();
        [newCards[draggedIndex], newCards[indicatorIndex]] = [newCards[indicatorIndex], newCards[draggedIndex]];
        return newCards;
      })
    }
  
    setDraggedIndex(null);
    setIndicatorIndex(null);
  };

  const handleDragOver = (index: number) => {
    setIndicatorIndex(index);
  };

  const handleDragLeave = (index: number) => {
    setIndicatorIndex(null);
  };

  return (
    <CardListContainer>
      {cards.map((card, index) => (
        <Card
          key={card.id}
          content={card.content}
          isDragged={draggedIndex === index}
          isOver={indicatorIndex === index}
          onDragStart={() => handleDragStart(index)}
          onDragEnd={() => handleDragEnd(index)}
          onDragOver={() => handleDragOver(index)}
          onDragLeave={() => handleDragLeave(index)}
        />
      ))}
      {indicatorIndex !== null && (
        <div className="indicator" style={{ top: `${indicatorIndex * 60}px` }} />
      )}
    </CardListContainer>
  );
};

export default CardList;