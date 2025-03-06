import {http} from '@utils/http';

// GET /post list of post
export const getPosts = (token) => {
  return http('GET', '/post', null, token);
};

// GET /post/:id
export const getPost = (id, token) => {
  return http('GET', `/post/${id}`, null, token);
};

// POST /post create post
// title , message
export const createPost = (data) => {
  return http('POST', '/post', data);
};

// PUT /post/:id update post
// title , message
export const updatePost = (id, data, token) => {
  return http('PUT', `/post/${id}`, data, token);
};

// DELETE /post/:id delete post
// id
export const deletePost = (id, token) => {
  return http('DELETE', `/post/${id}`, null, token);
};
