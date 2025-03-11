import 'bootstrap/dist/css/bootstrap.css';
import renderRoutes from '@utils/render-routes';
import {AuthProvider} from '@context/AuthContext';

// Routes
import {webRoutes} from '@routes/';
function App() {
  return (
    <>
      <AuthProvider>{renderRoutes(webRoutes)}</AuthProvider>
    </>
  );
}

export default App;
