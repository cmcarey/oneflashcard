export type User = {
  userID: string;
  email: string;
  password: string;
};

export type Session = {
  sessionID: string;
  userID: string;
  key: string;
};
