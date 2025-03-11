// Layout
import {PrivateLayout} from '@components/Layout';

// Pages
import Dashboard from '@pages/Dashboard';

// Dashboard Module Modals
import {
  DashboardAddPost,
  DashboardEditPost,
  DashboardDeletePost,
  DashboardDetails,
  DashboardPassword,
} from '@modules/dashboard';

const dashboard = {
  path: '/dashboard',
  isPrivate: true,
  layout: PrivateLayout,
  element: <Dashboard />,
  children: [
    {
      path: 'post',
      element: <DashboardAddPost />,
    },
    {
      path: 'post/edit/:id',
      element: <DashboardEditPost />,
    },
    {
      path: 'post/delete/:id',
      element: <DashboardDeletePost />,
    },
    {
      path: 'details',
      element: <DashboardDetails />,
    },
    {
      path: 'password',
      element: <DashboardPassword />,
    },
  ],
};

export default dashboard;
