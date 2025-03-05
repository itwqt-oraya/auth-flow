import React from 'react';
import {Outlet} from 'react-router';
import {Container} from 'reactstrap';
import {Nav} from '@components/NavBar';
export default function PublicLayout() {
  return (
    <>
      <Nav />
      <Container>
        <Outlet />
      </Container>
    </>
  );
}
