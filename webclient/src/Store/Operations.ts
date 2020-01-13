import { api } from "..";
import {
  clearErrorMessage,
  setApiLoading,
  setErrorMessage,
  setSessionKey,
  setUser,
  Thunk
} from "./Store";

const displayError = (message: string): Thunk => async dispatch => {
  dispatch(setErrorMessage(message));

  setTimeout(() => {
    dispatch(clearErrorMessage());
  }, 5000);
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
    dispatch(displayError("Form was invalid"));
  } else if (res.error === "SERVER_ERROR") {
    dispatch(displayError("Unknown error occurred"));
  } else {
    dispatch(setSessionKey(res.value!.sessionKey));
    dispatch(setUser({ name: res.value!.name, email }));
  }

  dispatch(setApiLoading(false));
};
