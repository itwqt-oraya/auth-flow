import React, {useContext} from 'react';
import {Link} from 'react-router';
import {Button} from 'reactstrap';
import {AuthContext} from '@context/AuthContext';

export default function Nav() {
  const {user, isAuthenticated, logoutUser} = useContext(AuthContext);

  return (
    <nav className="d-flex justify-content-between w-100 gap-2 p-3 border-bottom">
      <Link to="/" className="text-decoration-none">
        <h2>'Blog'</h2>
      </Link>
      <>
        <div className="d-flex gap-2">
          <Button color="primary">
            <Link to="/" className="text-white text-decoration-none">
              Login
            </Link>
          </Button>
          <Button color="primary">
            <Link to="/signup" className="text-white text-decoration-none">
              Signup
            </Link>
          </Button>
        </div>
      </>
    </nav>
  );
}
