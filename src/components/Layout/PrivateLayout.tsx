import {useContext, useEffect} from 'react';
import {Outlet, Navigate, useNavigate} from 'react-router';
import {NavPrivate} from '@components/NavBar';
import {AuthContext} from '@context/AuthContext';

export default function PrivateLayout() {
  const {user, isAuthenticated, refreshAuth} = useContext(AuthContext);
  const nav = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      refreshAuth();
      nav('/');
    }
  }, [isAuthenticated, refreshAuth, user]);

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
