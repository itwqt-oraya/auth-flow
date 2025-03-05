import 'bootstrap/dist/css/bootstrap.css';

import {BrowserRouter, Routes, Route} from 'react-router';

// Layout
import {PublicLayout} from '@components/Layout';

// Pages
import Login from '@pages/Login';
import Signup from '@pages/Signup';

function App() {
  return (
    <>
      <BrowserRouter>
        <RouteMap />
      </BrowserRouter>
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

      <Route path="*" element={<p>Not found.</p>} />
    </Routes>
  );
}

export default App;
