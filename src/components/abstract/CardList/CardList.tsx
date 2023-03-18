import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCards,
  swapCards,
  setActiveList,
  setListIndicator,
  setCardList,
  deleteCardList,
} from './cardListSlice';
import Card from "../Card/Card";

const CardListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  padding: 5px;
`;

interface ICard {
  content: string;
}

interface ICardList {
  cards: {
    [key: string]: ICard | null;
  };
  indicator: string | null;
}

interface CardListProps {
  listId: string;
  cardList: ICardList
}

const CardList: React.FC<CardListProps> = ({ listId, cardList }) => {
  const dispatch = useDispatch();
  console.log(listId, cardList)
  useEffect(() => {
    dispatch(setCardList({ cardList, listId }))
    return function cleanup() {
      dispatch(deleteCardList(listId))
    }
  }, [cardList, listId]);
  const cardListData = useSelector(selectCards(listId))
  const [draggedIndex, setDraggedIndex] = useState<string | null>(null);
  if (!cardListData) return null
  const { cards, indicator } = cardListData;

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
      <>
        {cards != undefined ? Object.entries(cards).map(([key, card]) => (
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
        )) : <></>}
      </>
    </CardListContainer>
  );
};

export default CardList;
