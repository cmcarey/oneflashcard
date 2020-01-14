import { api } from "..";
import { AppActions, Thunk } from "./Store";

export const operations = {
  displayError: (message: string): Thunk => async dispatch => {
    dispatch(AppActions.setErrorMessage(message));

    setTimeout(() => {
      dispatch(AppActions.clearErrorMessage());
    }, 3000);
  },

  login: (email: string, password: string): Thunk => async dispatch => {
    dispatch(AppActions.startApiCall());

    const res = await api.login(email, password);
    if ("error" in res) {
      if (res.error === "BAD_INPUT") {
        dispatch(operations.displayError("Bad input"));
      } else if (res.error === "INVALID_DETAILS") {
        dispatch(operations.displayError("Invalid login details"));
      } else if (res.error === "SERVER_ERROR") {
        dispatch(operations.displayError("Unknown error occurred"));
      }
    } else {
      dispatch(AppActions.setSessionKey(res.value.sessionKey));
      dispatch(AppActions.setUser({ name: res.value.name, email }));
    }

    dispatch(AppActions.finishApiCall());
  },

  register: (
    name: string,
    email: string,
    password: string
  ): Thunk => async dispatch => {
    dispatch(AppActions.startApiCall());

    const res = await api.register(name, email, password);
    if ("error" in res) {
      if (res.error === "BAD_INPUT") {
        dispatch(operations.displayError("Bad input"));
      } else if (res.error === "EMAIL_USED") {
        dispatch(operations.displayError("Email address is in use"));
      } else if (res.error === "SERVER_ERROR") {
        dispatch(operations.displayError("Unknown error occurred"));
      }
    } else {
      dispatch(AppActions.setSessionKey(res.value.sessionKey));
      dispatch(AppActions.setUser({ name: name, email }));
    }

    dispatch(AppActions.finishApiCall());
  },

  fetchUser: (sessionKey: string): Thunk => async dispatch => {
    dispatch(AppActions.startApiCall());

    const res = await api.getUser(sessionKey);
    if ("error" in res) {
      if (res.error === "INVALID_SESSION_KEY") {
        // Reset state
        dispatch(AppActions.resetState());
        dispatch(operations.displayError("Session expired"));
        return;
      } else if (res.error === "SERVER_ERROR") {
        dispatch(operations.displayError("Unknown error occurred"));
      }
    } else {
      dispatch(AppActions.setSessionKey(sessionKey));
      dispatch(AppActions.setUser(res.value));
    }

    dispatch(AppActions.finishApiCall());
  },

  fetchCardsAndTags: (sessionKey: string): Thunk => async dispatch => {
    dispatch(AppActions.startApiCall());

    const tagsRes = await api.getTags(sessionKey);
    if ("error" in tagsRes) {
      if (tagsRes.error === "INVALID_SESSION_KEY") {
        // Reset state
        dispatch(AppActions.resetState());
        dispatch(operations.displayError("Session expired"));
        return;
      } else if (tagsRes.error === "SERVER_ERROR") {
        dispatch(operations.displayError("Unknown error occurred"));
      }
    } else {
      dispatch(AppActions.setTags(tagsRes.value));
    }

    const cardsRes = await api.getCards(sessionKey);
    if ("error" in cardsRes) {
      if (cardsRes.error === "INVALID_SESSION_KEY") {
        // Reset state
        dispatch(AppActions.resetState());
        dispatch(operations.displayError("Session expired"));
        return;
      } else if (cardsRes.error === "SERVER_ERROR") {
        dispatch(operations.displayError("Unknown error occurred"));
      }
    } else {
      dispatch(AppActions.setCards(cardsRes.value));
    }

    dispatch(AppActions.finishApiCall());
  }
};
