import React, {useContext} from 'react';
import {Link} from 'react-router';
import {Button} from 'reactstrap';
import {AuthContext} from '@context/AuthContext';

export default function Nav() {
  const {isAuthenticated, logoutUser} = useContext(AuthContext);

  return (
    <nav className="d-flex justify-content-between w-100 gap-2 p-3 border-bottom">
      {!isAuthenticated ? (
        <>
          <Button color="primary">
            <Link to="/" className="text-white">
              Login
            </Link>
          </Button>
          <Button color="primary">
            <Link to="/signup" className="text-white">
              Signup
            </Link>
          </Button>
        </>
      ) : (
        <>
          <Button color="danger" onClick={logoutUser}>
            Logout
          </Button>
        </>
      )}
    </nav>
  );
}
