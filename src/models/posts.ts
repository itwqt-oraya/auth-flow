export type POST = {
  postId: string;
  title: string;
  message: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
};

export type POST_PAYLOAD = Pick<POST, 'title' | 'message'>;

export type POSTS = POST[] | [];
