import {useContext, useEffect} from 'react';
import {Outlet, Navigate} from 'react-router';
import {Container} from 'reactstrap';
import {Nav} from '@components/NavBar';
import {useRefresh} from '@utils/useRefresh';
import {getCookie} from '@/utils/cookie';
import {AuthContext} from '@/context';

export default function PublicLayout() {
  const {isAuthenticated} = useContext(AuthContext);
  const token = getCookie('token');

  const {refreshUser} = useRefresh();

  useEffect(() => {
    if (!isAuthenticated && token) {
      refreshUser();
    }
  }, [refreshUser, isAuthenticated, token]);

  return (
    <>
      {isAuthenticated && token && <Navigate to="/dashboard" />}
      <Nav />
      <Container>
        <Outlet />
      </Container>
    </>
  );
}
