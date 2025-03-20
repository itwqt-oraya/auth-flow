import {useState} from 'react';
import {updatePost} from '@api/dashboard';
import {POST_PAYLOAD} from '@/models/posts';

export const useEditPost = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

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

  return {loading, error, put};
};
