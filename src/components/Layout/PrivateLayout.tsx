import React, {useContext, useEffect} from 'react';
import {Outlet, useNavigate} from 'react-router';
import {Container} from 'reactstrap';
import {Nav} from '@components/NavBar';
import {AuthContext} from '@context/AuthContext';

export default function PublicLayout() {
  const {isAuth} = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth()) {
      navigate('/dashboard');
    } else {
      navigate('/');
    }
  }, []);

  return (
    <>
      <Nav />
      <Container>
        <Outlet />
      </Container>
    </>
  );
}
