export type AuthUser = {
  id: number;
  username: string;
  email: string;
  password: string;
  profileImage: string;
  createdAt: string;
  updatedAt: string;
};

export type UserResponse = {
  access_token: string;
  refresh_token: string;
  user: AuthUser;
};
