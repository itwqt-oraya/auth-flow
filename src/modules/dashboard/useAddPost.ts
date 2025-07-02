import {useState} from 'react';
import {createPost} from '@api/dashboard';
import {POST_PAYLOAD} from '@/models/posts';

export const useAddPost = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const post = async (data: POST_PAYLOAD) => {
    setLoading(true);
    try {
      await createPost(data);
    } catch (error) {
      setError(error instanceof Error ? error.message : String(error));
    } finally {
      setLoading(false);
    }
  };

  return {loading, error, post};
};
