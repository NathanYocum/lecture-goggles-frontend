import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ArrowButtonStyle = styled.button`
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
`;

const ArrowButton = ({ onClickFunction }) => (
  <ArrowButtonStyle data-testid="arrow-button" role="button" onClick={onClickFunction}>
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="42px" height="25px" viewBox="-0.5 -0.5 42 82">
      <defs />
      <path d="M 0 0 L 40 40" fill="none" stroke="#000000" strokeMiterlimit="10" pointerEvents="none" />
      <path d="M 0 80 L 40 40" fill="none" stroke="#000000" strokeMiterlimit="10" pointerEvents="none" />
    </svg>
  </ArrowButtonStyle>
);

ArrowButton.propTypes = {
  onClickFunction: PropTypes.func
};

ArrowButton.defaultProps = {
  onClickFunction: () => {}
};

export default ArrowButton;
