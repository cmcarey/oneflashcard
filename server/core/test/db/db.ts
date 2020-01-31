import { IDb } from "../../src/interface/IDb";
import { MockDB } from "./mockdb";
import { RealDB } from "./realdb";

export interface ITestDB {
  db: IDb;
  reset(): Promise<void>;
}

export const getDB = (): ITestDB => {
  if (process.env.TEST_DB === "MOCK") return new MockDB();
  else if (process.env.TEST_DB === "REAL") return new RealDB();
  else throw new Error("Unsupported test DB type");
};
