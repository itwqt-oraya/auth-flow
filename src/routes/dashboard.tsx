import {lazy} from 'react';
// Layout
import {PrivateLayout} from '@components/Layout';

// Pages
const Dashboard = lazy(() => import('@pages/dashboard'));

// Dashboard Module Modals
const DashboardAddPost = lazy(
  () => import('@modules/dashboard/DashboardAddPost')
);
const DashboardEditPost = lazy(
  () => import('@modules/dashboard/DashboardEditPost')
);
const DashboardDeletePost = lazy(
  () => import('@modules/dashboard/DashboardDeletePost')
);
const DashboardDetails = lazy(
  () => import('@modules/dashboard/DashboardDetails')
);
const DashboardPassword = lazy(
  () => import('@modules/dashboard/DashboardPassword')
);

const dashboard = {
  path: '/dashboard',
  isPrivate: true,
  layout: PrivateLayout,
  element: <Dashboard />,
  children: [
    {
      path: 'post',
      element: <DashboardAddPost toggle={() => ''} reload={() => ''} />,
    },
    {
      path: 'post/edit/:id',
      element: (
        <DashboardEditPost toggle={() => ''} reload={() => ''} id={''} />
      ),
    },
    {
      path: 'post/delete/:id',
      element: (
        <DashboardDeletePost toggle={() => ''} reload={() => ''} id={''} />
      ),
    },
    {
      path: 'details',
      element: <DashboardDetails toggle={() => ''} />,
    },
    {
      path: 'password',
      element: <DashboardPassword toggle={() => ''} />,
    },
  ],
};

export default dashboard;
