import React, {useContext, useEffect} from 'react';
import {Navigate} from 'react-router';
import {Container} from 'reactstrap';
import {Nav} from '@components/NavBar';
import {AuthContext} from '@context/AuthContext';

export default function PublicLayout({children}) {
  const {isAuthenticated, refreshAuth} = useContext(AuthContext);
  return (
    <>
      {isAuthenticated ? <Navigate to="/dashboard" /> : null}
      <Nav />
      <Container>{children}</Container>
    </>
  );
}
