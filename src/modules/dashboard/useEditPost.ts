import {useCallback, useState} from 'react';
import {updatePost, getPost} from '@api/dashboard';
import {POST_PAYLOAD} from '@/models/posts';

export const useEditPost = () => {
  const [response, setResponse] = useState<POST_PAYLOAD>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  // pUT data using api
  async function put(data: POST_PAYLOAD, id: string) {
    setLoading(true);
    try {
      const res = await updatePost(id, data);
      if (res) {
        alert(res.message);
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : String(error));
    } finally {
      setLoading(false);
    }
  }

  // get post by id
  const getPostById = useCallback(async (id: string) => {
    if (!id) return;
    setLoading(true);
    try {
      const res = await getPost(id);
      if (res) {
        setResponse(res);
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : String(error));
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchPost = useCallback(
    (postId: string) => {
      getPostById(postId);
    },
    [getPostById]
  );

  return {response, loading, error, put, fetchPost};
};
