export interface User {
  userID: string;
  email: string;
}

export interface LinkedCard {
  cardID: string;
  title: string;
  text: string;
  tags: Tag[];
}

export interface Card {
  cardID: string;
  title: string;
  text: string;
  tagIDs: string[];
}

export interface Tag {
  tagID: string;
  text: string;
  color: string;
}
