export const createMockModel = () => ({
  createUser: jest.fn(),
  getUser: jest.fn(),

  createSession: jest.fn(),
  getSession: jest.fn(),
  getSessions: jest.fn(),
  deleteSession: jest.fn()
});

export const resetMockModel = (model: ReturnType<typeof createMockModel>) =>
  Object.values(model).forEach(mock => mock.mockReset());
