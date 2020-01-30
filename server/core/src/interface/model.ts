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

export type Card = {
  cardID: string;
  userID: string;
  title: string;
  text: string;
  tagIDs: string[];
};

export type Tag = {
  tagID: string;
  userID: string;
  text: string;
  color: string;
};
