import React, { useState } from "react";
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "../../../app/store";
import { selectCards, swapCards, setActiveList, setListIndicator } from './cardListSlice';
import Card from "../Card/Card";

const CardListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  padding: 5px;
`;

interface CardListProps {
  listId: string;
}

const CardList: React.FC<CardListProps> = ({ listId }) => {
  const dispatch = useDispatch();
  const { cards, indicator } = useSelector(selectCards(listId));
  const [draggedIndex, setDraggedIndex] = useState<string | null>(null);

  const handleDragStart = (index: string) => {
    setDraggedIndex(index);
  };

  const handleDragEnd = (index: string) => {
    dispatch(swapCards({ draggedIndex, listId }));
    dispatch(setListIndicator({ listId, indicator: null }))
    setDraggedIndex(null);
    dispatch(setActiveList(null))
  };

  const handleDragOver = (index: string) => {
    dispatch(setListIndicator({ listId, indicator: index }))
    dispatch(setActiveList(listId))
  };

  const handleDragLeave = (index: string) => {
    dispatch(setListIndicator({ listId, indicator: null }))
  };

  return (
    <CardListContainer>
      {Object.entries(cards).map(([key, card]) => (
        <Card
          key={key}
          content={card?.content || ''}
          isDragged={draggedIndex === key}
          isOver={indicator === key}
          onDragStart={() => handleDragStart(key)}
          onDragEnd={() => handleDragEnd(key)}
          onDragOver={() => handleDragOver(key)}
          onDragLeave={() => handleDragLeave(key)}
        />
      ))}
    </CardListContainer>
  );
};

export default CardList;
