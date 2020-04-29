import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

const HamburgerButonStyle = styled.button`
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
`;

export interface HamburgerButtonProps {
  onClickFunction: any;
}

const HamburgerButton: FunctionComponent<HamburgerButtonProps> = ({ onClickFunction = () => {} }) => (
  <HamburgerButonStyle data-testid="hamburger-button" role="button" onClick={onClickFunction}>
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="1.5em" height="1em" viewBox="-0.5 -0.5 143 93">
      <defs />
      <path d="M 6 6 L 136 6" fill="none" stroke="#ffffff" strokeWidth="12" strokeMiterlimit="10" />
      <path d="M 6 46 L 136 46" fill="none" stroke="#ffffff" strokeWidth="12" strokeMiterlimit="10" />
      <path d="M 6 86 L 136.02 85.92" fill="none" stroke="#ffffff" strokeWidth="12" strokeMiterlimit="10" />
    </svg>
  </HamburgerButonStyle>
);

HamburgerButton.defaultProps = {
  onClickFunction: () => {}
};

export default HamburgerButton;
