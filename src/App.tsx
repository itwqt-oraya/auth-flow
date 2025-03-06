import 'bootstrap/dist/css/bootstrap.css';

import {BrowserRouter, Routes, Route, useLocation} from 'react-router';

// Layout
import {PublicLayout, PrivateLayout} from '@components/Layout';

// Pages
import Login from '@pages/Login';
import Signup from '@pages/Signup';
import Dashboard from '@pages/Dashboard';

// Dashboard Module Modals
import {
  DashboardAddPost,
  DashboardEditPost,
  DashboardDeletePost,
} from '@modules/dashboard';

import {AuthProvider} from '@context/AuthContext';

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <RouteMap />
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

function RouteMap() {
  const location = useLocation();
  const background = location.state?.background;
  return (
    <>
      <Routes location={background || location}>
        <Route path="/">
          <Route
            index
            element={
              <PublicLayout>
                <Login />
              </PublicLayout>
            }
          />
          <Route
            path="signup"
            element={
              <PublicLayout>
                <Signup />
              </PublicLayout>
            }
          />
        </Route>

        <Route path="/dashboard" element={<PrivateLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="post" element={<DashboardAddPost />} />
          <Route path="post/edit/:id" element={<DashboardEditPost />} />
          <Route path="post/delete/:id" element={<DashboardDeletePost />} />
        </Route>

        <Route path="*" element={<p>Not found.</p>} />
      </Routes>

      {background && (
        <Routes>
          <Route path="/dashboard/post" element={<DashboardAddPost />} />
          <Route
            path="/dashboard/post/edit/:id"
            element={<DashboardEditPost />}
          />
          <Route
            path="/dashboard/post/delete/:id"
            element={<DashboardDeletePost />}
          />
        </Routes>
      )}
    </>
  );
}

export default App;
