import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

// Button fills the entire div it is contained in
const GenericButtonStyle = styled.button`
  background: ${props => props.backgroundColor};
  color: ${props => props.color};
  border: 2px solid #0d47a1;
  padding: 3px;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.2);
  width: ${props => props.width}
  height: ${props => props.height};
  border-radius: 18px;
`;

const GenericButton = ({ onClickFunction, text, backgroundColor, color, width, height, type }) => (
  <GenericButtonStyle
    data-testid="generic-button"
    backgroundColor={backgroundColor}
    color={color}
    onClick={onClickFunction}
    width={width}
    height={height}
    type={type}
  >
    {text}
  </GenericButtonStyle>
);

GenericButton.propTypes = {
  onClickFunction: PropTypes.func,
  text: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string,
  color: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  type: PropTypes.string
};

GenericButton.defaultProps = {
  onClickFunction: () => {},
  backgroundColor: '#0074d9',
  color: '#ffffff',
  width: '100%',
  height: '100%',
  type: 'button'
};

export default GenericButton;
