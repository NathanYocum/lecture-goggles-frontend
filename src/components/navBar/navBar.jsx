import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { colors } from '../__styles__/styles';

import HamburgerButton from './hamburgerButton/hamburgerButton';
import useWindowWidth from '../../hooks/useWindowWidth';
import AuthContext from '../../contexts/AuthContext';

const NavBarStyle = styled.nav`
  background-color: ${colors.primaryBlue};
  color: #ffffff;
  position: fixed;
  width: 100%;
  height: ${state => (state.renderMenu ? '56px' : 'auto')};
  border-bottom: 1px solid #111111;
  z-index: 1000;
`;

const NavList = styled.ul`
  display: flex;
  flex-direction: row;
  list-style-type: none;
  padding-left: 0px;
  align-items: center;
  justify-items: baseline;
`;

const NavItem = styled.li`
  padding-left: 10px;
  padding-right: 10px;
  font-size: 14px;
`;

const TitleItem = styled(NavItem)`
  flex-grow: 1;
  font-size: 24px;
  font-family: IBMPlexSans-SemiBold;
`;

const MenuItem = styled.p`
  margin-left: 5px;
`;

const NavLink = styled.a`
  text-decoration: none;
  color: #ffffff;
`;

const NavBar = props => {
  const { title } = props;
  const width = useWindowWidth();
  const [renderMenu, setMenuRendered] = useState(false);
  const renderButton = width < 768;
  const onHamburgerClick = () => setMenuRendered(!renderMenu);
  const { signedInAs } = useContext(AuthContext);
  return (
    <NavBarStyle data-testid="nav-bar">
      <NavList>
        {renderButton && (
          <>
            <NavItem>
              <HamburgerButton onClickFunction={onHamburgerClick} />
            </NavItem>
          </>
        )}
        <TitleItem>
          <NavLink href="/">{renderMenu ? 'Lecture Goggles' : `${title}`}</NavLink>
        </TitleItem>
        {!renderButton ? (
          <>
            <NavItem>
              <NavLink data-testid="subjects-link-full" href="/subjects">
                Subjects
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink data-testid="topics-link-full" href="/topics">
                Topics
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink data-testid="resources-link-full" href="/resources">
                Resources
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink data-testid="developers-link-full" href="/developers">
                Developers
              </NavLink>
            </NavItem>
            {signedInAs === '' ? (
              <>
                <NavItem>
                  <NavLink data-testid="sign-in-link-full" href="/signIn">
                    Sign In
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink data-testid="new-account-link-full" href="/newAccount">
                    Create an Account
                  </NavLink>
                </NavItem>
              </>
            ) : (
              <>
                <NavItem>
                  <NavLink data-testid="account-link-full" href="/account">
                    Account
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    data-testid="logout-link-full"
                    href="."
                    onClick={() => {
                      localStorage.removeItem('token');
                    }}
                  >
                    Logout
                  </NavLink>
                </NavItem>
              </>
            )}
          </>
        ) : (
          !renderMenu && (
            <>
              <NavItem>
                {signedInAs === '' ? (
                  <NavLink data-testid="sign-in-link-mobile" href="/signIn">
                    <FontAwesomeIcon icon="user-plus" size="lg" />
                  </NavLink>
                ) : (
                  <NavLink data-testid="account-link-mobile" href="/account">
                    <FontAwesomeIcon icon="user" size="lg" />
                  </NavLink>
                )}
              </NavItem>
            </>
          )
        )}
      </NavList>
      {renderButton && renderMenu && (
        <>
          <MenuItem>
            <NavLink data-testid="subjects-link-menu" href="/subjects">
              Subjects
            </NavLink>
          </MenuItem>
          <MenuItem>
            <NavLink data-testid="topics-link-menu" href="/topics">
              Topics
            </NavLink>
          </MenuItem>
          <MenuItem>
            <NavLink data-testid="resources-link-menu" href="/resources">
              Resources
            </NavLink>
          </MenuItem>
          <MenuItem>
            <NavLink data-testid="developers-link-menu" href="/developers">
              Developers
            </NavLink>
          </MenuItem>
          <br />
          {signedInAs === '' ? (
            <>
              <MenuItem>
                <NavLink data-testid="sign-in-link-menu" href="/signIn">
                  Sign In
                </NavLink>
              </MenuItem>
              <MenuItem>
                <NavLink data-testid="create-an-account-link-menu" href="/newAccount">
                  Create an Account
                </NavLink>
              </MenuItem>
            </>
          ) : (
            <>
              <MenuItem>
                <NavLink data-testid="account-link-menu" href="/account">
                  Account
                </NavLink>
              </MenuItem>
              <MenuItem>
                <NavLink
                  data-testid="logout-link-menu"
                  href="."
                  onClick={() => {
                    localStorage.removeItem('token');
                  }}
                >
                  Logout
                </NavLink>
              </MenuItem>
            </>
          )}
        </>
      )}
    </NavBarStyle>
  );
};

NavBar.propTypes = {
  title: PropTypes.string
};

NavBar.defaultProps = {
  title: 'Lecture Goggles'
};

export default NavBar;
