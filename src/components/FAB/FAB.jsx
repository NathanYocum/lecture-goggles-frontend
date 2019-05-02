import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import useWindowWidth from '../../hooks/useWindowWidth';
import { UnstyledButton, colors } from '../__styles__/styles';

const FloatingActionButtonStyle = styled(UnstyledButton)`
  background-color: ${props => props.backgroundColor};
  position: fixed;
  bottom: 16px;
  right: ${props => (props.windowWidth > 768 ? '64' : '16')}px;
  min-width: 56px;
  min-height: 56px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 6;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.2);
`;

const FloatingActionButton = props => {
  const { children } = props;
  const windowWidth = useWindowWidth();
  return (
    <FloatingActionButtonStyle windowWidth={windowWidth} {...props}>
      {children}
    </FloatingActionButtonStyle>
  );
};

FloatingActionButton.propTypes = {
  backgroundColor: PropTypes.string,
  children: PropTypes.node
};
FloatingActionButton.defaultProps = {
  backgroundColor: colors.primaryBlue,
  children: <></>
};

export default FloatingActionButton;
