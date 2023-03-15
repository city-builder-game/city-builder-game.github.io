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
        "cardList1": {
            cards: {
                "card-1": { content: "Card 1" },
                "card-2": { content: "Card 2" },
                "card-3": { content: "Card 3" },
                "card-4": { content: "" },
                "card-5": { content: "" },
                "card-6": { content: "" },
            },
            indicator: null,
        },
        "cardList2": {
            cards: {
                "card-1": { content: "Card 1" },
                "card-2": { content: "Card 2" },
                "card-3": { content: "Card 3" },
                "card-4": { content: "" },
                "card-5": { content: "" },
                "card-6": { content: "" },
            },
            indicator: null,
        },

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
        }
    },
});

export const { swapCards, setActiveList, setDraggedFromList, setListIndicator } = cardListSlice.actions;
export const selectCards = (listId: string) => (state: RootState) => state.cardList.cardLists[listId];
export default cardListSlice.reducer;
