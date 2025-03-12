import React, {lazy} from 'react';
// Layout
import {PrivateLayout} from '@components/Layout';

// Pages
const Dashboard = lazy(() => import('@pages/Dashboard'));

// Dashboard Module Modals
const DashboardAddPost = lazy(() => import('@modules/dashboard/'));
const DashboardEditPost = lazy(() => import('@modules/dashboard/'));
const DashboardDeletePost = lazy(() => import('@modules/dashboard/'));
const DashboardDetails = lazy(() => import('@modules/dashboard/'));
const DashboardPassword = lazy(() => import('@modules/dashboard/'));

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
