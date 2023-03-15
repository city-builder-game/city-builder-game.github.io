import React, { useState } from "react";
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "../../../app/store";
import { setCards, setDraggedIndex, setIndicatorIndex, swapCards } from './cardListSlice';
import Card from "../Card/Card";

const CardListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  padding: 5px;
`;

const CardList = () => {
  const dispatch = useDispatch();
  const cards = useSelector((state: RootState) => state.cardList.cards);
  const draggedIndex = useSelector((state: RootState) => state.cardList.draggedIndex);
  const indicatorIndex = useSelector((state: RootState) => state.cardList.indicatorIndex);

  const handleDragStart = (index: number) => {
    dispatch(setDraggedIndex(index));
  };

  const handleDragEnd = (index: number) => {
    dispatch(swapCards());
  };

  const handleDragOver = (index: number) => {
    dispatch(setIndicatorIndex(index));
  };

  const handleDragLeave = (index: number) => {
    dispatch(setIndicatorIndex(null));
  };

  return (
    <CardListContainer>
      {cards.map((card, index) => (
        <Card
          key={card.id}
          content={card.content || ''}
          isDragged={draggedIndex === index}
          isOver={indicatorIndex === index}
          onDragStart={() => handleDragStart(index)}
          onDragEnd={() => handleDragEnd(index)}
          onDragOver={() => handleDragOver(index)}
          onDragLeave={() => handleDragLeave(index)}
        />
      ))}
    </CardListContainer>
  );
};

export default CardList;
