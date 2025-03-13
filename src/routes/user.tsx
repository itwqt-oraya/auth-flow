import {lazy} from 'react';
// Layout
import {PublicLayout} from '@components/Layout';

// Pages
const Login = lazy(() => import('@pages/login'));
const Signup = lazy(() => import('@pages/signup'));

const user = {
  path: '/',
  isPrivate: false,
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
