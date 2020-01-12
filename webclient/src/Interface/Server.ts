import { IServer } from "./IServer";

export class Server implements IServer {
  getCards() {
    return Promise.resolve([]);
  }
}
