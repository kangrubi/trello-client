export interface BoradResponse {
  id: number;
  title: string;
  backgroundColor: string;
  backgroundImage: string;
  createdBy: {
    username: string;
    email: string;
    profileImage: string;
  };
  members: [
    {
      username: string;
      email: string;
      profileImage: string;
    }
  ];
  lists: [
    {
      id: number;
      title: string;
      order: number;
      createdAt: string;
      updatedAt: string;
    }
  ];
  createdAt: string;
  updatedAt: string;
}

export interface PostBoardParams {
  title: string;
  backgroundColor: string;
  backgroundImage?: string;
}
