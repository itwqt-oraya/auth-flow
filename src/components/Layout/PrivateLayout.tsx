import React, {useContext, useEffect} from 'react';
import {Outlet, Navigate} from 'react-router';
import {NavPrivate} from '@components/NavBar';
import {AuthContext} from '@context/AuthContext';

export default function PrivateLayout() {
  const {user, isAuthenticated, refreshAuth} = useContext(AuthContext);

  useEffect(() => {
    if (!isAuthenticated && !user) {
      refreshAuth();
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
