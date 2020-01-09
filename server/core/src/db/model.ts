export interface IModel {
  createUser(email: string, hashedPassword: string): Promise<void>;
  getUser(
    email: string
  ): Promise<void | { userID: string; hashedPassword: string }>;

  createSession(
    userID: string,
    sessionKey: string,
    deviceName: string
  ): Promise<void>;
  getSession(sessionKey: string): Promise<void | { userID: string }>;
  getSessions(
    userID: string
  ): Promise<{ sessionID: string; deviceName: string }[]>;
  deleteSession(sessionID: string): Promise<void>;
}
