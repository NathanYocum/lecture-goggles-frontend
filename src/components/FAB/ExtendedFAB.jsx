import React from 'react';
import PropTypes from 'prop-types';
import useWindowWidth from '../../hooks/useWindowWidth';
import FloatingActionButton from './FAB';
import { ExtendedFloatingActionButtonStyle, colors } from '../__styles__/styles';

const ExtendedFloatingActionButton = props => {
  const { children } = props;
  const windowWidth = useWindowWidth();
  if (windowWidth < 425) {
    return (
      <FloatingActionButton style={{ bottom: '4px', left: '16px' }} windowWidth={windowWidth} {...props}>
        {/* Only renders the first child in case of small screens */}
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
  backgroundColor: colors.primaryBlue,
  children: <></>
};

export default ExtendedFloatingActionButton;
