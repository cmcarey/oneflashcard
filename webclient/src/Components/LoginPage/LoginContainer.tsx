import React from "react";
import { useDispatch } from "react-redux";
import { operations } from "../../Store/Operations";
import { useSelector } from "../../Store/Store";
import { LoginView } from "./LoginView";

export const LoginContainer = () => {
  const dispatch = useDispatch();
  const loggedIn = useSelector(state => state.App.user?.name) !== undefined;

  const login = (email: string, password: string) => {
    dispatch(operations.login(email, password));
  };

  const register = (name: string, email: string, password: string) => {
    dispatch(operations.register(name, email, password));
  };

  return <LoginView {...{ loggedIn, login, register }} />;
};
