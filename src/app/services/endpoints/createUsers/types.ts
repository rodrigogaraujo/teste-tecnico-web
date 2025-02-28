export type CreateUserPayload = {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
};

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  picture: string;
};