import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const GenericButtonStyle = styled.button`
  background: #7fdbff;
  color: black;
  border: 1px solid hsla(197, 100%, 20%, 1);
  padding: 3px;
  margin-left: 3px;
  margin-right: 3px;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  box-shadow: 4px 4px 4px 2px rgba(0, 0, 0, 0.2);
`;

const GenericButton = ({ onClickFunction, text }) => (
  <GenericButtonStyle onClick={onClickFunction}>{text}</GenericButtonStyle>
);

GenericButton.propTypes = {
  onClickFunction: PropTypes.func,
  text: PropTypes.string.isRequired
};

GenericButton.defaultProps = {
  onClickFunction: () => {}
};

export default GenericButton;
