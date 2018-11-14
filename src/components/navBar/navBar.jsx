import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import HamburgerButton from './hamburgerButton/hamburgerButton';

const NavBarStyle = styled.nav`
  border-bottom: 2px solid hsla(197, 100%, 20%, 1);
  background-color: #7fdbff;
  color: hsla(197, 100%, 20%, 1);
`;

const NavList = styled.ul`
  display: flex;
  flex-direction: row;
  list-style-type: none;
  padding-left: 0px;
  align-items: baseline;
  justify-items: baseline;
`;

const NavItem = styled.li`
  padding-left: 10px;
  padding-right: 10px;
`;

const TitleItem = styled(NavItem)`
  flex-grow: 1;
  font-size: 1.5em;
`;

const NavBar = ({ renderButton }) => (
  <NavBarStyle>
    <NavList>
      {renderButton && (
        <NavItem>
          <HamburgerButton />
        </NavItem>
      )}
      <TitleItem> Lecture Goggles </TitleItem>
      {!renderButton && <NavItem> Home </NavItem>}
      {!renderButton && <NavItem> Subjects </NavItem>}
      {!renderButton && <NavItem> Topics </NavItem>}
      {!renderButton && <NavItem> Resources </NavItem>}
      {!renderButton && <NavItem> Support </NavItem>}
      {!renderButton && <NavItem> Developers </NavItem>}
      {!renderButton && <NavItem> Sign In </NavItem>}
      {!renderButton && <NavItem> Create an Account </NavItem>}
    </NavList>
  </NavBarStyle>
);

NavBar.propTypes = {
  renderButton: PropTypes.bool
};

NavBar.defaultProps = {
  renderButton: false
};

export default NavBar;
