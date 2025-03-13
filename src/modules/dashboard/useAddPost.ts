import {useState} from 'react';
import {createPost} from '@api/dashboard';
import {getCookie} from '@utils/cookie';

interface FormData {
  title: string;
  message: string;
}

export const useAddPost = () => {
  const [response, setResponse] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = getCookie('token');

  // post data using api
  async function post(formData: FormData) {
    setLoading(true);
    try {
      const res = await createPost(formData, token);
      if (res.status === 200) {
        setResponse(res.data);
        alert('Post created successfully');
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  return {response, loading, error, post};
};
