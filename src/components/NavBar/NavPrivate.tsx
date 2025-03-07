import React, {useContext, useState} from 'react';
import {useLocation, Link} from 'react-router';
import {Button} from 'reactstrap';
import {AuthContext} from '@context/AuthContext';

export default function NavPrivate() {
  const {user, isAuthenticated, logoutUser} = useContext(AuthContext);
  const userName = `${user.firstName} ${user.lastName}`;
  const location = useLocation();

  return (
    <nav className="d-flex justify-content-between w-100 gap-2 p-3 border-bottom">
      <Link to="/" className="text-decoration-none">
        <h2>{isAuthenticated ? `${userName}` : 'Blog'}</h2>
      </Link>
      <>
        <div className="d-flex gap-2">
          <Button outline color="primary">
            <Link
              to="/dashboard/post"
              state={{background: location}}
              className="text-decoration-none"
            >
              Create Post
            </Link>
          </Button>

          <Button outline color="primary">
            <Link
              to="/dashboard/details"
              state={{background: location}}
              className="text-decoration-none"
            >
              Change Details
            </Link>
          </Button>

          <Button outline color="primary">
            <Link
              to="/dashboard/password"
              state={{background: location}}
              className="text-decoration-none"
            >
              Change Pass
            </Link>
          </Button>

          <Button color="danger" onClick={logoutUser}>
            Logout
          </Button>
        </div>
      </>
    </nav>
  );
}
