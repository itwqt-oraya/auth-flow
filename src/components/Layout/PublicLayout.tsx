import {Outlet, Navigate} from 'react-router';
import {Container} from 'reactstrap';
import {Nav} from '@components/NavBar';
import {getCookie} from '@/utils/cookie';

export default function PublicLayout() {
  const token = getCookie('token');

  return (
    <>
      {token && <Navigate to="/dashboard" />}
      <Nav />
      <Container>
        <Outlet />
      </Container>
    </>
  );
}
