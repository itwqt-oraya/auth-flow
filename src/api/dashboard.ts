import {http} from '@utils/http';
import {POST, POST_PAYLOAD} from '@models/posts';
import {LIST} from '@models/query';

// GET /post list of post
export const getPosts = () => {
  return http<LIST<POST>>('GET', '/post');
};

// GET /post/:id
export const getPost = (id: string, token: string) => {
  return http('GET', `/post/${id}`, null, token);
};

// POST /post create post
// title , message
export const createPost = (data: POST_PAYLOAD) => {
  return http<{message: string}>('POST', '/post', data);
};

// PUT /post/:id update post
// title , message
export const updatePost = (id: string, data: POST_PAYLOAD, token: string) => {
  return http('PUT', `/post/${id}`, data, token);
};

// DELETE /post/:id delete post
// id
export const deletePost = (id: string, token: string) => {
  return http('DELETE', `/post/${id}`, null, token);
};
