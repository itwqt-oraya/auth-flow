import {useState} from 'react';
import {updatePost} from '@api/dashboard';
import {getCookie} from '@utils/cookie';

interface FormData {
  title: string;
  message: string;
}

export const useEditPost = () => {
  const [response, setResponse] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = getCookie('token');

  // pUT data using api
  async function put(formData: FormData, id: string) {
    setLoading(true);
    try {
      const res = await updatePost(id, formData, token);
      if (res.status === 200) {
        setResponse(res.data);
        alert('Post updated successfully');
      }
      setResponse(res.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  return {response, loading, error, put};
};
