import {useState} from 'react';
import {signup} from '@api/auth';
import {useNavigate} from 'react-router';

interface SignupInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  async function postSignup(data: SignupInput) {
    setLoading(true);
    try {
      const res = await signup(data);
      if (res && res.status === 200) {
        alert('Signup successful');
        return nav('/');
      } else {
        alert('Signup failed');
        return;
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  return {loading, postSignup};
};
