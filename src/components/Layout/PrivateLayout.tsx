import {Outlet, Navigate} from 'react-router';
import {NavPrivate} from '@components/NavBar';
import {getCookie} from '@utils/cookie';
import {useRefresh} from '@utils/useRefresh';
import {useContext, useEffect} from 'react';
import {AuthContext} from '@/context';

export default function PrivateLayout() {
  const {isAuthenticated} = useContext(AuthContext);
  const token = getCookie('token');
  const isAuth = getCookie('isAuthenticated');
  const {refreshUser} = useRefresh();

  useEffect(() => {
    if (token && !isAuth) {
      refreshUser();
      console.log('refreshing user');
    }
  }, [refreshUser, isAuth, token]);

  return (
    <>
      {!isAuthenticated && !token && <Navigate to="/" />}
      <NavPrivate />
      <Outlet />
    </>
  );
}
