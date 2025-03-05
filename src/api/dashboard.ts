import {http} from '@utils/http';

// GET /post list of post
export const getPosts = (token) => {
  return http('GET', '/post', null, token);
};

// POST /post create post
// title , message
export const createPost = (data) => {
  return http('POST', '/post', data);
};

// PUT /post/:id update post
// title , message
export const updatePost = (id, data) => {
  return http('PUT', `/post/${id}`, data);
};

// DELETE /post/:id delete post
// id
export const deletePost = (id) => {
  return http('DELETE', `/post/${id}`);
};
