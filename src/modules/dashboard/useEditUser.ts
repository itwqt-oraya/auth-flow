import {useContext, useState} from 'react';
import {AuthContext} from '@/context';
import {details} from '@api/user';
import {USER_UPDATE} from '@/models/user';
import {setCookie} from '@utils/cookie';

export const useEditUser = () => {
  const {setUser} = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const putEdit = async (payload: USER_UPDATE) => {
    setLoading(true);
    try {
      const {data} = await details(payload);

      if (data) {
        setCookie('user', JSON.stringify(data), 1);
        setUser({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          userId: data.userId,
        });
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : String(error));
    } finally {
      setLoading(false);
    }
  };
  return {loading, error, putEdit};
};
