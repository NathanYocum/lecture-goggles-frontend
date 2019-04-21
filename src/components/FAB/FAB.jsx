import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import useWindowWidth from '../../hooks/useWindowWidth';

const FloatingActionButtonStyle = styled.div`
  background-color: #0074d9;
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
  children: PropTypes.node
};
FloatingActionButton.defaultProps = {
  children: <></>
};

export default FloatingActionButton;
