import React from "react";
import { useDispatch } from "react-redux";
import { loginOp, registerOp } from "../../Store/Operations";
import { useSelector } from "../../Store/Store";
import { LoginView } from "./LoginView";

export const LoginPage = () => {
  const dispatch = useDispatch();
  const loggedIn =
    useSelector(state => state.appSlice.user?.name) !== undefined;

  const login = (email: string, password: string) => {
    dispatch(loginOp(email, password));
  };

  const register = (name: string, email: string, password: string) => {
    dispatch(registerOp(name, email, password));
  };

  return <LoginView {...{ loggedIn, login, register }} />;
};
