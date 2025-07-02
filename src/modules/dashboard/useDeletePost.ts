import {useState} from 'react';
import {deletePost} from '@api/dashboard';

export const useDeletePost = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const deleteApi = async (id: string) => {
    setLoading(true);
    try {
      await deletePost(id);
    } catch (error) {
      setError(error instanceof Error ? error.message : String(error));
    } finally {
      setLoading(false);
    }
  };

  return {loading, error, deleteApi};
};
