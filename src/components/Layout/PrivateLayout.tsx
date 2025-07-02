import {Outlet, Navigate} from 'react-router';
import {NavPrivate} from '@components/NavBar';
import {getCookie} from '@utils/cookie';

export default function PrivateLayout() {
  const token = getCookie('token');

  return (
    <>
      {!token && <Navigate to="/" />}
      <NavPrivate />
      <Outlet />
    </>
  );
}
