export interface IModel {
  createUser(email: string, hashedPassword: string): Promise<void>;
  getUser(email: string): Promise<{ userID: string; hashedPassword: string }>;

  createSession(
    userID: string,
    deviceName: string
  ): Promise<{ sessionKey: string }>;
  getSession(sessionKey: string): Promise<{ userID: string }>;
  getSessions(
    userID: string
  ): Promise<{ sessionID: string; deviceName: string }[]>;
  deleteSession(sessionID: string): Promise<void>;
}
