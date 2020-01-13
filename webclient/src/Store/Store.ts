import {
  Action,
  combineReducers,
  configureStore,
  createSlice,
  PayloadAction
} from "@reduxjs/toolkit";
import {
  TypedUseSelectorHook,
  useSelector as useReduxSelector
} from "react-redux";
import { ThunkAction } from "redux-thunk";
import { Card, Tag, User } from "./Model";

type AppState = {
  apiLoading: boolean;
  errorMessage?: string;
  sessionKey?: string;
  user?: User;
  cards: Card[];
  tags: Tag[];
};

const initialState: AppState = {
  apiLoading: false,
  cards: [],
  tags: []
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setApiLoading(state, action: PayloadAction<boolean>) {
      state.apiLoading = action.payload;
    },
    setErrorMessage(state, action: PayloadAction<string>) {
      state.errorMessage = action.payload;
    },
    clearErrorMessage(state) {
      state.errorMessage = undefined;
    },
    setSessionKey(state, action: PayloadAction<string>) {
      state.sessionKey = action.payload;
    },
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    setCards(state, action: PayloadAction<Card[]>) {
      state.cards = action.payload;
    },
    updateCard(state, action: PayloadAction<{ cardID: string; card: Card }>) {
      const cardIDs = state.cards.map(card => card.cardID);
      state.cards[cardIDs.indexOf(action.payload.cardID)] = action.payload.card;
    },
    setTags(state, action: PayloadAction<Tag[]>) {
      state.tags = action.payload;
    },
    updateTag(state, action: PayloadAction<{ tagID: string; tag: Tag }>) {
      const tagIDs = state.tags.map(tag => tag.tagID);
      state.tags[tagIDs.indexOf(action.payload.tagID)] = action.payload.tag;
    }
  }
});

export const {
  setApiLoading,
  setErrorMessage,
  clearErrorMessage,
  setSessionKey,
  setUser,
  setCards,
  updateCard,
  setTags,
  updateTag
} = appSlice.actions;

export const reducer = combineReducers({ appSlice: appSlice.reducer });
export type RootState = ReturnType<typeof reducer>;
export type Thunk = ThunkAction<void, RootState, null, Action<string>>;
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
export const store = configureStore({ reducer });
