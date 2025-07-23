// src/mocks/authMock.ts
export const mockUser = {
  id: "1",
  username: "demo_user",
  email: "demo@example.com",
  nombre: "Demo",
  apellido: "User"
};

export const mockLoginResponse = {
  accessToken: "mock-jwt-token",
  tokenType: "Bearer",
  message: "Login exitoso",
  alias: "demo.wizard",
  cvu: "0000003100012345678901",
  user: mockUser
};

export const mockRegisterResponse = {
  accessToken: "mock-jwt-token",
  tokenType: "Bearer",
  message: "Registro exitoso",
  alias: "crypto.newbie",
  cvu: "0000003100098765432109"
};
