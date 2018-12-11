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
            <NavLink href="/">{renderMenu ? 'Lecture Goggles' : `${title}`}</NavLink>
          </TitleItem>
          {!renderMenu && (
            <NavItem>
              <NavLink href="/subjects"> Subjects</NavLink>{' '}
            </NavItem>
          )}
          {!renderButton && (
            <NavItem>
              <NavLink href="/topics"> Topics</NavLink>{' '}
            </NavItem>
          )}
          {!renderButton && (
            <NavLink href="/resources">
              <NavItem> Resources </NavItem>
            </NavLink>
          )}
          {!renderButton && (
            <NavItem>
              <NavLink href="/support"> Support </NavLink>
            </NavItem>
          )}
          {!renderButton && (
            <NavItem>
              <NavLink href="/developers"> Developers </NavLink>
            </NavItem>
          )}
          {!renderMenu && (
            <NavItem>
              <NavLink href="/signIn"> Sign In </NavLink>
            </NavItem>
          )}
          {!renderButton && (
            <NavItem>
              <NavLink href="/newAccount"> Create an Account </NavLink>
            </NavItem>
          )}
        </NavList>
        {renderButton && renderMenu && (
          <MenuItem>
            <NavLink href="/subjects">Subjects</NavLink>
          </MenuItem>
        )}
        {renderButton && renderMenu && (
          <MenuItem>
            <NavLink href="/topics">Topics</NavLink>
          </MenuItem>
        )}
        {renderButton && renderMenu && (
          <MenuItem>
            <NavLink href="/resources">Resources</NavLink>
          </MenuItem>
        )}
        {renderButton && renderMenu && (
          <MenuItem>
            <NavLink href="/support">Support</NavLink>
          </MenuItem>
        )}
        {renderButton && renderMenu && (
          <MenuItem>
            <NavLink href="/developers">Developers</NavLink>
          </MenuItem>
        )}
        {renderButton && renderMenu && <br />}
        {renderButton && renderMenu && (
          <MenuItem>
            <NavLink href="/signIn">Sign In</NavLink>
          </MenuItem>
        )}
        {renderButton && renderMenu && (
          <MenuItem>
            <NavLink href="/newAccount">Create An Account</NavLink>
          </MenuItem>
        )}
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
