// Layout
import {PublicLayout} from '@components/Layout';

// Pages
import Login from '@pages/Login';
import Signup from '@pages/Signup';

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
