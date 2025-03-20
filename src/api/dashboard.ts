import {http} from '@utils/http';
import {POST, POST_PAYLOAD} from '@models/posts';
import {LIST, Meta} from '@models/query';

// GET /post list of post
export const getPosts = (offset: number) => {
  return http<LIST<POST & Meta>>(
    'GET',
    `/post?limit=9&offset=${offset}&orderBy=updatedAt&order=DESC`
    // '/post?limit=10&offset=2&orderBy=updatedAt&order=DESC'
  );
};

// GET /post/:id
export const getPost = (id: string) => {
  return http<POST_PAYLOAD>('GET', `/post/${id}`);
};

// POST /post create post
// title , message
export const createPost = (data: POST_PAYLOAD) => {
  return http<POST_PAYLOAD>('POST', '/post', data);
};

// PUT /post/:id update post
// title , message
export const updatePost = (id: string, data: POST_PAYLOAD) => {
  return http<POST_PAYLOAD>('PUT', `/post/${id}`, data);
};

// DELETE /post/:id delete post
// id
export const deletePost = (id: string) => {
  return http('DELETE', `/post/${id}`);
};
