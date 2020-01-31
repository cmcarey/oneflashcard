// API types

export interface User {
  user_id: string;
  email: string;
}

export interface Card {
  card_id: string;
  title: string;
  text: string;
  tag_ids: string[];
}

export interface Tag {
  tag_id: string;
  text: string;
  color: string;
}

//

export interface LinkedCard {
  cardID: string;
  title: string;
  text: string;
  tags: Tag[];
}
