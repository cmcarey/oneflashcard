export interface User {
  name: string;
  email: string;
}

export interface Card {
  cardID: string;
  title: string;
  text: string;
  tagIDs: string[];
}

export interface Tag {
  tagID: string;
  name: string;
  color: string;
}
