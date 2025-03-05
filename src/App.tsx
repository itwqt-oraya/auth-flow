import 'bootstrap/dist/css/bootstrap.css';

import {BrowserRouter, Routes, Route, useNavigate} from 'react-router';

// Layout
import {PublicLayout, PrivateLayout} from '@components/Layout';

// Pages
import Login from '@pages/Login';
import Signup from '@pages/Signup';
import Dashboard from '@pages/Dashboard';

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
  return (
    <Routes>
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Route>

      <Route path="/dashboard" element={<PrivateLayout />}>
        <Route index element={<Dashboard />} />
      </Route>

      <Route path="*" element={<p>Not found.</p>} />
    </Routes>
  );
}

export default App;
