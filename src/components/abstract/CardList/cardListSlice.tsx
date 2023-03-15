import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";

interface ICard {
    id: string;
    content?: string;
}

interface CardListState {
    cards: ICard[];
    draggedIndex: number | null;
    indicatorIndex: number | null;
}

const initialState: CardListState = {
    cards: [
        { id: "card-1", content: "Card 1" },
        { id: "card-2", content: "Card 2" },
        { id: "card-3", content: "Card 3" },
        { id: "card-4", content: "" },
        { id: "card-5", content: "" },
        { id: "card-6", content: "" },
    ],
    draggedIndex: null,
    indicatorIndex: null,
};

export const cardListSlice = createSlice({
    name: "cardList",
    initialState,
    reducers: {
        setCards: (state, action: PayloadAction<ICard[]>) => {
            state.cards = action.payload;
        },
        setDraggedIndex: (state, action: PayloadAction<number | null>) => {
            state.draggedIndex = action.payload;
        },
        setIndicatorIndex: (state, action: PayloadAction<number | null>) => {
            state.indicatorIndex = action.payload;
        },
        swapCards: (state) => {
            if (state.draggedIndex !== null && state.indicatorIndex !== null) {
                const newCards = state.cards.slice();
                [newCards[state.draggedIndex], newCards[state.indicatorIndex]] = [newCards[state.indicatorIndex], newCards[state.draggedIndex]];
                state.cards = newCards;
            }
            state.draggedIndex = null;
            state.indicatorIndex = null;
        },
    },
});

export const { setCards, setDraggedIndex, setIndicatorIndex, swapCards } = cardListSlice.actions;

export default cardListSlice.reducer;
