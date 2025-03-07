import React, {useContext, useEffect} from 'react';
import {Navigate, useNavigate} from 'react-router';
import {Container} from 'reactstrap';
import {Nav} from '@components/NavBar';
import {AuthContext} from '@context/AuthContext';

export default function PublicLayout({children}) {
  const {isAuthenticated, user, refreshAuth} = useContext(AuthContext);
  const nav = useNavigate();

  useEffect(() => {
    if (isAuthenticated && user) {
      nav('/dashboard');
    } else {
      nav('/');
    }
  }, [isAuthenticated, refreshAuth, user]);

  return (
    <>
      {isAuthenticated ? <Navigate to="/dashboard" /> : null}
      <Nav />
      <Container>{children}</Container>
    </>
  );
}
