import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import useWindowWidth from '../../hooks/useWindowWidth';
import FloatingActionButton from './FAB';
import { UnstyledButton } from '../__styles__/styles';

const ExtendedFloatingActionButtonStyle = styled(UnstyledButton)`
  background-color: ${props => props.backgroundColor};
  position: fixed;
  bottom: 16px;
  left: ${props => (props.windowWidth > 768 ? '64' : '16')}px;
  min-width: 56px;
  min-height: 56px;
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 6;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.2);
`;

const ExtendedFloatingActionButton = props => {
  const { children } = props;
  const windowWidth = useWindowWidth();
  if (windowWidth < 425) {
    return (
      <FloatingActionButton style={{ left: '16px' }} windowWidth={windowWidth} {...props}>
        {React.Children.map(children, (child, i) => {
          if (i === 0) {
            return child;
          }
          return <></>;
        })}
      </FloatingActionButton>
    );
  }
  return (
    <ExtendedFloatingActionButtonStyle windowWidth={windowWidth} {...props}>
      {children}
    </ExtendedFloatingActionButtonStyle>
  );
};

ExtendedFloatingActionButton.propTypes = {
  backgroundColor: PropTypes.string,
  children: PropTypes.node
};
ExtendedFloatingActionButton.defaultProps = {
  backgroundColor: '#0074d9',
  children: <></>
};

export default ExtendedFloatingActionButton;
