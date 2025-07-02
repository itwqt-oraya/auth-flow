import {useState} from 'react';
import {updatePost} from '@api/dashboard';
import {POST_PAYLOAD} from '@/models/posts';

export const useEditPost = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const put = async (data: POST_PAYLOAD, id: string) => {
    setLoading(true);
    try {
      await updatePost(id, data);
    } catch (error) {
      setError(error instanceof Error ? error.message : String(error));
    } finally {
      setLoading(false);
    }
  };

  return {loading, error, put};
};
