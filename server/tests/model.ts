export const createModelMock = () => ({
  createUser: jest.fn(),
  getUser: jest.fn(),

  createSession: jest.fn(),
  getSession: jest.fn(),
  getSessions: jest.fn(),
  deleteSession: jest.fn()
});
