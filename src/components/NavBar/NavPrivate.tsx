import {useContext, useState} from 'react';
import {Link} from 'react-router';
import {
  Navbar,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import {AuthContext} from '@/context';

import {DashboardPassword, DashboardDetails} from '@modules/dashboard';
import {getCookie} from '@/utils/cookie';

export default function NavPrivate() {
  const {user, logoutUser} = useContext(AuthContext);
  const isAuthenticated = getCookie('isAuthenticated');
  const userName = `${user.firstName} ${user.lastName}`;

  const [collapsed, setCollapsed] = useState(false);
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

      <Navbar
        sticky="top"
        className="d-flex bg-white justify-content-between w-100 gap-2 py-3 border-dark-subtle border-bottom"
      >
        <Link to="/" className="text-decoration-none text-dark">
          <h4 className="mb-0">
            {isAuthenticated && userName ? `${userName}` : 'Blog'}
          </h4>
        </Link>

        <Dropdown
          isOpen={collapsed}
          toggle={toggleNavbar}
          direction="down"
          inNavbar
        >
          <DropdownToggle color="dark" caret>
            Settings
          </DropdownToggle>
          <DropdownMenu dark className="mt-1" end>
            <DropdownItem onClick={toggleDetails}>Update Details</DropdownItem>
            <DropdownItem onClick={togglePassword}>
              Change Password
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem onClick={logoutUser}>Logout</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </Navbar>
    </>
  );
}
