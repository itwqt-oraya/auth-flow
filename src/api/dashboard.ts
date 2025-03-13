import {http} from '@utils/http';

// GET /post list of post
export const getPosts = (token: string) => {
  return http('GET', '/post', null, token);
};

// GET /post/:id
export const getPost = (id: string, token: string) => {
  return http('GET', `/post/${id}`, null, token);
};

// POST /post create post
// title , message
export const createPost = (data, token: string) => {
  return http('POST', '/post', data, token);
};

// PUT /post/:id update post
// title , message
export const updatePost = (id: string, data, token: string) => {
  return http('PUT', `/post/${id}`, data, token);
};

// DELETE /post/:id delete post
// id
export const deletePost = (id: string, token: string) => {
  return http('DELETE', `/post/${id}`, null, token);
};
