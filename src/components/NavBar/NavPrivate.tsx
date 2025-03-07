import React, {useContext, useState} from 'react';
import {useLocation, Link} from 'react-router';
import {
  Button,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  Navbar,
  NavbarBrand,
} from 'reactstrap';
import {AuthContext} from '@context/AuthContext';

export default function NavPrivate() {
  const {user, isAuthenticated, logoutUser} = useContext(AuthContext);
  const userName = `${user.firstName} ${user.lastName}`;
  const location = useLocation();

  const [collapsed, setCollapsed] = useState(true);
  const toggleNavbar = () => setCollapsed(!collapsed);
  return (
    <Navbar className="d-flex justify-content-between w-100 gap-2 p-3 border-bottom">
      <Link to="/" className="text-decoration-none">
        <h2>{isAuthenticated ? `${userName}` : 'Blog'}</h2>
      </Link>

      <NavbarToggler onClick={toggleNavbar} className="me-2" />
      <Collapse isOpen={!collapsed} navbar className="mt-3">
        <Nav navbar align="end">
          <NavItem>
            <Link
              to="/dashboard/details"
              state={{background: location}}
              className="text-decoration-none"
            >
              Change Details
            </Link>
          </NavItem>
          <NavItem>
            <Link
              to="/dashboard/password"
              state={{background: location}}
              className="text-decoration-none"
            >
              Change Pass
            </Link>
          </NavItem>
          <hr />
          <NavItem>
            <Button color="danger" onClick={logoutUser}>
              Logout
            </Button>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
}
