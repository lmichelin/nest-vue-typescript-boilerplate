export type CreateUserDto = {
  email: string;
  firstName?: string;
  lastName?: string;
};

export type User = {
  _id: string;
} & CreateUserDto;
