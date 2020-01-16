export interface User {
  userID: string;
  email: string;
}

export interface Card {
  cardID: string;
  title: string;
  text: string;
  tags: Tag[];
}

export interface Tag {
  tagID: string;
  text: string;
  color: string;
}
