import { Card } from "../Store/Model";

export interface IServer {
  getCards(): Promise<Card[]>;
}
