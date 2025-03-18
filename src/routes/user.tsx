import {lazy} from 'react';
import {RouteProps} from '@/models/routes';
// Layout
import {PublicLayout} from '@components/Layout';

// Pages
const Login = lazy(() => import('@pages/login'));
const Signup = lazy(() => import('@pages/signup'));

const user: RouteProps = {
  path: '/',
  layout: PublicLayout,
  element: <Login />,
  children: [
    {
      path: 'signup',
      element: <Signup />,
    },
  ],
};

export default user;
