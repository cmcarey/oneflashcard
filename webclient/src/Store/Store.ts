import {
  combineReducers,
  configureStore,
  createSlice,
  PayloadAction
} from "@reduxjs/toolkit";
import {
  TypedUseSelectorHook,
  useSelector as useReduxSelector
} from "react-redux";
import { Card, Tag, User } from "./Model";

type AppState = {
  sessionKey?: string;
  user?: User;
  cards: Card[];
  tags: Tag[];
};

const initialState: AppState = {
  cards: [],
  tags: []
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setSessionKey(state, action: PayloadAction<string>) {
      state.sessionKey = action.payload;
    },
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    setCards(state, action: PayloadAction<Card[]>) {
      state.cards = action.payload;
    },
    setTags(state, action: PayloadAction<Tag[]>) {
      state.tags = action.payload;
    }
  }
});

export const { setSessionKey, setUser, setCards, setTags } = appSlice.actions;

export const reducer = combineReducers({ appSlice: appSlice.reducer });
export type RootState = ReturnType<typeof reducer>;
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
export const store = configureStore({ reducer });
