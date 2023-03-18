import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";

interface ICard {
    content: string;
}

interface ICardList {
    cards: {
        [key: string]: ICard | null;
    };
    indicator: string | null;
}

interface CardListState {
    cardLists: {
        [key: string]: ICardList;
    };
    draggedFrom: string | null;
    activeList: string | null;
}

const initialState: CardListState = {
    cardLists: {
    },
    draggedFrom: null,
    activeList: null,
};

export const cardListSlice = createSlice({
    name: "cardList",
    initialState,
    reducers: {
        swapCards: (state, action: PayloadAction<{
            draggedIndex: string | null, listId: string
        }>) => {
            const { draggedIndex, listId } = action.payload
            const { cardLists, activeList } = state

            if (!activeList || !draggedIndex) return
            const { indicator } = cardLists[activeList]
            if (!indicator) return

            const card1 = cardLists[listId].cards[draggedIndex]
            cardLists[listId].cards[draggedIndex] = cardLists[activeList].cards[indicator]

            cardLists[activeList].cards[indicator] = card1
            cardLists[activeList].indicator = null
        },
        setActiveList: (state, action: PayloadAction<string | null>) => {
            state.activeList = action.payload
        },
        setDraggedFromList: (state, action: PayloadAction<string | null>) => {
            state.draggedFrom = action.payload
        },
        setListIndicator: (state, action: PayloadAction<{ listId: string, indicator: string | null }>) => {
            state.cardLists[action.payload.listId].indicator = action.payload.indicator
        },
        setCardList: (state, action: PayloadAction<{
            cardList: ICardList,
            listId: string
        }>) => {
            const { cardList, listId } = action.payload;
            state.cardLists[listId] = cardList
        },
        deleteCardList: (state, action: PayloadAction<string>) => {
            delete state.cardLists[action.payload]
        }
    },
});

export const {
    swapCards,
    setActiveList,
    setDraggedFromList,
    setListIndicator,
    setCardList,
    deleteCardList,
} = cardListSlice.actions;
export const selectCards = (listId: string) => (state: RootState) => state.cardList.cardLists[listId];
export default cardListSlice.reducer;
