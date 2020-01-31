export type User = {
  user_id: string;
  email: string;
  password: string;
};

export type Session = {
  session_id: string;
  user_id: string;
  key: string;
};

export type Card = {
  card_id: string;
  user_id: string;
  title: string;
  text: string;
  tag_ids: string[];
};

export type Tag = {
  tag_id: string;
  user_id: string;
  text: string;
  color: string;
};
