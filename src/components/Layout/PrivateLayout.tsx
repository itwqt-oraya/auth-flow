import React, {useContext, useEffect} from 'react';
import {Outlet, Navigate} from 'react-router';
import {NavPrivate} from '@components/NavBar';
import {AuthContext} from '@context/AuthContext';

export default function PrivateLayout() {
  const {isAuthenticated, refreshAuth} = useContext(AuthContext);

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
