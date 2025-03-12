import React, {lazy} from 'react';
// Layout
import {PublicLayout} from '@components/Layout';

// Pages
const Login = lazy(() => import('@pages/Login'));
const Signup = lazy(() => import('@pages/Signup'));

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
