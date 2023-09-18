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
  user: AuthUser;
  accessToken: string;
  refreshToken: string;
};
