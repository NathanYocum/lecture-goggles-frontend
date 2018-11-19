import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import HamburgerButton from './hamburgerButton/hamburgerButton';
import LectureGogglesLogo from '../logo/logo';

const NavBarStyle = styled.nav`
  border-bottom: 2px solid hsla(197, 100%, 20%, 1);
  background-color: #dddddd;
  color: hsla(197, 100%, 20%, 1);
  grid-row: 1;
  position: fixed;
  width: 100%;
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
`;

const MenuItem = styled.p`
  margin-left: 5px;
`;

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      renderMenu: false
    };
    this.onHamburgerClick = this.onHamburgerClick.bind(this);
  }

  onHamburgerClick() {
    const { renderMenu } = this.state;
    this.setState({ renderMenu: !renderMenu });
  }

  render() {
    const { renderButton } = this.props;
    const { renderMenu } = this.state;
    return (
      <NavBarStyle>
        <NavList>
          {renderButton && (
            <NavItem>
              <HamburgerButton onClickFunction={this.onHamburgerClick} />
            </NavItem>
          )}
          <TitleItem>
            <LectureGogglesLogo />
          </TitleItem>
          <NavItem> Subjects </NavItem>
          {!renderButton && <NavItem> Topics </NavItem>}
          {!renderButton && <NavItem> Resources </NavItem>}
          {!renderButton && <NavItem> Support </NavItem>}
          {!renderButton && <NavItem> Developers </NavItem>}
          <NavItem> Sign In </NavItem>
          {!renderButton && <NavItem> Create an Account </NavItem>}
        </NavList>
        {renderButton && renderMenu && <MenuItem>Subjects</MenuItem>}
        {renderButton && renderMenu && <MenuItem>Topics</MenuItem>}
        {renderButton && renderMenu && <MenuItem>Support</MenuItem>}
        {renderButton && renderMenu && <MenuItem>Developers</MenuItem>}
        {renderButton && renderMenu && <br />}
        {renderButton && renderMenu && <MenuItem>Sign In</MenuItem>}
        {renderButton && renderMenu && <MenuItem>Create An Account</MenuItem>}
      </NavBarStyle>
    );
  }
}

NavBar.propTypes = {
  renderButton: PropTypes.bool
};

NavBar.defaultProps = {
  renderButton: false
};

export default NavBar;
