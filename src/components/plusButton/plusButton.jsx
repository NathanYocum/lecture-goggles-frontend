import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const PlusButtonStyle = styled.button`
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
`;

const PlusButton = ({ onClickFunction }) => <PlusButtonStyle onClick={onClickFunction} />;

PlusButton.propTypes = {
  onClickFunction: PropTypes.func
};

PlusButton.defaultProps = {
  onClickFunction: () => {}
};

export default PlusButton;
