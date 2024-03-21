export type User = {
  id: number;
  name: string;
  surname: string;
  email: string;
  password: string;
  isAdmin: boolean;
};

export type UserNopass = Omit<User, "password">;
