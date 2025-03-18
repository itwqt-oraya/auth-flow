import {useContext, useEffect} from 'react';
import {Navigate, Outlet} from 'react-router';
import {Container} from 'reactstrap';
import {Nav} from '@components/NavBar';
import {AuthContext} from '@context/AuthContext';
import {getCookie} from '@utils/cookie';
import {useRefresh} from '@utils/useRefresh';

export default function PublicLayout() {
  const {isAuthenticated} = useContext(AuthContext);
  const {refreshUser} = useRefresh();

  useEffect(() => {
    const token = getCookie('token');
    if (token && token !== 'undefined' && !isAuthenticated) {
      refreshUser();
    }
  }, [isAuthenticated]);

  return (
    <>
      {isAuthenticated ? <Navigate to="/dashboard" /> : null}
      <Nav />
      <Container>
        <Outlet />
      </Container>
    </>
  );
}
