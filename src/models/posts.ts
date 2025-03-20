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

// crud response only returns mesage
export type MSG_RESPONSE = {
  message: string;
};

// CRUD Interface
export interface ADD_POST {
  isOpen?: boolean;
  toggle: () => void;
  reload: () => void;
}

export interface DELETE_POST {
  isOpen?: boolean;
  toggle: () => void;
  id: string;
  POST_PAYLOAD: POST_PAYLOAD;
  reload: () => void;
}

export interface EDIT_POST {
  isOpen?: boolean;
  toggle: () => void;
  id: string;
  reload: () => void;
}
