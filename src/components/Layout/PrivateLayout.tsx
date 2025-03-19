import {useContext, useEffect} from 'react';
import {Outlet, Navigate} from 'react-router';
import {NavPrivate} from '@components/NavBar';
import {AuthContext} from '@/context';
import {getCookie} from '@utils/cookie';
import {useRefresh} from '@utils/useRefresh';

export default function PrivateLayout() {
  const {isAuthenticated} = useContext(AuthContext);
  const {refreshUser} = useRefresh();

  useEffect(() => {
    const token = getCookie('token');
    if (token && token !== 'undefined' && !isAuthenticated) {
      refreshUser();
    }
  }, [isAuthenticated, refreshUser]);

  return (
    <>
      {isAuthenticated ? (
        <>
          <NavPrivate />
          <Outlet />
        </>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
}
