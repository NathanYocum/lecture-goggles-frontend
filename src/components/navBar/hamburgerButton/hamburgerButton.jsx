import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const HamburgerButonStyle = styled.button`
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
`;

const HamburgerButton = ({ onClickFunction }) => (
  <HamburgerButonStyle onClick={onClickFunction}>
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="1.5em" height="1em" viewBox="-0.5 -0.5 143 93">
      <defs />
      <path d="M 6 6 L 136 6" fill="none" stroke="hsla(197, 100%, 20%, 1)" strokeWidth="12" strokeMiterlimit="10" />
      <path d="M 6 46 L 136 46" fill="none" stroke="hsla(197, 100%, 20%, 1)" strokeWidth="12" strokeMiterlimit="10" />
      <path
        d="M 6 86 L 136.02 85.92"
        fill="none"
        stroke="hsla(197, 100%, 20%, 1)"
        strokeWidth="12"
        strokeMiterlimit="10"
      />
    </svg>
  </HamburgerButonStyle>
);

HamburgerButton.propTypes = {
  onClickFunction: PropTypes.func
};

HamburgerButton.defaultProps = {
  onClickFunction: () => {}
};

export default HamburgerButton;
