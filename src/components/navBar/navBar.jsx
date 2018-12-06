import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import HamburgerButton from './hamburgerButton/hamburgerButton';

const NavBarStyle = styled.nav`
  background-color: #0074d9;
  color: #ffffff;
  position: fixed;
  width: 100%;
  height: ${state => (state.renderMenu ? '56px' : 'auto')};
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

const NavLink = styled.a`
  text-decoration: none;
  color: #ffffff;
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
    const { renderButton, title } = this.props;
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
            <NavLink href="/">{`${title}`}</NavLink>
          </TitleItem>
          {!renderMenu && <NavItem> Subjects </NavItem>}
          {!renderButton && <NavItem> Topics </NavItem>}
          {!renderButton && (
            <NavLink href="resources">
              <NavItem> Resources </NavItem>
            </NavLink>
          )}
          {!renderButton && <NavItem> Support </NavItem>}
          {!renderButton && <NavItem> Developers </NavItem>}
          {!renderMenu && <NavItem> Account </NavItem>}
          {!renderButton && <NavItem> Create an Account </NavItem>}
        </NavList>
        {renderButton && renderMenu && <MenuItem>Subjects</MenuItem>}
        {renderButton && renderMenu && <MenuItem>Topics</MenuItem>}
        {renderButton && renderMenu && <MenuItem>Resources</MenuItem>}
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
  renderButton: PropTypes.bool,
  title: PropTypes.string
};

NavBar.defaultProps = {
  renderButton: false,
  title: 'Lecture Goggles'
};

export default NavBar;
