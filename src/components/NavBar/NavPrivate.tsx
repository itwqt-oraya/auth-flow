import React, {useContext, useState} from 'react';
import {useLocation, Link} from 'react-router';
import {
  Button,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  Navbar,
} from 'reactstrap';
import {AuthContext} from '@context/AuthContext';

import {DashboardPassword, DashboardDetails} from '@modules/dashboard';

export default function NavPrivate() {
  const {user, isAuthenticated, logoutUser} = useContext(AuthContext);
  const userName = `${user.firstName} ${user.lastName}`;

  const [collapsed, setCollapsed] = useState(true);
  const toggleNavbar = () => setCollapsed(!collapsed);

  // Modal state toggles
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isPasswordOpen, setIsPasswordOpen] = useState(false);
  const toggleDetails = () => setIsDetailsOpen(!isDetailsOpen);
  const togglePassword = () => setIsPasswordOpen(!isPasswordOpen);

  return (
    <>
      <DashboardDetails isOpen={isDetailsOpen} toggle={toggleDetails} />
      <DashboardPassword isOpen={isPasswordOpen} toggle={togglePassword} />

      <Navbar className="d-flex justify-content-between w-100 gap-2 p-3 border-bottom">
        <Link to="/" className="text-decoration-none">
          <h2>{isAuthenticated ? `${userName}` : 'Blog'}</h2>
        </Link>

        <NavbarToggler onClick={toggleNavbar} className="me-2" />
        <Collapse isOpen={!collapsed} navbar className="mt-3">
          <Nav navbar align="end">
            <NavItem>
              <Button onClick={toggleDetails}>Change Details</Button>
            </NavItem>
            <NavItem>
              <Button onClick={togglePassword}>Change Pass</Button>
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
    </>
  );
}
