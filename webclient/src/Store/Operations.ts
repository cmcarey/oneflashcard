import { api } from "..";
import {
  clearErrorMessage,
  resetState,
  setApiLoading,
  setCards,
  setErrorMessage,
  setSessionKey,
  setTags,
  setUser,
  Thunk
} from "./Store";

const displayError = (message: string): Thunk => async dispatch => {
  dispatch(setErrorMessage(message));

  setTimeout(() => {
    dispatch(clearErrorMessage());
  }, 3000);
};

export const loginOp = (
  email: string,
  password: string
): Thunk => async dispatch => {
  dispatch(setApiLoading(true));

  const res = await api.login(email, password);
  if (res.error === "BAD_INPUT") {
    dispatch(displayError("Bad input"));
  } else if (res.error === "INVALID_DETAILS") {
    dispatch(displayError("Invalid login details"));
  } else if (res.error === "SERVER_ERROR") {
    dispatch(displayError("Unknown error occurred"));
  } else {
    dispatch(setSessionKey(res.value!.sessionKey));
    dispatch(setUser({ name: res.value!.name, email }));
  }

  dispatch(setApiLoading(false));
};

export const registerOp = (
  name: string,
  email: string,
  password: string
): Thunk => async dispatch => {
  dispatch(setApiLoading(true));

  const res = await api.register(name, email, password);
  if (res.error === "BAD_INPUT") {
    dispatch(displayError("Bad input"));
  } else if (res.error === "EMAIL_USED") {
    dispatch(displayError("Email address is in use"));
  } else if (res.error === "SERVER_ERROR") {
    dispatch(displayError("Unknown error occurred"));
  } else {
    dispatch(setSessionKey(res.value!.sessionKey));
    dispatch(setUser({ name: name, email }));
  }

  dispatch(setApiLoading(false));
};

export const fetchUserOp = (sessionKey: string): Thunk => async dispatch => {
  dispatch(setApiLoading(true));

  const res = await api.getUser(sessionKey);
  if (res.error === "INVALID_SESSION_KEY") {
    // Reset state
    dispatch(resetState());
    dispatch(displayError("Session expired"));
    return;
  } else if (res.error === "SERVER_ERROR") {
    dispatch(displayError("Unknown error occurred"));
  } else {
    dispatch(setSessionKey(sessionKey));
    dispatch(setUser(res.value!));
  }

  dispatch(setApiLoading(false));
};

export const fetchCardsAndTags = (
  sessionKey: string
): Thunk => async dispatch => {
  dispatch(setApiLoading(true));

  const cardsRes = await api.getCards(sessionKey);
  if (cardsRes.error === "INVALID_SESSION_KEY") {
    // Reset state
    dispatch(resetState());
    dispatch(displayError("Session expired"));
    return;
  } else if (cardsRes.error === "SERVER_ERROR") {
    dispatch(displayError("Unknown error occurred"));
  } else {
    dispatch(setCards(cardsRes.value!));
  }

  const tagsRes = await api.getTags(sessionKey);
  if (tagsRes.error === "INVALID_SESSION_KEY") {
    // Reset state
    dispatch(resetState());
    dispatch(displayError("Session expired"));
    return;
  } else if (tagsRes.error === "SERVER_ERROR") {
    dispatch(displayError("Unknown error occurred"));
  } else {
    dispatch(setTags(tagsRes.value!));
  }

  dispatch(setApiLoading(false));
};
